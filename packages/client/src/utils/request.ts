interface IRequest {
  method?: string;
  data?: any;
  query?: {
    [key: string]: string;
  };
}

export const Request = (
  url: string = null,
  { method, data, query }: IRequest = {
    method: 'GET',
  }
) => {
  let queryString;

  if (query) {
    queryString = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }

  return fetch(
    `${process.env.REACT_APP_API_URL}${url}${
      queryString ? `?${queryString}` : ''
    }`,
    {
      method,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: data && JSON.stringify(data),
      credentials: 'include',
    }
  ).then(async (response) => {
    if (!response.ok) throw new Error(response.statusText);

    const res = await response.json();

    if (res.data) {
      return res.data;
    }
  });
};
