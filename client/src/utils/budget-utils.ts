// Function to get budget from the backend. Method: GET
/* backend:
// Function to get the budget
export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
}
*/
import { API_BASE_URL } from "../constants/constants";

export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch budget");
    }
    // budget is returned as { "data": budget }
    const updatedBudget = await response.json();
    return updatedBudget.data;

};
// Function to update the budget in the backend. Method: PUT
export const updateBudget = async (budget: number): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: budget }), // Ensure you're sending an object with 'amount'
    });
    if (!response.ok) {
        throw new Error("Failed to update budget");
    }
    const updatedBudget = await response.json();
    return updatedBudget.data; // Assuming the backend returns { data: newBudget }
};
