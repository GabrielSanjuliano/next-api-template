export const api = {
  get: async (url: string) => await handleRequest("GET", url),
  post: async (url: string, payload: any) =>
    await handleRequest("POST", url, payload),
  patch: async (url: string, payload: any) =>
    await handleRequest("PATCH", url, payload),
  delete: async (url: string) => await handleRequest("DELETE", url),
};

async function handleRequest(method: string, url: string, payload?: any) {
  return fetch(`/api/${url}`, {
    method: method,
    body: JSON.stringify(payload),
    headers: {
      "request-origin": "client",
    },
  })
    .then((response) => {
      if (response.status !== 200) {
        return response.json().then((error) => error);
        // throw new Error("error", errors);
      }
      return response.json();
    })

    .then((res) => {
      return res;
    })
    .catch((error) => error);
}
