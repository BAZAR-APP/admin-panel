export function extractErrorMessage(error: any): string {
  if (!error) return 'Unknown error occurred'

  if (error.response && error.response.data) {
    const data = error.response.data

    if (typeof data === 'string') return data

    if (typeof data.message === 'string') return data.message

    if (Array.isArray(data.message)) return data.message.join(', ')

    if (typeof data.message === 'string') return data.message

    return JSON.stringify(data)
  }

  if (error.message) return error.message

  if (typeof error === 'string') return error

  return 'Something went wrong'
}