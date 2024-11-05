import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  // get budget from the context
  const { budget, setBudget } = useContext(AppContext) 
  // state to track if we are editing
  const [editMode, setEditMode] = useState(false);
  // state to keep track of what budget is
  const [newBudget, setNewBudget] = useState(budget);
  // state to keep track of temp budget when we click on edit so it stop resetting to 0
  const [tempBudget, setTempBudget] = useState(''); // Temporary state for input

  const getBudget = async () => {
    try {
      const budget = await fetchBudget();
      setBudget(budget);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  // similar to ExpenseList.tsx
  useEffect(() => {
    getBudget();
  }, []);

  // setter functions trigger when budget changes
  useEffect(() => {
    setNewBudget(budget);
    setTempBudget(budget.toString()); 
  }, [budget]);

  const handleUpdateBudget = async () => {
    const budgetValue = Number(tempBudget);
    console.log("Attempting to update budget to:", budgetValue); // Log the budget being updated
    try {
        const updatedBudget = await updateBudget(budgetValue);
        console.log("Updated budget:", updatedBudget); // Log the response
        setBudget(updatedBudget); // Update budget in context
        setEditMode(false); // Exit edit mode
    } catch (err: any) {
        console.error(err.message);
    }
  };
  // Function to render the edit input
  const renderEditBudget = () => (
    <div>
      <input
        type="number"
        // given input, we set the state newBudget to that input and update the state
        value={tempBudget}
        // budget is a number
        onFocus={() => setTempBudget('')} // Clear the input when focused
        onChange={(e) => setTempBudget(e.target.value)}
      />
      <button className="btn btn-primary mt-3" onClick={handleUpdateBudget}>Save</button>
      <button className="btn btn-primary mt-3" onClick={() => setEditMode(false)}>Cancel</button>
    </div>
  );

  const renderBudgetDisplay = () => (
    <div>
      <div>Budget: ${budget}</div>
      <button className="btn btn-primary mt-3" onClick={() => setEditMode(true)}>
        Edit</button>
    </div>
  );

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {/* If we are in edit mode, we call rednerEditBudget, otherwise we just show the new budget*/}
      {editMode ? renderEditBudget() : renderBudgetDisplay()}
    </div>
  );
};

export default Budget;
