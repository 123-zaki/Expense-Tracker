import React from "react";

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
    const tableData = JSON.parse(localStorage.getItem("tableData") ?? []);
    const [rowToEdit] = tableData.filter((data) => data.id === rowId);

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
    const remainingData = JSON.parse(localStorage.getItem("tableData") ?? []).filter(
      (data) => data.id !== rowId
    );

    setData(remainingData);

    localStorage.setItem("tableData", JSON.stringify(remainingData));
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
