import { login } from "@/redux/actions/authAction";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import Link from "next/link";
import { LoginRequestBody, LoginResponseBody } from "@/pages/api/login";
import { postRequest } from "@/utils/api";

function LoginPage() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) {
      // Redirect to the login page or an "unauthorized" page
      router.push("/dashboard");
    }
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const contentType = "application/json";

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    var req: LoginRequestBody = {
      email: email,
      password: password,
    };
    console.log(req)
    postRequest("/api/login", req)
      .then((res: LoginResponseBody) => {
        console.log("Response Data:", res);

        const token = res.token;
        dispatch(login(token));
        router.push("/dashboard");
      })
      .catch((error) => {
       console.log(error.message)
        setMessage(error.message);
      });
    //     try {
    //     await fetch('/api/login', {
    //        method: 'POST',
    //        headers: {
    //          Accept: contentType,
    //          'Content-Type': contentType,
    //        },
    //        body: JSON.stringify({ email, password }),
    //      }).then((response) => response.json())
    //      .then((data: c) => {
    //        console.log('Response Data:', data);
    //        // Handle the response data here
    //        const token =data.token;
    //           dispatch(login(token))
    //       router.push("/dashboard");
    //      })
    //      .catch((error) => {
    //        console.error('Error:', error);
    //        // Handle the error here
    //      });

    //    } catch (error) {
    // console.log(error)
    //    }
    // Authenticate the user (replace this with your authentication logic)
    // const response = await fetch("/api/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email, password }),
    // });

    // if (response.ok) {
    //   const { token } = await response.json();
    //   localStorage.setItem("token", token);
    //   router.push("/dashboard");
    // } else {
    //   alert("Invalid email or password");
    // }

    // const token: string = "djsnjifnjn";
    // const axiosInstance: AxiosInstance = axios.create({
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     // Add other default headers if needed
    //     // "Content-Type": "application/json",
    //   },
    // });

    // new AuthApi(undefined, undefined, axiosInstance)
    // .loginUser({ email, password })
    // .then((data) => {
    //  // localStorage.setItem("token", data);
    //   var token:string =data.data['token']
    //  dispatch(login(token))
    //   router.push("/dashboard");
    //   console.log(data.data)
    // })
    // .catch((error) => {
    //   console.log(error.response.data.msg);
    // });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-md shadow-lg w-96">
        <h1 className="text-3xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
