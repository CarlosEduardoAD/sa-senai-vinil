import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

function Cadastro() {
  const { register, handleSubmit, formState: {errors} } = useForm({
    shouldUseNativeValidation: true,
    mode: "onSubmit",
    shouldFocusError: true,
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="grid grid-cols-2 text-white">
      <div className="bg-black min-h-screen">
        <p className="flex items-center justify-center">
          Aqui vai aquele texto brabo
        </p>
      </div>
      <div className="bg-[#1B1B1B] flex items-center justify-center flex-col min-h-screen">
        <div className="pr-12 pl-12 pt-8 pb-8 bg-[#252322] rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <legend className="flex items-center justify-center mb-7 font-semibold text-2xl">
              Vamos relembrar o passado ?
            </legend>
            <fieldset className="flex flex-col space-y-3">
              <label>Nome completo</label>
              <input className="rounded-md bg-neutral-700" {...register('nomeCompleto', {required : true})}/>
              {errors.nomeCompleto?.type === 'required' && <p className="text-red-500 text-xs">Precisamos do seu nome completo</p>}
              <label>Endereço</label>
              <input className="rounded-md bg-neutral-700" type="text" {...register('enderecoCliente', {required : true})}/>
              {errors.enderecoCliente?.type === 'required' && <p className="text-red-500 text-xs">Precisamos do seu endereço para entrega</p>}
              <label>E-mail</label>
              <input className="rounded-md bg-neutral-700" type="email" {...register('emailCliente', {required : true})}/>
              {errors.emailCliente?.type === 'required' && <p className="text-red-500 text-xs">Precisamos do seu e-mail para seu cadastro</p>}
              <label>Senha</label>
              <input className="rounded-md bg-neutral-700" type="password" {...register('senhaCliente', {required : true})}/>
              {errors.senhaCliente?.type === 'required' && <p className="text-red-500 text-xs">Precisamos da sua senha também</p>}
              <input
                className="p-2 border border-white rounded-lg "
                type="submit"
                value="Entrar"
                id="entrar"
                name="entrar"
              />
            </fieldset>
          </form>
          <div className="flex flex-row space-x-4 items-center justify-center mt-7">
            <Button
              variant="outlined"
              className="border border-white rounded-lg p-2 font-bold"
            >
              Google
            </Button>
            <Button
              variant="outlined"
              className="border border-white rounded-lg p-2 font-bold"
            >
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
