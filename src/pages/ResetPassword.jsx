import React from 'react';
import axios from 'axios'
import { FormEvent } from 'react'

function ResetPassword() {


  function resetUserPassword(e){
    e.preventDefault()
    const myForm = new FormData(e.target)
    console.log(myForm)
    const request = Object.fromEntries(myForm)
    console.log(request)
    const userData = {
      email : request.email,
      password : request.password
    }
    axios.post('http://localhost:3000/reset', userData  )
  }

  return (

    <div className="flex flex-col min-h-screen overflow-hidden bg-gray-100 dark:bg-[#151617]">
      {/*  Page content */}
      <main className="flex-grow">

        <section className="">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1 mb-4 text-4xl dark:text-white font-inter font-bold">Let’s get you back up on your feet</h1>
                <p className="text-xl text-gray-600 font-inter font-semibold">Enter the email address you used when you signed up for your account, and we’ll email you a link to reset your password.</p>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={resetUserPassword}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                      <input id="email" name='email' type="email" className="form-input w-full text-gray-800 dark:text-gray-200 dark:bg-neutral-700 " placeholder="Enter your email address" required />
                    </div>
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1 mt-4" htmlFor="email">Password<span className="text-red-600">*</span></label>
                      <input id="password" name='password' type="password" className="form-input w-full text-gray-800 dark:text-gray-200 dark:bg-neutral-700 " placeholder="Enter your new password" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full py-3 rounded-lg text-xl font-semibold">Reset password</button>
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </section>

      </main>

    </div>
  );
}

export default ResetPassword;
