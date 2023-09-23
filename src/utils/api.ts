const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
  return response.json();
};

const defaultHeaders = {
  "Content-Type": "application/json",
};

const createHeaders = (authToken: string) => {
  const headers: any = { ...defaultHeaders };
  headers.Authorization = authToken;

  return headers;
};

export const getRequest = async (url: string,) => {
  const response = await fetch(url, {
    method: "GET",
    headers: createHeaders(process.env.Auth_Token as string),
  });

  return handleApiResponse(response);
};

export const postRequest = async (
  url: string,
  data: any,
) => {
  const response = await fetch(url, {
    method: "POST",
    headers: createHeaders(process.env.NEXT_PUBLIC_Auth_Token as string),
    body: JSON.stringify(data),
  });

  return handleApiResponse(response);
};

export const putRequest = async (
  url: string,
  data: any,
) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: createHeaders(process.env.Auth_Token as string),
    body: JSON.stringify(data),
  });

  return handleApiResponse(response);
};

export const deleteRequest = async (url: string,) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: createHeaders(process.env.Auth_Token as string),
  });

  return handleApiResponse(response);
};
