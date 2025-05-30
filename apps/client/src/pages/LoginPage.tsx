// Import necessary libraries and styles
import { Toaster } from "sonner";
import '../index.css'
import { Link } from "@tanstack/react-router";
import React from 'react';
/* import { LoginForm } from "@/features/auth/components/LoginForm"; 
import { useAuth } from "@/hooks/useAuth";
import { Route as loginRoute } from '@/routes/auth/login.route.ts'; */

const Login: React.FC = () => { 

  return (  
    <div>
      <div className="flex items-center justify-center mt-[70px] px-4 sm:px-6 lg:px-8">

        {/* Card container */}
        <div className="max-w-md w-full space-y-8">

          {/* Card header */}
          <div>
            <h2 className="text-center font-neue text-4xl font-bold text-black">Login</h2>
            <p className="mt-2 font-roboto font-normal text-center text-sm md:text-base text-gray-600">
              Enter your email and password below to create an account.
            </p>
          </div>

          <Toaster richColors expand={true} position="top-right" />

          {/* Form */}
          <form
            action="#"
            className="mt-8 space-y-6"
            method="POST"
          >
            <input name="remember" type="hidden" value="true" />

            {/* Email/Password */}
            <div className="space-y-px">
              
              {/* Email */}
              <div>
                <label className="font-roboto sr-only" htmlFor="email-address">
                  Email address
                </label>
                <input
                  required
                  className="font-roboto appearance-none border-black rounded-xl relative block w-full mb-2 px-3 py-2 hover:border-gray-600 placeholder-gray-600 text-black bg-white focus:bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    id="email-address"
                  name="email"
                  
                  placeholder="Email address"
                  type="email"
                />
              </div>

              {/* Password */}
              <div>
                <label className="sr-only" htmlFor="password">
                  Password
                </label>
                <input
                  required
                  className="appearance-none border-black rounded-xl relative block w-full mb-2 px-3 py-2 hover:border-gray-600 placeholder-gray-600 text-black bg-white focus:bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                />
              </div>
            </div>

            {/* Forgot/Remember */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                />
                <label
                  className="font-roboto font-normal ml-2 block text-sm text-gray-700"
                  htmlFor="remember-me"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a className="text-sm text-gray-500" href="#">
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black"
                type="submit"
              >
                Sign in
              </button>
            </div>  

          </form>

          {/* Create account */}
          <div className="flex justify-between items-center">
            <p className="flex-grow md:text-base text-left text-sm font-roboto font-normal text-gray-600">
              Don't you have an account yet?
            </p>
            <Link to="/register">
              <button className="text-right md:text-base font-roboto font-normal text-gray-600 text-sm mr-5">Register</button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
