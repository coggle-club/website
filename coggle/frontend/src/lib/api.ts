/**
 * API client for fetching data from the Coggle backend.
 * Uses fetch with the base URL from environment variables.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new ApiError(
      res.status,
      `API request failed: ${res.statusText} (${url})`,
    );
  }

  // 日志：记录 API 调用
  const { logApiCall } = await import("./logger");
  logApiCall(options?.method || "GET", endpoint, res.status);

  return res.json() as Promise<T>;
}

/**
 * Build a query string from an object of params, skipping undefined/null values.
 */
export function buildQueryString(
  params: Record<string, string | number | undefined | null>,
): string {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  }
  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
}
