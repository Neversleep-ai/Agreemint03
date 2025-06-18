interface TokenStorage {
  getToken: () => string | null
  setToken: (token: string) => void
  removeToken: () => void
}

class LocalTokenStorage implements TokenStorage {
  private readonly key = "authToken"

  getToken(): string | null {
    try {
      return localStorage.getItem(this.key)
    } catch {
      return null
    }
  }

  setToken(token: string): void {
    try {
      localStorage.setItem(this.key, token)
    } catch {
      console.warn("Failed to store auth token")
    }
  }

  removeToken(): void {
    try {
      localStorage.removeItem(this.key)
    } catch {
      console.warn("Failed to remove auth token")
    }
  }
}

export const tokenStorage: TokenStorage = new LocalTokenStorage()
