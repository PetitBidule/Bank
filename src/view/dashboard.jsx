import React, { useEffect, useState } from "react";
import axios from "axios";
import TransactionDashboard from "../component/TransactionDashboard";
import AppNavbar from "../component/sideBard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from "date-fns";
import { LineChart } from "@mui/x-charts/LineChart";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accountId, setAccountId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const TOKEN = sessionStorage.getItem("token");

  useEffect(() => {
      if (sessionStorage.getItem("token") == null) {
        navigate("/");
      }
    }, []);

  useEffect(() => {
    if (!TOKEN) {
      setError("No token found");
      setLoading(false);
      return;
    }

    axios
      .post(
        "http://localhost:8000/transactions/history",
        {},
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((response) => {
        setTransactions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the transactions!", error);
        setError(error.response ? error.response.data.message : error.message);
        setLoading(false);
      });
  }, [TOKEN]);

  const accounts = [
    ...new Map(
      transactions
        .flatMap((transaction) => [
          {
            id: transaction.source_account,
            name: transaction.source_account_name,
          },
          {
            id: transaction.destination_account,
            name: transaction.destination_account_name,
          },
        ])
        .map((account) => [account.id, account])
    ).values(),
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesAccountId = accountId
      ? transaction.source_account === accountId
      : true;
    const isFloat =
      !isNaN(searchTerm) && searchTerm.toString().indexOf(".") !== -1;
    const matchesSearchTerm = searchTerm
      ? isFloat
        ? transaction.price &&
          transaction.price.toString().includes(parseFloat(searchTerm))
        : transaction.motif &&
          transaction.motif.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesFilter =
      filter === "all" ||
      (filter === "gain" && transaction.price > 0) ||
      (filter === "loss" && transaction.price < 0);
    return matchesAccountId && matchesSearchTerm && matchesFilter;
  });

  console.log(filteredTransactions);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>There was an error fetching the transactions: {error}</p>;
  }

  return (
    <>
      <AppNavbar />
      <div className="flex">
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [9, 4.5, 1, 7.5, 5.5, 2.2],
            },
          ]}
          width={500}
          height={300}
        />
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          width={500}
          height={300}
        />
      </div>
      <div className="flex">
        <div className="pr-3">
          <label className="block mb-2">Filter by Account id:</label>
          <select
            value={parseInt(accountId)}
            onChange={(e) => setAccountId(parseInt(e.target.value))}
            className="border p-2 mb-4 w-full bg-white"
          >
            <option value="">All Accounts</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>
        <div className="pr-3">
          <label className="block mb-2">Search by Amount or Description:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 mb-4 w-full bg-white"
          />
        </div>
        <div className="pr-3">
          <label className="block mb-2">Filter by Type:</label>
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              console.log("Selected filter: ", e.target.value); // Ajoutez ce console.log pour vérifier la valeur sélectionnée
            }}
            className="border p-2 mb-4 w-full bg-white"
          >
            <option value="all">All</option>
            <option value="gain">Gain</option>
            <option value="loss">Loss</option>
          </select>
        </div>
      </div>
      <h2>All Transactions</h2>
      {filteredTransactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 1100 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Account</TableCell>
                <TableCell align="right">Prices</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Motif</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {transaction.price >= 0 && (
                      <h2 className="text-green-500 font-bold text-3xl">
                        Gain
                      </h2>
                    )}
                    {transaction.price < 0 && (
                      <h2 className="text-red-500 font-bold text-3xl">Loss</h2>
                    )}
                    Transaction de {transaction.source_account} vers{" "}
                    {transaction.destination_account}
                  </TableCell>
                  <TableCell align="right">
                    {transaction.price.toFixed(2)} Ç
                  </TableCell>
                  <TableCell align="right">
                    {format(new Date(transaction.date), "dd/MM/yyyy HH:mm")}
                  </TableCell>
                  <TableCell align="right">
                    Motif: "{transaction.motif}"
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      
    </>
  );
};

export default Dashboard;
