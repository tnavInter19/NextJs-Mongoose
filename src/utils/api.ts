
const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
  return response.json();
};

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const createHeaders = (isLoggedIn: boolean, authToken?: string) => {
  const headers: any = { ...defaultHeaders };
  if (isLoggedIn) {
    headers.Authorization = authToken;
  }
  return headers;
};

export const getRequest = async (url: string, isLoggedIn: boolean, authToken?: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: createHeaders(isLoggedIn, authToken),
  });

  return handleApiResponse(response);
};

export const postRequest = async (
  url: string,
  data: any,
  isLoggedIn: boolean,
  authToken?: string
) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: createHeaders(isLoggedIn, authToken),
    body: JSON.stringify(data),
  });

  return handleApiResponse(response);
};

export const putRequest = async (
  url: string,
  data: any,
  isLoggedIn: boolean,
  authToken?: string
) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: createHeaders(isLoggedIn, authToken),
    body: JSON.stringify(data),
  });

  return handleApiResponse(response);
};

export const deleteRequest = async (url: string, isLoggedIn: boolean, authToken?: string) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: createHeaders(isLoggedIn, authToken),
  });

  return handleApiResponse(response);
};
