'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { updateShortCode } from '../actions'
import { createShortUrl } from '../actions'

export default function ShortUrlDisplay() {
  const [shortUrl, setShortUrl] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleCreateShortUrl = async (formData: FormData) => {
    const result = await createShortUrl(formData)
    if (result.shortUrl) {
      setShortUrl(result.shortUrl)
    }
  }

  const handleUpdateShortCode = async (formData: FormData) => {
    const result = await updateShortCode(formData)
    if (result.shortUrl) {
      setShortUrl(result.shortUrl)
      setIsEditing(false)
    }
  }

  if (!shortUrl) return null

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Your Shortened URL:</h2>
      <div className="flex items-center space-x-2">
        <a
          href={`/api/${shortUrl.shortCode}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {`${window.location.origin}/api/${shortUrl.shortCode}`}
        </a>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>
      {isEditing && (
        <form action={handleUpdateShortCode} className="mt-2">
          <input type="hidden" name="id" value={shortUrl.id} />
          <input
            type="text"
            name="newShortCode"
            defaultValue={shortUrl.shortCode}
            className="p-2 border rounded"
          />
          <SubmitButton />
        </form>
      )}
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="ml-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
    >
      {pending ? 'Updating...' : 'Update'}
    </button>
  )
}

