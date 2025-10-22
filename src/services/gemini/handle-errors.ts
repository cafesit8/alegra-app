export class GeminiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: unknown,
  ) {
    super(message)
    this.name = 'GeminiError'
  }
}

export function validateGemini(word: string): void {
  if (!word) {
    throw new GeminiError('Word is required')
  }
}
