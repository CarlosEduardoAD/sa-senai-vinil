function HeroPayment() {
    return (
        <div className="dark:bg-[#151617] min-h-screen max-w-full flex-wrap">
            <div className="flex items-center justify-center pt-36 border-white p-12">
                <form>
                    <div className="flex flex-col dark:text-white text-black font-inter font-semibold">
                        <label className="text-md">Select the payment method</label>
                        <select className='mt-2 rounded-lg dark:bg-neutral-700'>
                            <option>Credit card</option>
                            <option>Debit card</option>
                            <option>Pix Key</option>
                        </select>
                        <label className="text-lg pt-8 mb-2">
                            Adress
                        </label>
                        <input className="max-w-lg h-7 rounded-lg dark:bg-neutral-700 border-none" type="text" />
                        <label className="text-lg my-2">
                            Telephone
                        </label>
                        <input className="max-w-lg h-7 rounded-lg dark:bg-neutral-700 border-none " type="text" />
                        <label className="text-lg my-2 ">
                            Adress
                        </label>
                        <input className="max-w-lg h-7 dark:bg-neutral-700 rounded-lg border-none" type="text" />
                        <input className='max-w-xl h-10 dark:bg-neutral-700 rounded-lg border-none mt-7' type="submit" />
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default HeroPayment