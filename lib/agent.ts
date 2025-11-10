class Agent {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor(baseURL = '') {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }

  setBaseURL(baseURL: string) {
    this.baseURL = baseURL
  }

  setDefaultHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      ...headers,
    }
  }

  private async processResponse<T>(response: Response): Promise<T> {
    const contenType = response.headers.get('content-type')
    const isJson = contenType?.includes('application/json')

    const data = isJson ? await response.json() : await response.text()

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong')
    }

    return data as T
  }

  async get<T>(url: string, headers?: Record<string, string>) {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'GET',
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
    })

    return this.processResponse<T>(response)
  }
}

const agent = new Agent()

export default agent
