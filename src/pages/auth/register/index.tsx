import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";
import { RootState } from "../../../redux/store";
import { RegisterRequestBody } from "../../api/register";
import { postRequest } from "../../../utils/api";

function Registartion() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const authToken = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) {
      // Redirect to the login page or an "unauthorized" page
      router.push("/dashboard");
    }
  }, [isLoggedIn,router]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const registrationSchema: any = {
    username: {
      required: "Username is required",
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email address",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters long",
      },
    },
  };

  const validateField = (fieldName: string, value: string) => {
    const fieldValidation = registrationSchema[fieldName];
    let errorMessage = "";

    if (fieldValidation.required && !value.trim()) {
      errorMessage = fieldValidation.required;
    } else if (
      fieldValidation.pattern &&
      !fieldValidation.pattern.value.test(value)
    ) {
      errorMessage = fieldValidation.pattern.message;
    } else if (
      fieldValidation.minLength &&
      value.length < fieldValidation.minLength.value
    ) {
      errorMessage = fieldValidation.minLength.message;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsername(name === "username" ? value : username);
    setEmail(name === "email" ? value : email);
    setPassword(name === "password" ? value : password);

    // Perform real-time validation on every keystroke
    validateField(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Perform final validation when the field loses focus
    validateField(name, value);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!username) {
      newErrors["username"] = "Username is required";
    }

    if (!email) {
      newErrors["email"] = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors["email"] = "Invalid email address";
    }

    if (!password) {
      newErrors["password"] = "Password is required";
    } else if (password.length < 8) {
      newErrors["password"] = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
  };

  const canSubmitForm: boolean =
    username !== "" && email !== "" && password !== "";
  const isValidEmail = (email: string) => {
    // Basic email validation regex, you can use a more robust one if needed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Final validation on form submission
    // for (const field in registrationSchema) {
    //   if (Object.prototype.hasOwnProperty.call(registrationSchema, field)) {
    //     const value = (this as any)[field];
    //     validateField(field, value);
    //   }
    // }

    validateForm();

    // If there are errors, prevent form submission
    if (Object.keys(errors).length > 0) {
      return;
    }

    var data: RegisterRequestBody = {
      name: username,
      email: email,
      password: password,
    };
    postRequest("/api/register", data)
      .then(() => {
       
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };
  return (
   <div className="flex min-h-screen flex-1 flex-col justify-center py-15 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md ">
        <Image
          className="mx-auto h-10 w-auto"
          src="/mark.svg"
          alt="Your Company"
          width={40} // Set the width of the image
          height={40} // Set the height of the image
        />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleFormSubmit}>
       
          <div className="mt-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
               Username
              </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>  
            
              <div className="mt-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
       

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>



            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registartion;
