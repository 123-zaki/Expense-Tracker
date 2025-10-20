import React, { useState, useRef } from "react";
import Input from "./Input";
import Select from "./Select";

export default function ExpenseForm({
  data,
  setData,
  setFilteredTabledata,
  expense,
  setExpense,
  btnText,
  setBtnText,
  inputRef,
}) {
  // console.log("Re-rendering: ", data);

  // console.log(expense.id);

  const [errors, setErrors] = useState({});

  // ---> useRef method (By Accessing DOM Directly)
  // const titleRef = useRef(null);
  // const categoryRef = useRef(null);
  // const amountRef = useRef(null);

  const validationConfig = {
    title: [
      { required: true, message: "Please enter a title" },
      { minLength: 3, message: "Title must be at least 3 characters long" },
    ],
    category: [{ required: true, message: "Please select a category" }],
    amount: [
      { required: true, message: "Please enter an amount" },
      {
        validAmount: true,
        message: "Please enter a valid amount",
      },
      { isNumber: true, message: "Please a valid amount" },
    ],
  };

  const validateForm = (formData) => {
    const validationResult = {};
    console.log("Validating...");
    Object.entries(formData).forEach(([key, value]) => {
      if (validationConfig[key]) {
        validationConfig[key].some((rule) => {
          
          if (rule.required && !value) {
            validationResult[`${key}_required`] = rule.message;
            setErrors((prevState) => ({ ...prevState, [key]: rule.message }));
            return true;
          }

          if (rule.minLength && value.length < 3) {
            validationResult[`${key}_minLength`] = rule.message;
            setErrors((prevState) => ({ ...prevState, [key]: rule.message }));
            return true;
          }

          if (rule.validAmount && value < 0) {
            validationResult[`${key}_validAmount`] = rule.message;
            setErrors((prevState) => ({ ...prevState, [key]: rule.message }));
            return true;
          }

          if (rule.isNumber && isNaN(value)) {
            validationResult[`${key}_isNumber`] = rule.message;
            setErrors((prevState) => ({ ...prevState, [key]: rule.message }));
            return true;
          }
        });
      }
    });

    return validationResult;
  };

  function handleSubmit(e) {

    e.preventDefault();

    // if(!expense.title) {
    //   errorObj["title"] = 'Please enter a title'
    // }

    // if(!expense.category) {
    //   errorObj["category"] = "Please select  a category"
    // }

    // if(!expense.amount) {
    //   errorObj["amount"] = "Please enter amount"
    // }

    const validationResult = validateForm(expense);

    console.log(validationResult)

    if (Object.keys(validationResult).length) {
      return;
    }

    // ---> JavaScript Version (using formData)

    // e.preventDefault();
    // const formData = new FormData(e.target);
    // // console.log("Abc: ", Object.fromEntries(formData.entries()));
    // setData((prevState) => ([
    //   ...prevState,
    //   Object.fromEntries(formData.entries()),
    // ]));
    // localStorage.setItem("tableData", JSON.stringify([...data, Object.fromEntries(formData.entries())]));
    // setFilteredTabledata(JSON.parse(localStorage.getItem('tableData')));
    // e.target.reset();

    // ---> One Way Data Binding(UI is controlled by states)

    if (btnText === "Add") {
      const id = crypto.randomUUID();
      setData((prevState) => [
        ...prevState,
        { ...expense, id },
      ]);
      localStorage.setItem(
        "tableData",
        JSON.stringify([...data, { ...expense, id }])
      );
      setFilteredTabledata(JSON.parse(localStorage.getItem("tableData") ?? []));
      setExpense({
        title: "",
        category: "",
        amount: "",
        id: "",
      });
    } else if (btnText === "Save") {
      // save
      const delRowId = expense.id;
      // console.log("Abc: ", delRowId);

      setData((prevState) => [
        ...prevState.filter((exp) => exp.id !== delRowId),
        { ...expense },
      ]);
      localStorage.setItem(
        "tableData",
        JSON.stringify([
          ...data.filter((el) => el.id !== delRowId),
          { ...expense },
        ])
      );

      setFilteredTabledata(JSON.parse(localStorage.getItem("tableData") ?? []));
      setExpense({
        title: "",
        category: "",
        amount: "",
        id: "",
      });

      setBtnText("Add");
    }

    // ---> by using useRef hook (Referencing DOM element)
    // setData((prevState) => [...prevState, {title: titleRef.current.value, amount: amountRef.current.value, category: categoryRef.current.value, id: crypto.randomUUID()}]);

    // localStorage.setItem('tableData', JSON.stringify([...data, {title: titleRef.current.value, amount: amountRef.current.value, category: categoryRef.current.value, id: crypto.randomUUID()}]));

    // setFilteredTabledata(JSON.parse(localStorage.getItem('tableData')));
  }

  function handleInputChange(e) {
    // const obj = {};
    // obj[e.target.id] = e.target.value;
    // setExpense((prevState) => ({...prevState, ...obj}))
    console.log("Changing...");
    setExpense((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    setErrors({});
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        {/* <div className="input-label-container">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder=""
            id="title"
            value={expense.title}
            // required={true}
            name="title"
            // onChange={(e) => setExpense({...expense, title: e.target.value})}
            onChange={handleInputChange}
            // ref={titleRef}
          />
          {
            errors.title && <p className="error">{errors.title}</p>
          }
        </div> */}
        <Input
          label={"Title"}
          placeholder={"Enter title....."}
          value={expense.title}
          id={"title"}
          onChange={handleInputChange}
          error={errors.title}
          type={"text"}
          ref={inputRef}
        />
        {/* <div className="input-label-container">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={expense.category}
            // defaultValue={""}
            // required={true}
            // onChange={(e) => setExpense({...expense, category: e.target.value})}
            onChange={handleInputChange}
            // ref={categoryRef}
          >
            <option value="" disabled hidden>
              Select Category
            </option>
            <option value="Medicine">Medicine</option>
            <option value="Bills">Bills</option>
            <option value="Grocery">Grocery</option>
            <option value="Clothes">Clothes</option>
            <option value="Education">Education</option>
            <option value="Others">Others</option>
          </select>
          {
            errors.category && <p className="error">{errors.category}</p>
          }
        </div> */}

        <Select
          id={"category"}
          label={"Category"}
          value={expense.category}
          onChange={handleInputChange}
          defaultOption="Select Category"
          options={[
            "Medicine",
            "Bills",
            "Grocery",
            "Clothes",
            "Education",
            "Others",
          ]}
          error={errors.category}
        />

        {/* <div className="input-label-container">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            placeholder=""
            id="amount"
            value={expense.amount}
            // required={true}
            name="amount"
            // onChange={(e) => setExpense({...expense, amount: e.target.value})}
            onChange={handleInputChange}
            // ref={amountRef}
          />
          {
            errors.amount && <p className="error">{errors.amount}</p>
          }
        </div> */}
        <Input
          label={"Amount"}
          placeholder={"Enter amount....."}
          value={expense.amount}
          id={"amount"}
          onChange={handleInputChange}
          error={errors.amount}
        />
        <button className="form-btn">{btnText}</button>
      </form>
    </div>
  );
}
