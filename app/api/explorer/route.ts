import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '25'
    const sort = searchParams.get('sort') || 'date'
    const order = searchParams.get('order') || 'desc'
    const search = searchParams.get('search') || ''
    const state = searchParams.get('state') || ''

    const backendUrl = new URL(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8003'}/api/explorer/enrollment`)
    backendUrl.searchParams.set('page', page)
    backendUrl.searchParams.set('limit', limit)
    backendUrl.searchParams.set('sort', sort)
    backendUrl.searchParams.set('order', order)
    
    if (search) backendUrl.searchParams.set('search', search)
    if (state) backendUrl.searchParams.set('state', state)

    const response = await fetch(backendUrl.toString())
    
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
      { error: 'Failed to fetch explorer data' },
      { status: 500 }
    )
  }
}
