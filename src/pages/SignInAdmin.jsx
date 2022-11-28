import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

export function SignInAdmin() {
  const navigate = useHistory();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    shouldUseNativeValidation: true,
  });
  const onSubmit = (data) => {
    let userData = JSON.stringify(data.customerEmail);
    let userPassword = JSON.stringify(data.customerPassword);
    sessionStorage.setItem("username", userData);
    axios
      .post(
        "http://localhost:3000/admin_login",
        {
          email: userData,
          password: userPassword,
        },
        { withCredentials: true }
      ).then((res) => {
        console.log(res)
        navigate.push("/admin-panel");
      })
      .catch((error) => {
        if(error){
          console.log(error.response)
          navigate.push("/login-admin")
        }
      });

  };
  return (
    <div className="flex flex-col min-h-screen overflow-hidden -mt-8">
      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl sm:max-w-full dark:bg-[#151617] mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1 dark:text-white text-4xl font-bold">
                  {t('SejaBemVindoAdmin')}
                </h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-semibold mb-1 dark:text-white"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input w-full text-gray-800 dark:bg-neutral-700 dark:border-none dark:text-white rounded-lg"
                        placeholder={t("ColoqueSeuEmail")}
                        required
                        {...register("customerEmail", {
                          required: true,
                          pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                        })}
                      />
                      {errors.customerEmail && (
                        <p className="text-red-500 text-xs italic">
                          Digite seu e-mail por favor
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label
                          className="block text-gray-800 text-sm font-semibold mb-1 dark:text-white"
                          htmlFor="password"
                        >
                          {t("Senha")}
                        </label>
                      </div>
                      <input
                        id="password"
                        type="password"
                        className="form-input w-full text-gray-800 dark:text-white dark:bg-neutral-700 dark:border-none rounded-lg"
                        placeholder={t("ColoqueSuaSenha")}
                        required
                        {...register("customerPassword", {
                          required: true,
                          minLength: 8,
                        })}
                      />
                      {errors.customerPassword && (
                        <p className="text-red-500 text-xs italic">
                          Digite sua senha por favor
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox bg-neutral-500 rounded-sm dark:bg-white"
                          />
                          <span className="text-gray-800 ml-2">
                            {t("LembrarMinhaSenha")}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full rounded-md py-3">
                        <p className="text-xl font-semibold">{t("Entrar")}</p>
                      </button>
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
