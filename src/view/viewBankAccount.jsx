import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Transaction from "../component/Transaction";
import Virement from "../component/Virement";
import Depot from "../component/Depot";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { format } from "date-fns";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Button from "@mui/material/Button";
import SideBard from "../component/sideBard";
import img from "../assets/logo.png"

const ViewBankAccounts = () => {
  const { id } = useParams();
  const TOKEN = sessionStorage.getItem("token");
  const [account, setAccount] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [virements, setVirements] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [value, setValue] = useState(dayjs("2022-04-17"));
  const [value2, setValue2] = useState(dayjs("2022-04-17"));

  useEffect(() => {
          if (sessionStorage.getItem("token") == null) {
            navigate("/");
          }
        }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/view_account?account_id=${id}`, {
        params: {
          id,
        },
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        setAccount(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the accounts!", error);
      });

    axios
      .get(`http://localhost:8000/account/transactions?account_id=${id}`, {
        params: {
          id,
        },
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        console.log("Transacs : ", response.data);
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the accounts!", error);
      });

    axios
      .get(`http://localhost:8000/account/virements?account_id=${id}`, {
        params: {
          id,
        },
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        console.log("Vires : ", response.data);
        setVirements(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the accounts!", error);
      });

    axios
      .get(`http://localhost:8000/account/deposits?account_id=${id}`, {
        params: {
          id,
        },
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        console.log("Transacs : ", response.data);
        setDeposits(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the accounts!", error);
      });
  }, []);

  // download pdf
  const handleDownloadPDF = (values, virement, deposit) => {
    const pdf = new jsPDF();
    const headers = [["Date", "Débit", "Motif"]];
    let data = [];
    console.log(data);
    console.log(values, "values");

    pdf.setFontSize(16);

    for (let i = 0; i < values.length; i++) {
      if (
        new Date(values[i].date) >= new Date(value.$d) &&
        new Date(values[i].date) <= new Date(value2.$d)
      ) {
        data.push([
          values[i].motif,
          values[i].price.toFixed(2),
          format(new Date(values[i].date), "dd/MM/yyyy HH:mm"),
        ]);
      }
    }
    for (let i = 0; i < virement.length; i++) {
      if (
        new Date(virement[i].date) >= new Date(value.$d) &&
        new Date(virement[i].date) <= new Date(value2.$d)
      ) {
        data.push([
          virement[i].motif,
          virement[i].price.toFixed(2),
          format(new Date(virement[i].date), "dd/MM/yyyy HH:mm"),
        ]);
      }
    }
    for (let i = 0; i < deposit.length; i++) {
      if (
        new Date(deposit[i].date) >= new Date(value.$d) &&
        new Date(deposit[i].date) <= new Date(value2.$d)
      ) {
        data.push([
          deposit[i].motif,
          deposit[i].price.toFixed(2),
          format(new Date(deposit[i].date), "dd/MM/yyyy HH:mm"),
        ]);
      }
    }
    if (data.length == 0) {
      pdf.text(
        "Il n'y a pas de transactions sur cet intervalle de date",
        50,
        100
      );
      pdf.save("releve.pdf");
      return;
    }
    pdf.text("Relevé de compte", 150, 10);
    pdf.addImage(img, 'PNG', 153, 10, 40, 20);
    pdf.line(13, 25, 150, 26);

    pdf.text("Relevé des opérations", 13, 85);
    autoTable(pdf, {
      head: headers,
      body: data,
      startY: 100,
    });
    pdf.save("releve.pdf");
  };

  return (
    <>
    <SideBard />
      <div className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <h1 className="text-2xl font-bold">{account.name}</h1>
            <p>{account.type}</p>
            <p>{account.iban}</p>
            <p>{account.balance} Ç</p>
          </div>
        </div>
      </div>
      <div className="mt-10 flex">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              label="Date Début"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
            <DatePicker
              label="Date Fin"
              value={value2}
              onChange={(newValue) => setValue2(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button
          variant="contained"
          endIcon={<PictureAsPdfIcon />}
          onClick={(e) => handleDownloadPDF(transactions, virements, deposits)}
        >
          Download
        </Button>
      </div>

      <div className="container mx-auto p-4 mt-20">
        {virements.length === 0 ? (
          <p className="text-center text-gray-500">No virement</p>
        ) : (
          <div className="flex flex-wrap -mx-2">
            {virements.map((virement) => (
              <Virement
                key={virement.id}
                virement={virement}
                account={account}
              />
            ))}
          </div>
        )}
      </div>
      <div className="container mx-auto p-4 mt-20">
        {transactions.length === 0 ? (
          <p className="text-center text-gray-500">No transaction</p>
        ) : (
          <div className="flex flex-wrap -mx-2">
            {transactions.map((transaction) => (
              <Transaction
                key={transaction.id}
                transaction={transaction}
                account={account}
              />
            ))}
          </div>
        )}
      </div>

      <div className="container mx-auto p-4 mt-20">
        {deposits.length === 0 ? (
          <p className="text-center text-gray-500">No dépôt</p>
        ) : (
          <div className="flex flex-wrap -mx-2">
            {deposits.map((deposit) => (
              <Depot key={deposit.id} depot={deposit} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ViewBankAccounts;
