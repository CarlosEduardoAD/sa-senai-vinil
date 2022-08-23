function HeroPromocoes() {
    return (
        <div className="dark:bg-[#151617] relative">
        <div className="flex items-center justify-center flex-col pt-[100px]">
            <div className='flex items-center justify-center text-white text-center'><p className="pb-[120px] font-inter text-2xl font-bold">Need low prices ?</p></div>
            <div className='flex flex-col flex-wrap md:grid md:grid-cols-6 md:grid-flow-row gap-12 dark:text-white pr-4 pl-4 pb-12'>
                <div className='p-20 bg-blue-600 rounded-md max-w-sm mx-auto md:p-22'>Aoba</div>
                <div className='p-20 bg-blue-600 rounded-md max-w-sm x-auto md:p-22'>Aoba</div>
                <div className='p-20 bg-blue-600 rounded-md max-w-sm mx-auto md:p-22'>Aoba</div>
            </div>
        </div>
        </div>
    )
}

export default HeroPromocoes;