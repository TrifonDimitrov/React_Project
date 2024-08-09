async function requester(method, url, data) {
  const options = {
    method,
    headers: {},
  };

  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token);

  if (token) {
    options.headers = {
      ...options.headers,
      "Authorization": `Bearer ${token}`,  // Добавяне на Bearer префикс, ако е необходим
    };
  }

  if (method !== "GET") {
    options.method = method;
  }

  if (data) {
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };
    options.body = JSON.stringify(data);
  }

  console.log("Making request:", { method, url, data, options });

  const response = await fetch(url, options);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  console.log("Response received:", result);

  return result;
}

export const get = requester.bind(null, "GET");
export const post = requester.bind(null, "POST");
export const put = requester.bind(null, "PUT");
export const del = requester.bind(null, "DELETE");
