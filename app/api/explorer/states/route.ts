import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8003'}/api/explorer/states`
    
    const response = await fetch(backendUrl)
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend error: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch states' },
      { status: 500 }
    )
  }
}
