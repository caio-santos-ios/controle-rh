"use client"

import { Tlogin } from "@/@types/login";
import { api } from "@/api/service";
import { useForm } from "react-hook-form";
import { setCookie } from 'cookies-next';
import { useRouter } from "next/navigation";

export const Login = () => {
  const { register, handleSubmit } = useForm<Tlogin>()
  const router = useRouter()

    const login = async (data: Tlogin) => {
      try {
        const res = await api.post("/collaborators/login", data)
        setCookie('token', res.data)
        router.push("/dashboard")
      } catch (error) {
        console.log(error)
      }
    }

    return(
        <>
        <div className="w-[80%] flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Controle RH
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(login)} className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="registerNumber" className="block text-sm font-medium leading-6 text-gray-900">
                  Número de registro
                </label>
                <div className="mt-2">
                  <input {...register("registerNumber")} id="registerNumber" name="registerNumber" type="text" autoComplete="registerNumber" required maxLength={5}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-1" 
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Senha
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Esqueceu a senha?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    {...register("password")}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-1"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Entrar
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Colaborador novo? {" "}
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Procure o RH da empresa</a>
            </p>
          </div>
        </div>
      </>
    )
}