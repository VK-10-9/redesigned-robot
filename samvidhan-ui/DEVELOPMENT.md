# Development Setup Guide

## Prerequisites

- Node.js 18.17+
- npm 9+
- Git

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_ANALYTICS_ID=
NODE_ENV=development
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Common Tasks

### Creating a New Page

1. Create directory under `app/`:
```bash
mkdir app/new-page
```

2. Create `page.tsx`:
```typescript
export default function NewPage() {
  return (
    <div>
      <h1>New Page</h1>
    </div>
  )
}
```

### Creating a New Component

1. Create file in `components/sections/` or `components/ui/`
2. Use React functional component with TypeScript
3. Export from component file

Example:
```typescript
interface MyComponentProps {
  title: string
}

export function MyComponent({ title }: MyComponentProps) {
  return <div>{title}</div>
}
```

### Adding Styles

1. Use TailwindCSS classes in JSX
2. For custom styles, add to `styles/globals.css`
3. Use CSS custom properties for colors

### Testing

```bash
# Run linting
npm run lint

# Type checking
npm run type-check
```

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Run production build

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript check
npm run format           # Format with Prettier

# Clean
rm -rf .next node_modules  # Full clean
npm install                 # Reinstall
```

## File Structure Best Practices

- Keep components small and focused
- Use descriptive file names
- Group related files in directories
- Use index.ts for exports when needed
- Keep styles close to components

## Debugging

### Browser DevTools

1. Open Chrome DevTools (F12)
2. Go to Network tab to monitor API calls
3. Use Console for JavaScript debugging
4. Check React DevTools extension

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "console": "integratedTerminal",
      "serverReadyAction": {
        "pattern": "ready - started server on",
        "uriFormat": "http://%s",
        "action": "openExternally"
      }
    }
  ]
}
```

## Performance Optimization

### Image Optimization

Use Next.js Image component:

```typescript
import Image from 'next/image'

<Image
  src="/image.png"
  alt="Description"
  width={400}
  height={300}
/>
```

### Code Splitting

Use dynamic imports:

```typescript
import dynamic from 'next/dynamic'

const Component = dynamic(() => import('./Component'))
```

### Caching

- API responses are cached by default
- Configure cache TTL in API client

## Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test all routes
- [ ] Check responsive design
- [ ] Verify API connections
- [ ] Run `npm run type-check`
- [ ] Run `npm run lint`
- [ ] Update environment variables
- [ ] Test on mobile devices
- [ ] Check Lighthouse scores

## Troubleshooting

### Issue: Port 3000 already in use

Solution:
```bash
npm run dev -- -p 3001
```

### Issue: Module not found

Solution:
- Check import path
- Verify file exists
- Clear `.next` directory: `rm -rf .next`

### Issue: TypeScript errors

Solution:
```bash
npm run type-check
```

### Issue: Styles not applying

Solution:
- Rebuild: `npm run build`
- Clear cache: `rm -rf .next`
- Check class names in Tailwind config

## Resources

- Next.js: https://nextjs.org
- React: https://react.dev
- TailwindCSS: https://tailwindcss.com
- TypeScript: https://www.typescriptlang.org

## Getting Help

1. Check GitHub Issues
2. Read documentation
3. Ask in discussions
4. Email support@samvidhan.gov.in
