"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

export async function register(values: any) {
  const data = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(values),
  });
  return await data.json();
}

const SignUp: React.FC = () => {
  const t = useTranslations("SignUp");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register(formData);
      console.log("##### RES -->", res);
      setIsSuccess(true);
      console.log("User registered successfully");
    } catch (err) {
      console.error("Failed to register user:", err);
      setIsError(true);
    }
  };

  const isLoading = false;

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl w-full">
      <figure className="lg:w-1/2">
        <img
          src="https://picsum.photos/seed/login/800/600"
          alt="Random image"
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body lg:w-1/2">
        <h2 className="card-title text-2xl font-bold mb-6">{t("title")}</h2>
        <form>
          <div className="form-control">
            <label className="label">
              <span className="label-text">{t("username")}</span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input type="text" className="grow" placeholder="Username" />
            </label>
            <label className="label">
              <span className="label-text">{t("email")}</span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                className="grow"
                placeholder="email@example.com"
              />
            </label>
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">{t("password")}</span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Enter password"
              />
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">{t("registerButton")}</button>
          </div>
        </form>
        <div className="divider">{t("divider")}</div>
        <div className="text-center">
          <p>{t("alreadyRegistered")}</p>
          <a href="#" className="link link-primary">
            {t("loginLink")}
          </a>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //     <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
  //       <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
  //       <form onSubmit={handleSubmit} className="space-y-4">
  //         <div>
  //           <label
  //             htmlFor="name"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Name
  //           </label>
  //           <input
  //             type="text"
  //             id="name"
  //             name="name"
  //             value={formData.name}
  //             onChange={handleChange}
  //             required
  //             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  //           />
  //         </div>

  //         <div>
  //           <label
  //             htmlFor="email"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Email
  //           </label>
  //           <input
  //             type="email"
  //             id="email"
  //             name="email"
  //             value={formData.email}
  //             onChange={handleChange}
  //             required
  //             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  //           />
  //         </div>

  //         <div>
  //           <label
  //             htmlFor="password"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Password
  //           </label>
  //           <input
  //             type="password"
  //             id="password"
  //             name="password"
  //             value={formData.password}
  //             onChange={handleChange}
  //             required
  //             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  //           />
  //         </div>

  //         <button
  //           type="submit"
  //           disabled={isLoading}
  //           className="btn btn-primary"
  //         >
  //           {t("registerButton")}
  //         </button>

  //         {isSuccess && (
  //           <p className="text-green-500 mt-4">User registered successfully!</p>
  //         )}
  //         {isError && (
  //           <p className="text-red-500 mt-4">Error: joder algo salio mal</p>
  //         )}
  //       </form>
  //     </div>
  //   </div>
  // );
};

export default SignUp;
