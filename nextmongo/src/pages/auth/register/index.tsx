import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import Link from "next/link";
import { RegisterRequestBody } from "@/pages/api/register";
import { postRequest } from "@/utils/api";

function Registartion() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const authToken = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) {
      // Redirect to the login page or an "unauthorized" page
      router.push("/dashboard");
    }
  }, []);

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
    postRequest("/api/register", data, isLoggedIn, authToken!)
      .then(() => {
        console.log("User registered successfully!");
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-md shadow-lg w-96">
        <h1 className="text-3xl font-semibold mb-4 ">Register</h1>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                errors["username"] ? "border-red-500" : ""
              }`}
            />
            {errors["username"] && (
              <p className="text-red-500 text-sm">{errors["username"]}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                errors["email"] ? "border-red-500" : ""
              }`}
            />
            {errors["email"] && (
              <p className="text-red-500 text-sm">{errors["email"]}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                errors["password"] ? "border-red-500" : ""
              }`}
            />
            {errors["password"] && (
              <p className="text-red-500 text-sm">{errors["password"]}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
            >
              Register
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-3">
              Already have an account{" "}
              <Link
                href="/auth/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login
              </Link>
            </p>
          </div>

          {message && <p className="text-center mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Registartion;
