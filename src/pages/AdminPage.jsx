import {
  At,
  Phone,
  AddressBook,
  UserList,
  IdentificationBadge,
  Trash,
  ClockClockwise,
} from "phosphor-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

export function AdminPanel() {
  const [rows, setRows] = useState([]);
  const navigate = useHistory()

  useEffect(() => {
    let cookie = Cookies.get("admin_token");
    if (!cookie) {
      navigate.push("/signin");
    }
    const getData = async () => {
      await axios
        .get("http://localhost:3000/admin_itens", { withCredentials: true })
        .then((res) => {
          let customerData = res.data;
          setRows(customerData);
          console.log(rows);
        });
    };
    getData();
  },[]);

  const updatePurchase = (userId) => {
    console.log(userId);
    axios.put(
      "http://localhost:3000/update_purchase",
      { withCredentials: true },
      {
        params: { id: userId },
      }
    );
  };

  return (
    <div className="dark:bg-[#151617] bg-white -mt-8 py-12">
    <div className="flex items-center justify-center mx-64 bg-white dark:bg-[#212528] rounded-lg ">
      <div className="overflow-scroll border-2 rounded-lg dark:border-[#363E40]">
        <table className="table text-sm rounded-lg py-12 font-raleway text-[#363E40]">
          <thead>
            <tr className="border-b-2 dark:border-[#363E40]">
              <th className="text-lg dark:text-white">Id</th>
              <th className="bg-nome bg-no-repeat bg-[center_left_4rem] px-16 whitespace-nowrap py-2 text-start">
                <span className="">
                  <p className="text-[16px] dark:text-white">IdDisco </p>
                </span>
              </th>
              <th className="bg-email bg-no-repeat bg-[center_left_2rem] px-8 py-4 text-start">
                <p className="text-[16px] dark:text-white">IdCompra</p>
              </th>
              <th className="bg-phone bg-no-repeat bg-[center_left_2rem] px-8 py-4 text-start">
                <p className=" pt-[1px] text-[16px] dark:text-white">Quantidade</p>
              </th>
              <th className="bg-phone bg-no-repeat bg-[center_left_2rem] px-8 py-4 text-start">
                <p className=" pt-[1px] text-[16px] dark:text-white">Enviado ?</p>
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-100 dark:bg-[#262a32] dark:text-white">
            {rows.map((value, index) => {
              return (
                <tr key={index} className="mt-3">
                  <div className="pl-4 pt-4">
                    <th className="text-xs">{value.id}</th>
                  </div>
                  <td className="px-16 p-4">{value.id_disco}</td>
                  <td className="px-8" key={index}>
                    {value.id_compra}
                  </td>
                  <td className="px-8" key={index}>
                    {value.quantidade}
                  </td>
                  <td className="px-8" key={index}>
                    {value.enviado === 1 ? "Enviado" : "Não enviado"}
                  </td>
                  <td className="px-2">
                    <button
                      onClick={() => {
                        updatePurchase(value.id);
                      }}
                    >
                      <ClockClockwise size={15}></ClockClockwise>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </div>
    </div>


    // <div className="h-full">
    //   <div className=" sm:px-24 -mt-6">
    //     <table className="rounded-lg bg-[#E8E8E8] mt-12 font-raleway border-2 text-[#666D73] scrollbar-thin scrollbar-thumb-[#7F23F7] scrollbar-track-blue-slate-200 w-full">
    //       <div className="flex items-center justify-center h-10 gap-2 sm:gap-2 border-[#E8E8E8] rounded-md ">
    //         <div className="w-2/12 font-semibold sm:text-lg text-xs text-[#666D73]  flex  items-center justify-start">
    //           <span className="hidden sm:flex">
    //             <i className="mt-[4.5px] mr-1">
    //               <IdentificationBadge size={20}></IdentificationBadge>
    //             </i>
    //           </span>{" "}
    //           Nome
    //         </div>
    //         <div className="w-2/12 font-semibold sm:text-lg text-xs flex text-[#666D73] items-center justify-start">
    //           <span className="hidden sm:flex">
    //             <i className="mt-[4.5px] mr-1">
    //               <At size={20}></At>
    //             </i>
    //           </span>
    //           Email
    //         </div>
    //         <div className="w-2/12 font-semibold sm:text-lg text-xs flex text-[#666D73] items-center justify-start">
    //           <span className="hidden sm:flex">
    //             <i className="mt-[4.5px] mr-1">
    //               <Phone size={20}></Phone>
    //             </i>
    //           </span>
    //           Telefone
    //         </div>
    //         <div className="w-2/12 font-semibold sm:text-lg text-xs flex text-[#666D73] items-center justify-start">
    //           <span className="hidden sm:flex">
    //             <i className="mt-[4.5px] mr-1">
    //               <AddressBook size={20}></AddressBook>
    //             </i>
    //           </span>
    //           CNPJ
    //         </div>
    //         <div className="w-2/12 font-semibold sm:text-lg text-xs flex text-[#666D73] items-center justify-start">
    //           <span className="hidden sm:flex">
    //             <i className="mt-[4.5px] mr-1">
    //               <UserList size={20}></UserList>
    //             </i>
    //           </span>
    //           Endereço
    //         </div>
    //         <div className="w-2/12 font-semibold sm:text-lg text-xs flex text-[#666D73] items-center justify-start">
    //           <span className="hidden sm:flex">
    //             <i className="mt-[4.5px] mr-1">
    //               <UserList size={20}></UserList>
    //             </i>
    //           </span>
    //           Cidade
    //         </div>
    //       </div>
    //       {rows.map((value) => {
    //         return (
    //           <div className="bg-[#F9F9F9]">
    //             <div className="flex border-t-2 -mt-[2.4px] border-b-2 overflow-x-scroll text-[#363E40]  whitespace-normal">
    //               <div className="inline-block w-2/12 py-4  whitespace-normal">
    //                 <p className="  lg:text-md   md:text-sm text-xs ">
    //                   {value.nomeClient}
    //                 </p>
    //               </div>
    //               <div className="inline-blockw-2/12 py-4  whitespace-normal">
    //                 <p className="inline-block lg:text-md md:text-sm text-xs ">
    //                   {value.email}
    //                 </p>
    //               </div>
    //               <div className="inline-block w-2/12 py-4  whitespace-normal">
    //                 <p className="lg:text-md md:text-sm text-xs">
    //                   {value.telefone}
    //                 </p>
    //               </div>
    //               <div className="inline-block w-2/12 py-4 xwhitespace-normal">
    //                 <p className=" lg:text-md md:text-sm text-xs ">
    //                   {value.cnpj}
    //                 </p>
    //               </div>
    //               <div className="inline-block  w-2/12 py-4">
    //                 <p className=" lg:text-md md:text-sm text-xs whitespace-normal">
    //                   {value.endereco}
    //                 </p>
    //               </div>
    //               <div className="inline-block  w-2/12 ">
    //                 <p className="lg:text-md md:text-sm text-xs whitespace-normal ">
    //                   {value.cep}
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </table>
    //   </div>
    // </div>
  );
}
