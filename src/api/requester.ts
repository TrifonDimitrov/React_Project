async function requester<T>(
  method: string,
  url: string,
  data?: unknown
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {},
  };

  const token = localStorage.getItem("token");

  if (token) {
    (options.headers as Record<string, string>)[
      "Authorization"
    ] = `Bearer ${token}`;
  }

  if (method !== "GET" && data) {
    (options.headers as Record<string, string>)["Content-Type"] =
      "application/json";
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const get = <T>(url: string) => requester<T>("GET", url);
export const post = <T>(url: string, data: unknown) =>
  requester<T>("POST", url, data);
export const put = <T>(url: string, data: unknown) =>
  requester<T>("PUT", url, data);
export const del = <T>(url: string) => requester<T>("DELETE", url);
