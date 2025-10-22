export class UnsplashError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: unknown,
  ) {
    super(message)
    this.name = 'UnsplashError'
  }
}

export const validateUnsplashErros = (word: string): void => {
  if (!word) {
    throw new UnsplashError('Word is required')
  }
}
