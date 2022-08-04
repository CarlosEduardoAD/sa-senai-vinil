import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';


function Login(){
    const { register, handleSubmit, formState: {errors} } = useForm({
        shouldUseNativeValidation: true,
        mode: "onSubmit",
        shouldFocusError: true,
    });

    const onSubmit = async (data) => {
        console.log(data);
        console.log('Uau está funcionando !')
    }

    return(
        <div className='grid grid-cols-2 text-white'>
            <div className='bg-black h-screen'>
                <p className='flex items-center justify-center'>Aqui vai aquele texto brabo</p>
            </div>
            <div className='bg-[#1B1B1B] flex items-center justify-center flex-col'>
                <div className='pr-12 pl-12 pt-12 pb-16 bg-[#252322]'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <legend className='flex items-center justify-center mb-7 font-semibold text-2xl'>Vale a pena ver de novo</legend>
                    <fieldset className='flex flex-col space-y-3'>
                        <label className='text-xl font-semibold'>E-mail</label>
                        <input className='rounded-md bg-neutral-700' type='email' id='email' name='email' {...register('emailLogin', {required : true, validate : (value) => value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)})}/>
                        {errors.emailLogin?.type === 'required' && <p className='text-red-500 text-xs'>Precisamos do seu e-mail para seu cadastro</p>}
                        <label className='text-xl font-semibold'>Senha</label>
                        <input className='rounded-md bg-neutral-700' {...register('senhaLogin', {required : true})} type='password'/>
                        {errors.senhaLogin?.type === 'required' && <p className='text-red-500 text-xs'>Precisamos da sua senha também</p>}
                        <input className='p-2 border border-white rounded-lg' type='submit' value='Entrar'/>
                    </fieldset>
                </form>
                <div className='flex flex-row space-x-4 items-center justify-center mt-7'>
                    <Button variant='outlined' className='border border-white rounded-lg p-2 font-bold'>Google</Button>
                    <Button variant='outlined' className='border border-white rounded-lg p-2 font-bold'>Facebook</Button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Login
