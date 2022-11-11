import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

function SignUp() {
  const { t } = useTranslation();
  const navigation = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    shouldUseNativeValidation: true,
  });

  const onSubmit = (data) => {
    let userData = JSON.stringify(data.customerName);
    let userEmail = JSON.stringify(data.customerEmailSignUp);
    let userPassword = JSON.stringify(data.customerPasswordSignUp);
    axios.post("http://localhost:3000/register", {
      nome: userData,
      email: userEmail,
      password: userPassword,
    });
    navigation.push('/signin')
    console.log(JSON.stringify(data));
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white ">
          <div className="max-w-6xl sm:max-w-full mx-auto px-4 sm:px-6 dark:bg-[#151617]">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20 ">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20 text-4xl font-bold">
                <h1 className="h1 dark:text-white">{t("ParaEntrar")}</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-semibold mb-1 dark:text-white"
                        htmlFor="name"
                      >
                        {t("Nome")} <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="form-input w-full text-gray-800 dark:bg-neutral-700 dark:border-none dark:text-white rounded-md"
                        placeholder={t("ColoqueSeuNome")}
                        required
                        {...register("customerName", { required: true })}
                      />
                      {errors.customerName && (
                        <span className="text-red-600 mt-1">
                          Digite seu nome completo
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-semibold mb-1 dark:text-white"
                        htmlFor="email"
                      >
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input w-full text-gray-800 dark:bg-neutral-700 dark:border-none dark:text-white rounded-md"
                        placeholder={t("ColoqueSeuEmail")}
                        required
                        {...register("customerEmailSignUp", { required: true })}
                      />
                      {errors.customerEmailSignUp && (
                        <span className="text-red-600 mt-1">
                          Digite seu e-mail
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4 ">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-semibold mb-1 dark:text-white"
                        htmlFor="password"
                      >
                        {t("Senha")} <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-input w-full text-gray-800 dark:bg-neutral-700 dark:border-none dark:text-white rounded-md"
                        placeholder={t("ColoqueSeuEmail")}
                        required
                        {...register("customerPasswordSignUp", {
                          required: true,
                        })}
                      />
                      {errors.customerPasswordSignUp && (
                        <span className="text-red-600 mt-1">
                          Digite sua senha
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full py-3 rounded-md text-xl font-semibold">
                        {t("ComecarAFesta")}
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 text-center mt-3">
                    {t("AoSeCadastrar")}{" "}
                    <a className="underline" href="#0">
                      {t("TermosECondicoes")}
                    </a>
                    , {t("ENossa")}{" "}
                    <a className="underline" href="#0">
                      {t("Política")}
                    </a>
                    .
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
                  {t("JaTemConta")}{" "}
                  <Link
                    to="/signin"
                    className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                  >
                    {t("Login")}
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

export default SignUp;
