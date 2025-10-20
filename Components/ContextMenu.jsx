import React from "react";
import { readTableData, writeTableData } from "../src/utils/localStorageHelpers";

export default function ContextMenu({
  menuPosition,
  setShowContextMenu,
  rowId,
  setFilteredTabledata,
  btnText,
  setBtnText,
  setExpense,
  inputRef,
  setData,
}) {
  if (!menuPosition.left || !menuPosition.top) {
    return;
  }

  function editRow(e) {
    const tableData = readTableData();
    const [rowToEdit] = tableData.filter((data) => data.id === rowId) || [];

    console.log(rowToEdit);

    setExpense({
      title: rowToEdit.title,
      category: rowToEdit.category,
      amount: rowToEdit.amount,
      id: rowToEdit.id,
    });

    setBtnText("Save");

    // console.dir(inputRef);
    inputRef.current.focus();
    setShowContextMenu(false);
  }

  function deleteRow(e) {
    // console.log(rowId);
    setShowContextMenu(false);
    const remainingData = readTableData().filter((data) => data.id !== rowId);

    setData(remainingData);
    writeTableData(remainingData);
    setFilteredTabledata(remainingData);
    setBtnText("Add");
    setExpense({
      title: "",
      amount: "",
      category: "",
      id: "",
    });
  }

  return (
    <div className="context-menu" style={menuPosition}>
      <p onClick={editRow}>Edit</p>
      <p onClick={deleteRow}>Delete</p>
    </div>
  );
}
