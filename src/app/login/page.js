"use client";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
// import { Spinner } from "@nextui-org/react";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ username: "", password: "" });
      const res = await signIn("credentials", {
        redirect: true,
        username: "John Doe",
        password: "12345",
        callbackUrl,
      });
      setLoading(false);
      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("invalid email or password");
        console.log(error, "564644")
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error, "dgdghdfghdfh")
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //   if (loading) {
  //     return (
  //       <div className="h-screen flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-white z-50">
  //         <Spinner />
  //       </div>
  //     );
  //   }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-80 rounded-md bg-orange-100 ">
        <div className="flex justify-center items-center">
          <h1 className="text-xl font-bold md:text-2xl text-gray-900">
            Log In to your account
          </h1>
        </div>
        <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
          {error && (
            <p className="text-center bg-red-300 py-2 mb-6 rounded">{error}</p>
          )}
          <div className="mb-6">
            <input
              required
              type="text"
              name="username"
              value={formValues.username}
              onChange={handleChange}
              placeholder="Username"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              required
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Password"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            style={{ backgroundColor: "blue" }}
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            disabled={loading}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
