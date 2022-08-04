function Login(){
    return(
        <div className='grid grid-cols-2 text-white'>
            <div className='bg-black h-screen'>
                <p className='flex items-center justify-center'>Aqui vai aquele texto brabo</p>
            </div>
            <div className='bg-[#1B1B1B] flex items-center justify-center flex-col'>
                <div className='pr-12 pl-12 pt-12 pb-16 bg-[#252322]'>
                <form>
                    <legend className='flex items-center justify-center mb-7 font-semibold'>Vale a pena ver de novo</legend>
                    <fieldset className='flex flex-col space-y-3'>
                        <label for='email'>E-mail</label>
                        <input className='rounded-md' type='email' id='email' name='email'/>
                        <label for='senha'>Senha</label>
                        <input className='rounded-md' type='password' id='senha' name='senha'/>
                        <input className='p-2 border border-white rounded-lg ' type='submit' value='Entrar' id='entrar' name='entrar'/>
                    </fieldset>
                </form>
                <div className='flex flex-row space-x-4 items-center justify-center mt-7'>
                    <button className='border border-white rounded-lg p-2'>Google</button>
                    <button className='border border-white rounded-lg p-2'>Facebook</button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Login