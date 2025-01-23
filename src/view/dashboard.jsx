import React, { useEffect, useState } from "react";
import axios from "axios";
import TransactionDashboard from "../component/TransactionDashboard";
import AppNavbar from "../component/sideBard"

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accountId, setAccountId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const TOKEN = sessionStorage.getItem("token");
  const routing = [
    "/",
    "/bank_accounts",
    "/create_virements",
    "/create_transactions",
  ];
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
    <div>
      {/* <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Bank Account
          </Typography>
        </Toolbar>
      </AppBar>
            <Drawer
        variant="permanent"
        sx={{
          width: 200,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 200, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Dashboard", "Bank Account", "Create Virement ", "Profil"].map((text, index) => (
              <Link to={routing[index]}>
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer> */}
      <AppNavbar />

      <div className="mb-4 flex">
        <div className="p-3">
          <label className="block mb-2">Filter by Account id:</label>
          <select
            value={parseInt(accountId)}
            onChange={(e) => setAccountId(parseInt(e.target.value))}
            className="border p-2 mb-4 w-full"
          >
            <option value="">All Accounts</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>
        <div className="p-3">
          <label className="block mb-2">Search by Amount or Description:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
        </div>
        <div className="p-3">
          <label className="block mb-2">Filter by Type:</label>
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              console.log("Selected filter: ", e.target.value); // Ajoutez ce console.log pour vérifier la valeur sélectionnée
            }}
            className="border p-2 mb-4 w-full"
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
        <ul>
          {filteredTransactions.map((transaction) => (
            <TransactionDashboard
              key={transaction.id}
              transaction={transaction}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
