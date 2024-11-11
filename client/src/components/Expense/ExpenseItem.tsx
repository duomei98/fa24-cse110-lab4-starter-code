import { Expense } from "../../types/types";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { deleteExpense } from "../../utils/expense-utils";

const ExpenseItem = ({ id, description, cost }: Expense) => {
    const { setExpenses } = useContext(AppContext);

    const handleDeleteExpense = async () => {
      try {
          await deleteExpense(id); // Call the delete function with the id
          setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id)); // Update local state
      } catch (error: unknown) {
          if (error instanceof Error) {
              console.error("Error deleting expense:", error.message);
          } else {
              console.error("Unexpected error:", error);
          }
      }
  };
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>{description}</div>
            <div>${cost}</div>
            <div>
                <button onClick={handleDeleteExpense}>x</button>
            </div>
        </li>
    );
};

export default ExpenseItem;
