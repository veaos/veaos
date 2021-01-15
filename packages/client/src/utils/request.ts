interface IRequest {
  method?: string;
  data?: any;
}

export const Request = (
  url: string = null,
  { method, data }: IRequest = {
    method: 'GET',
  }
) =>
  fetch(process.env.REACT_APP_API_URL + url, {
    method,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: data && JSON.stringify(data),
    credentials: 'include',
  }).then(async (response) => {
    if (!response.ok) throw new Error(response.statusText);

    const res = await response.json();

    if (res.data) {
      return res.data;
    }
  });
