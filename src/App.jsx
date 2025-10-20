import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ExpenseForm from "../Components/ExpenseForm";
import ExpenseTable from "../Components/ExpenseTable";

function App() {
  // safe reader for localStorage tableData to avoid runtime errors when stored value is malformed
  function readTableDataSafe() {
    try {
      const raw = localStorage.getItem("tableData");
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.warn(
        "readTableDataSafe: invalid tableData in localStorage, resetting to []",
        err
      );
      return [];
    }
  }

  const [data, setData] = useState(readTableDataSafe());
  const [tableData, setTableData] = useState(readTableDataSafe());
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
    id: "",
  });
  const [btnText, setBtnText] = useState("Add");
  const inputRef = useRef(null);

  const [filteredTableData, setFilteredTabledata] = useState(
    readTableDataSafe()
  );

  // console.log(JSON.parse(localStorage.getItem('tableData')))

  // useEffect(() => {
  //   setData([
  //     // {
  //     //   title: "Soap",
  //     //   category: "Groceries",
  //     //   description: "Supermarket",
  //     //   amount: 120.5,
  //     // },
  //     // {
  //     //   title: "DBG to BGP",
  //     //   category: "Transport",
  //     //   description: "Gas",
  //     //   amount: 45.0,
  //     // },
  //     // {
  //     //   title: "Electricity Bill",
  //     //   category: "Utilities",
  //     //   description: "Electricity",
  //     //   amount: 60.75,
  //     // },
  //   ])
  // }, []);

  // console.log("Data: ", data);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tableData");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        localStorage.setItem("tableData", JSON.stringify([]));
      }
    } catch (err) {
      // corrupted JSON -> reset
      localStorage.setItem("tableData", JSON.stringify([]));
    }
  }, []);

  function formatCurrency(n) {
    const num = Number(n) || 0;
    return num.toLocaleString("en-IN", { style: "currency", currency: "INR" });
  }

  return (
    <>
      <main>
        <h1>EXPENSE-TRACKER</h1>
        <div className="expense-tracker">
          <ExpenseForm
            data={data}
            setFilteredTabledata={setFilteredTabledata}
            setData={setData}
            expense={expense}
            setExpense={setExpense}
            btnText={btnText}
            setBtnText={setBtnText}
            inputRef={inputRef}
          />
          <ExpenseTable
            data={data}
            setData={setData}
            tableData={tableData}
            setTableData={setTableData}
            filteredTableData={filteredTableData}
            formatCurrency={formatCurrency}
            setFilteredTabledata={setFilteredTabledata}
            expense={expense}
            setExpense={setExpense}
            btnText={btnText}
            setBtnText={setBtnText}
            inputRef={inputRef}
          />
        </div>
      </main>
    </>
  );
}

export default App;
