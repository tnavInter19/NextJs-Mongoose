
const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
  return response.json();
};

export const postRequest = async (url: string, data: any, isLoggedIn?:boolean, authToken?:string) => {


  const headers: any = {
    'Content-Type': 'application/json',
  };
  if (isLoggedIn) {
   headers.Authorization = authToken;
 }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  return handleApiResponse(response);
};
