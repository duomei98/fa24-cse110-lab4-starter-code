//  Import useContext from React and AppContext from your context file
import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext);
  // Exercise: Create name and cost to state variables
  // strings entered into forms
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<string>("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Exercise: Add new expense to expenses context array
    // create a new expense object 
    const newExpense: Expense = {
      id: String(expenses.length + 1), // unique id based on number added
      name: name,
      // convert string to num
      cost: parseFloat(cost),
    };
    // add new expense to list
    setExpenses([...expenses, newExpense]);
    // clear form fields
    setName("");
    setCost("");
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            // add testId for easy testing
            data-testid="name"
            id="name"
            // Ensure the form inputs are controlled components by setting their value and onChange properties
            value={name}
            // HINT: onChange={}
            onChange = {(event) => setName(event.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            // add testId
            data-testid="cost"
            id="cost"
            //Ensure the form inputs are controlled components by setting their value and onChange properties
            value={cost}
            // HINT: onChange={}
            onChange = {(event) => setCost(event.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
