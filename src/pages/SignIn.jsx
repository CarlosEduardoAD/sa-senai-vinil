import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

function SignIn() {
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
        "http://localhost:3000/login",
        {
          email: userData,
          password: userPassword,
        },
        { withCredentials: true }
      ).then((res) => {
       navigate.push("/Catalog")
      })
      .catch((error) => {
        if(error){
          alert("E-mail ou senha inválidos")
          console.log(error.response)
          navigate.push("/signin")
          navigate.go(0)
        }
      });
  };
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl sm:max-w-full dark:bg-[#151617] mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1 dark:text-white text-4xl font-bold">
                  {t("AFestaEstaBombando")}
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
                          pattern: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i,
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
                        <Link
                          to="reset-password"
                          className="text-sm font-medium text-blue-600 hover:underline"
                        >
                          {t("EsqueceuASenha")}
                        </Link>
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
                <div className="flex items-center my-6">
                  <div
                    className="border-t border-gray-300 flex-grow mr-3"
                    aria-hidden="true"
                  ></div>
                  <div className="text-gray-600 italic">{t("Ou")}</div>
                  <div
                    className="border-t border-gray-300 flex-grow ml-3"
                    aria-hidden="true"
                  ></div>
                </div>
                <div className="text-gray-600 text-center mt-6">
                  {t("NaoTemConta")}{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                  >
                    {t("Cadastro")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignIn;
