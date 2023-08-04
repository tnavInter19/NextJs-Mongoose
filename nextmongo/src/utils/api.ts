

const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
  return response.json();
};

export const postRequest = async (url: string, data: any) => {

 const isLoggedIn = useIsLoggedIn();
  const token = useAuthToken();
  const headers: any = {
    'Content-Type': 'application/json',
  };

  // Add authentication token to the request headers if the user is logged in
  // if (isLoggedIn) {
  //   // Replace 'your_auth_token' with the actual authentication token, e.g., from cookies or local storage
  //   headers.Authorization = token;
  // }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  return handleApiResponse(response);
};
