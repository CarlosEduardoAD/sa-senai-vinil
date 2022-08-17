import { Link } from "react-router-dom";

function NotFoundPage(){
    return(
        <div className="flex items-center justify-center pt-44  flex-col">
            <p className='font-inter text-4xl font-bold'>Huh, I guess there's nothing here...</p>
            <Link className="mt-4 p-4 border-2 rounded-full hover:bg-blue-700 hover:text-white transition-all duration-200" to='/'>Voltar</Link>
        </div>
    )
}

export default NotFoundPage