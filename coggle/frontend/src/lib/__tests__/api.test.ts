import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchApi, ApiError, buildQueryString } from "@/lib/api";

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe("fetchApi", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("fetches data successfully", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: "test" }),
    });

    const result = await fetchApi<{ data: string }>("/health");
    expect(result).toEqual({ data: "test" });
    expect(mockFetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/health",
      expect.objectContaining({
        headers: { "Content-Type": "application/json" },
      }),
    );
  });

  it("throws ApiError on non-ok response", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    await expect(fetchApi("/not-found")).rejects.toThrow(ApiError);
    await expect(fetchApi("/not-found")).rejects.toThrow(
      "API request failed: Not Found",
    );
  });

  it("passes custom options", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    await fetchApi("/test", {
      method: "POST",
      body: JSON.stringify({ key: "value" }),
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/test",
      expect.objectContaining({
        method: "POST",
        body: '{"key":"value"}',
      }),
    );
  });
});

describe("buildQueryString", () => {
  it("builds query string from params", () => {
    const qs = buildQueryString({ page: 1, tag: "ml", author: undefined });
    expect(qs).toBe("?page=1&tag=ml");
  });

  it("returns empty string for empty params", () => {
    const qs = buildQueryString({});
    expect(qs).toBe("");
  });

  it("skips null and empty string values", () => {
    const qs = buildQueryString({ a: null, b: "", c: "value" });
    expect(qs).toBe("?c=value");
  });
});
