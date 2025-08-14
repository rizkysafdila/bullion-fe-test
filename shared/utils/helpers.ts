export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0)
    return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}

export function formatDate(dateString: string): string {
  if (!dateString)
    return ''

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime()))
    return ''

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // months are 0-based
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

export function formatDateInput(dateString: string): string {
  if (!dateString)
    return ''

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime()))
    return ''

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // months are 0-based
  const year = date.getFullYear()

  return `${year}-${month}-${day}`
}

export function formatDateLong(dateString: string): string {
  if (!dateString)
    return ''

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime()))
    return ''

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
