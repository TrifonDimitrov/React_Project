async function requester(method, url, data) {
  const options = {
    method,
    headers: {},
  };

  const token = localStorage.getItem("token");
  
  if (token) {
    options.headers = {
      ...options.headers,
      "Authorization": `Bearer ${token}`, 
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

  const response = await fetch(url, options);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }


  return result;
}

export const get = requester.bind(null, "GET");
export const post = requester.bind(null, "POST");
export const put = requester.bind(null, "PUT");
export const del = requester.bind(null, "DELETE");
