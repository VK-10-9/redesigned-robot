"""
Optimized async I/O handler for efficient handling of I/O-bound tasks.
Implements connection pooling, caching, and resource management.
"""

import asyncio
import functools
import time
from typing import Any, Awaitable, Callable, Dict, Optional, TypeVar, Generic
from contextlib import asynccontextmanager
from concurrent.futures import ThreadPoolExecutor
import logging

logger = logging.getLogger(__name__)

T = TypeVar('T')


class AsyncConnectionPool:
    """
    Manages a pool of async connections with intelligent reuse and lifecycle management.
    """
    
    def __init__(self, max_connections: int = 50, timeout: float = 30.0):
        self.max_connections = max_connections
        self.timeout = timeout
        self.semaphore = asyncio.Semaphore(max_connections)
        self._active_connections: int = 0
        self._lock = asyncio.Lock()
        self._stats = {
            'acquired': 0,
            'released': 0,
            'timeouts': 0,
            'errors': 0
        }
    
    async def acquire(self) -> None:
        """Acquire a connection slot from the pool."""
        try:
            await asyncio.wait_for(self.semaphore.acquire(), timeout=self.timeout)
            async with self._lock:
                self._active_connections += 1
                self._stats['acquired'] += 1
        except asyncio.TimeoutError:
            async with self._lock:
                self._stats['timeouts'] += 1
            raise
    
    async def release(self) -> None:
        """Release a connection slot back to the pool."""
        try:
            async with self._lock:
                self._active_connections -= 1
                self._stats['released'] += 1
            self.semaphore.release()
        except Exception as e:
            logger.error(f"Error releasing connection: {e}")
            async with self._lock:
                self._stats['errors'] += 1
    
    @asynccontextmanager
    async def connection(self):
        """Context manager for acquiring and releasing connections."""
        await self.acquire()
        try:
            yield
        finally:
            await self.release()
    
    def get_stats(self) -> Dict[str, Any]:
        """Get pool statistics."""
        return {
            **self._stats,
            'active_connections': self._active_connections,
            'max_connections': self.max_connections
        }
    
    async def reset_stats(self) -> None:
        """Reset statistics."""
        async with self._lock:
            self._stats = {
                'acquired': 0,
                'released': 0,
                'timeouts': 0,
                'errors': 0
            }


class AsyncCache(Generic[T]):
    """
    Simple async-safe cache with TTL support.
    """
    
    def __init__(self, ttl: float = 300.0):
        self.ttl = ttl
        self._cache: Dict[str, tuple[T, float]] = {}
        self._lock = asyncio.Lock()
        self._stats = {'hits': 0, 'misses': 0, 'expirations': 0}
    
    async def get(self, key: str) -> Optional[T]:
        """Get value from cache if not expired."""
        async with self._lock:
            if key in self._cache:
                value, timestamp = self._cache[key]
                if time.time() - timestamp < self.ttl:
                    self._stats['hits'] += 1
                    return value
                else:
                    del self._cache[key]
                    self._stats['expirations'] += 1
            self._stats['misses'] += 1
            return None
    
    async def set(self, key: str, value: T) -> None:
        """Set value in cache."""
        async with self._lock:
            self._cache[key] = (value, time.time())
    
    async def clear(self) -> None:
        """Clear all cache entries."""
        async with self._lock:
            self._cache.clear()
    
    async def delete(self, key: str) -> None:
        """Delete specific key from cache."""
        async with self._lock:
            self._cache.pop(key, None)
    
    def get_stats(self) -> Dict[str, Any]:
        """Get cache statistics."""
        return {
            **self._stats,
            'size': len(self._cache),
            'ttl': self.ttl
        }
    
    async def reset_stats(self) -> None:
        """Reset statistics."""
        async with self._lock:
            self._stats = {'hits': 0, 'misses': 0, 'expirations': 0}


class AsyncTaskBatcher:
    """
    Batch multiple async tasks and execute them with controlled concurrency.
    """
    
    def __init__(self, max_concurrent: int = 10):
        self.max_concurrent = max_concurrent
        self.semaphore = asyncio.Semaphore(max_concurrent)
    
    async def execute_batch(
        self, 
        tasks: list[Callable[[], Awaitable[T]]]
    ) -> list[Optional[T]]:
        """Execute multiple tasks with controlled concurrency."""
        results = []
        errors = []
        
        async def limited_task(task_func: Callable[[], Awaitable[T]]) -> Optional[T]:
            async with self.semaphore:
                try:
                    return await task_func()
                except Exception as e:
                    logger.error(f"Task execution failed: {e}")
                    errors.append(e)
                    return None
        
        # Create and await all tasks
        coros = [limited_task(task) for task in tasks]
        results = await asyncio.gather(*coros, return_exceptions=False)
        
        if errors:
            logger.warning(f"Batch execution completed with {len(errors)} errors")
        
        return results


class AsyncRetry:
    """
    Retry mechanism for async functions with exponential backoff.
    """
    
    def __init__(
        self, 
        max_retries: int = 3, 
        base_delay: float = 0.1, 
        backoff_factor: float = 2.0,
        max_delay: float = 30.0
    ):
        self.max_retries = max_retries
        self.base_delay = base_delay
        self.backoff_factor = backoff_factor
        self.max_delay = max_delay
    
    async def __call__(
        self, 
        func: Callable[..., Awaitable[T]], 
        *args,
        **kwargs
    ) -> T:
        """Execute async function with retry logic."""
        last_exception = None
        
        for attempt in range(self.max_retries):
            try:
                return await func(*args, **kwargs)
            except Exception as e:
                last_exception = e
                if attempt < self.max_retries - 1:
                    delay = min(
                        self.base_delay * (self.backoff_factor ** attempt),
                        self.max_delay
                    )
                    logger.warning(
                        f"Attempt {attempt + 1} failed, retrying in {delay}s: {e}"
                    )
                    await asyncio.sleep(delay)
        
        raise last_exception


class AsyncIOHandler:
    """
    Main handler orchestrating all async I/O operations.
    """
    
    def __init__(
        self,
        max_connections: int = 50,
        cache_ttl: float = 300.0,
        max_concurrent_tasks: int = 10
    ):
        self.connection_pool = AsyncConnectionPool(max_connections=max_connections)
        self.cache = AsyncCache(ttl=cache_ttl)
        self.task_batcher = AsyncTaskBatcher(max_concurrent=max_concurrent_tasks)
        self.retry = AsyncRetry()
        self.thread_pool = ThreadPoolExecutor(max_workers=10)
    
    async def execute_io_operation(
        self,
        operation_name: str,
        operation_func: Callable[[], Awaitable[T]],
        use_cache: bool = False,
        cache_key: Optional[str] = None,
        retry: bool = False
    ) -> T:
        """
        Execute an I/O operation with optional caching and retry.
        """
        # Check cache if enabled
        if use_cache and cache_key:
            cached_value = await self.cache.get(cache_key)
            if cached_value is not None:
                logger.info(f"Cache hit for {operation_name}")
                return cached_value
        
        # Execute operation with connection pooling
        async with self.connection_pool.connection():
            try:
                if retry:
                    result = await self.retry(operation_func)
                else:
                    result = await operation_func()
                
                # Cache result if enabled
                if use_cache and cache_key:
                    await self.cache.set(cache_key, result)
                
                logger.info(f"Successfully executed {operation_name}")
                return result
            
            except Exception as e:
                logger.error(f"Error executing {operation_name}: {e}")
                raise
    
    async def execute_batch_operations(
        self,
        operations: Dict[str, Callable[[], Awaitable[T]]]
    ) -> Dict[str, Optional[T]]:
        """Execute multiple operations as a batch."""
        task_list = list(operations.values())
        results_list = await self.task_batcher.execute_batch(task_list)
        
        return {
            key: result 
            for (key, _), result in zip(operations.items(), results_list)
        }
    
    def get_health_stats(self) -> Dict[str, Any]:
        """Get overall health statistics."""
        return {
            'connection_pool': self.connection_pool.get_stats(),
            'cache': self.cache.get_stats(),
            'max_concurrent_tasks': self.task_batcher.max_concurrent
        }
    
    async def shutdown(self) -> None:
        """Shutdown handler and cleanup resources."""
        await self.cache.clear()
        self.thread_pool.shutdown(wait=True)
        logger.info("AsyncIOHandler shutdown complete")


# Global instance
_handler: Optional[AsyncIOHandler] = None


def get_async_handler() -> AsyncIOHandler:
    """Get or create global async handler instance."""
    global _handler
    if _handler is None:
        _handler = AsyncIOHandler(
            max_connections=50,
            cache_ttl=300.0,
            max_concurrent_tasks=10
        )
    return _handler


def async_cached(ttl: float = 300.0, cache_key: Optional[str] = None):
    """
    Decorator for caching async function results.
    """
    def decorator(func: Callable[..., Awaitable[T]]) -> Callable[..., Awaitable[T]]:
        @functools.wraps(func)
        async def wrapper(*args, **kwargs) -> T:
            handler = get_async_handler()
            key = cache_key or f"{func.__name__}:{args}:{kwargs}"
            
            # Attempt to get from cache
            cached = await handler.cache.get(key)
            if cached is not None:
                return cached
            
            # Execute function and cache result
            result = await func(*args, **kwargs)
            await handler.cache.set(key, result)
            return result
        
        return wrapper
    return decorator


def async_with_retry(max_retries: int = 3):
    """
    Decorator for adding retry logic to async functions.
    """
    def decorator(func: Callable[..., Awaitable[T]]) -> Callable[..., Awaitable[T]]:
        retry_handler = AsyncRetry(max_retries=max_retries)
        
        @functools.wraps(func)
        async def wrapper(*args, **kwargs) -> T:
            return await retry_handler(func, *args, **kwargs)
        
        return wrapper
    return decorator
