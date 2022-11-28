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
import { useTranslation } from "react-i18next";

export function AdminPanel() {
  const [rows, setRows] = useState([]);
  const navigate = useHistory();
  const { t } = useTranslation();

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
  }, []);

  return (
    <div className="dark:bg-[#151617] bg-white -mt-8 py-12">
      <div className="flex items-center justify-center mx-48 bg-white dark:bg-[#212528] rounded-lg">
        <div className="overflow-scroll border-2 rounded-lg dark:border-[#363E40] z-10">
          <table className="table text-sm rounded-lg py-12 font-raleway text-[#363E40]">
            <thead>
              <tr className="border-b-2 dark:border-[#363E40]">
                <th className="text-lg dark:text-white">Id</th>
                <th className="bg-nome bg-no-repeat bg-[center_left_4rem] px-16 whitespace-nowrap py-2 text-start">
                  <span className="">
                    <p className="text-[16px] dark:text-white">
                      {t("IdDisco")}
                    </p>
                  </span>
                </th>
                <th className="bg-phone bg-no-repeat bg-[center_left_2rem] px-8 py-4 text-start">
                  <p className=" pt-[1px] text-[16px] dark:text-white">
                    {t("NomeDoDisco")}
                  </p>
                </th>
                <th className="bg-email bg-no-repeat bg-[center_left_2rem] px-8 py-4 text-start">
                  <p className="text-[16px] dark:text-white">{t("IdCompra")}</p>
                </th>
                <th className="bg-phone bg-no-repeat bg-[center_left_2rem] px-8 py-4 text-start">
                  <p className=" pt-[1px] text-[16px] dark:text-white">
                    {t("Quantidade")}
                  </p>
                </th>
                <th className="bg-phone bg-no-repeat bg-[center_left_2rem] px-8 py-4 text-start">
                  <p className=" pt-[1px] text-[16px] dark:text-white">
                    {t("PrecoTotal")}
                  </p>
                </th>
                <th className="bg-phone bg-no-repeat bg-[center_left_2rem] px-8 py-4 text-start">
                  <p className=" pt-[1px] text-[16px] dark:text-white">
                    {t("DataDeCompra")}
                  </p>
                </th>
                <th className="bg-phone bg-no-repeat bg-[center_left_2rem] px-8 py-4 text-start">
                  <p className=" pt-[1px] text-[16px] dark:text-white whitespace-nowrap">
                    {t("Enviado")}
                  </p>
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-100 dark:bg-[#262a32] dark:text-white">
              {rows.map((value, index) => {
                return (
                  <tr key={index} className="mt-3">
                    <div className="pl-4 pt-[25px]">
                      <th
                        className={`${
                          value.enviado === 1
                            ? "text-emerald-500"
                            : "text-red-500"
                        } px-4`}
                      >
                        {value.id}
                      </th>
                    </div>

                    <td className="px-16 p-4">{value.id_disco}</td>
                    <td className="p-4">{value.nome}</td>
                    <td className="px-8" key={index}>
                      {value.id_compra}
                    </td>
                    <td className="px-8" key={index}>
                      {value.quantidade}
                    </td>
                    <td className="px-8" key={index}>
                      {value.preco_total}
                    </td>
                    <td className="px-8" key={index}>
                      {new Date(parseInt(value.data)).toLocaleDateString()}
                    </td>
                    <td
                      className={`${
                        value.enviado === 1
                          ? "text-emerald-500"
                          : "text-red-500"
                      } px-8`}
                      key={index}
                    >
                      {value.enviado === 1 ? t("EnviadoTabela") : t("NaoEnviadoTabela")}
                    </td>
                    <td className="px-2">
                      <button
                        onClick={() => {
                          console.log(value.id);
                          axios
                            .put(
                              "http://localhost:3000/update_purchase",
                              { withCredentials: true },
                              {
                                params: { id: value.id },
                              }
                            )
                        navigate.go(0)
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
  );
}
