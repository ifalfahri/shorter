'use server'

import prisma from '../../lib/prisma'
import { nanoid } from 'nanoid'

export async function createShortUrl(formData: FormData) {
  const originalUrl = formData.get('url') as string
  if (!originalUrl) {
    return { error: 'URL is required' }
  }

  const shortCode = nanoid(6) // Generate a 6-character random code

  try {
    const shortUrl = await prisma.shortUrl.create({
      data: {
        originalUrl,
        shortCode,
      },
    })
    return { shortUrl }
  } catch (error) {
    return { error: 'Failed to create short URL' }
  }
}

export async function updateShortCode(formData: FormData) {
  const id = formData.get('id') as string
  const newShortCode = formData.get('newShortCode') as string

  if (!id || !newShortCode) {
    return { error: 'ID and new short code are required' }
  }

  try {
    const updatedShortUrl = await prisma.shortUrl.update({
      where: { id },
      data: { shortCode: newShortCode },
    })
    return { shortUrl: updatedShortUrl }
  } catch (error) {
    return { error: 'Failed to update short code' }
  }
}

