import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { shortCode: string } }
) {
  const shortCode = params.shortCode

  try {
    const shortUrl = await prisma.shortUrl.findUnique({
      where: { shortCode },
    })

    if (shortUrl) {
      return NextResponse.redirect(shortUrl.originalUrl)
    } else {
      return new NextResponse('Short URL not found', { status: 404 })
    }
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

