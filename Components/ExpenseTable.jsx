import React, { useState } from "react";
import ContextMenu from "./ContextMenu";

export default function ExpenseTable({
  data,
  tableData,
  setTableData,
  setData,
  expense,
  setExpense,
  formatCurrency,
  filteredTableData,
  setFilteredTabledata,
  btnText,
  setBtnText,
  inputRef,
}) {
  // console.log("Re: ", tableData);

  const [showContextMenu, setShowContextMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({});
  const [rowId, setRowId] = useState(null);
  const [remainingData, setRemainingData] = useState(tableData);
  const [sortingCallback, setSortingCallback] = useState(() => () => {});

  // console.log("rendering")
  // console.log(filteredTableData)

  // function ascend() {
  //   setFilteredTabledata((prevState) => {
  //     const arr = prevState ? [...prevState] : [];
  //     // localStorage.setItem(
  //     //   "tableData",
  //     //   JSON.stringify(
  //     //     arr.sort(
  //     //       (item1, item2) => Number(item1.amount) - Number(item2.amount)
  //     //     )
  //     //   )
  //     // );
  //     return arr.sort(
  //       (item1, item2) => Number(item1.amount) - Number(item2.amount)
  //     );
  //   });
  // }

  // function descend() {
  //   setFilteredTabledata((prevState) => {
  //     const arr = prevState ? [...prevState] : [];
  //     // localStorage.setItem(
  //     //   "tableData",
  //     //   JSON.stringify(
  //     //     arr.sort(
  //     //       (item1, item2) => Number(item2.amount) - Number(item1.amount)
  //     //     )
  //     //   )
  //     // );
  //     return arr.sort(
  //       (item1, item2) => Number(item2.amount) - Number(item1.amount)
  //     );
  //   });
  // }

  function handleCategoryChange(e) {
    if (e.target.value !== "All") {
      setFilteredTabledata(
        tableData.filter(
          (item) => item.category.toLowerCase() === e.target.value.toLowerCase()
        )
      );
    } else {
      setFilteredTabledata(tableData);
    }
  }

  function showContext(e, id) {
    e.preventDefault();
    setShowContextMenu(true);
    // console.log(e.clientX);
    setRowId(id);
    setMenuPosition({
      left: e.clientX + 5,
      top: e.clientY + 4,
    });
  }

  // ensure filteredTableData is always an array before sorting/mapping
  const rows = (Array.isArray(filteredTableData) ? [...filteredTableData] : []).sort(sortingCallback);

  return (
    <>
      {showContextMenu && (
        <ContextMenu
          menuPosition={menuPosition}
          setShowContextMenu={setShowContextMenu}
          rowId={rowId}
          setFilteredTabledata={setFilteredTabledata}
          expense={expense}
          setExpense={setExpense}
          btnText={btnText}
          setBtnText={setBtnText}
          inputRef={inputRef}
          setData={setData}
        />
      )}
      <table
        className="expense-table"
        onClick={() => setShowContextMenu(false)}
      >
        {/* {console.log("Re-Rendering")} */}
        <thead>
          <tr>
            <th>
              <div className="third">
                <p>Title</p>
                <div className="sorting-buttons">
                  <button
                    className="ascend"
                    // onClick={ascend}
                    onClick={() => setSortingCallback(
                      () => (a, b) => a.title.localeCompare(b.title)
                    )}
                  >
                    &#8593;
                  </button>
                  <button
                    className="descend"
                    // onClick={descend}
                    onClick={() => setSortingCallback(() => (a, b) => b.title.localeCompare(a.title))}
                    style={{ marginRight: "3px" }}
                  >
                    &#8595;
                  </button>
                </div>
              </div>
            </th>
            <th>
              <div className="category-selector">
                <select
                  name="category"
                  id="category"
                  style={{ font: "inherit" }}
                  onChange={handleCategoryChange}
                >
                  <option value="Select category" disabled hidden>
                    Select Category
                  </option>
                  <option value="All">All</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Bills">Bills</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Education">Education</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </th>
            <th>
              <div className="third">
                <p>Amount</p>
                <div className="sorting-buttons">
                  <button
                    className="ascend"
                    // onClick={ascend}
                    onClick={() => setSortingCallback(
                      () => (a, b) => a.amount - b.amount
                    )}
                  >
                    &#8593;
                  </button>
                  <button
                    className="descend"
                    // onClick={descend}
                    onClick={() => setSortingCallback(() => (a, b) => b.amount - a.amount)}
                    style={{ marginRight: "3px" }}
                  >
                    &#8595;
                  </button>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.id}
              onContextMenu={(e) => {
                showContext(e, r.id);
              }}
            >
              <td>{r.title}</td>
              <td>{r.category}</td>
              <td>
                <div className="amount">
                  <span>₹</span>
                  <span className="change-color">{r.amount}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{fontWeight: '700'}}>
            <td colSpan={1}>Total</td>
            <td style={{cursor: "pointer"}} onClick={() => setSortingCallback(() => () => {})}>Clear Sort</td>
            <td>
              {formatCurrency(
                (filteredTableData ?? []).reduce((s, r) => s + +r.amount, 0)
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
