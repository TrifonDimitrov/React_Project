async function requester(method, url, data) {
  const options = {};

  if (method !== "GET") {
    options.method = method;
  }

  if (data) {
    options.headers = {
      "Content-Type": "application/json",
    };
    options.body = JSON.stringify(data);
  }

  console.log("Making request:", { method, url, data, options });

  const response = await fetch(url, options);
  const result = await response.json();


  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  console.log("Response received:", result);

  return result;
}

export const get = requester.bind(null, "GET");
export const post = requester.bind(null, "POST");
export const put = requester.bind(null, "PUT");
export const del = requester.bind(null, "DELETE");
