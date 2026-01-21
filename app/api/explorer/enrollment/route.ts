import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = 'http://127.0.0.1:8003'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '25'

    const backendUrl = `${BACKEND_URL}/api/explorer/enrollment?page=${page}&limit=${limit}`
    console.log(`[API Proxy] Requesting: ${backendUrl}`)
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[API Proxy] Backend error:', response.status, errorText)
      return NextResponse.json(
        { error: `Backend error: ${response.status}`, details: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('[API Proxy] Data received successfully, returning to client')
    return NextResponse.json(data)

  } catch (error) {
    console.error('[API Proxy] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
