import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';
  
describe("Expenses", () => {
    test('initializes correctly', () => {
        render(<App />);
        // budget set to $500
        const budgetElement = screen.getByText("Budget: $500");
        expect(budgetElement).toBeInTheDocument();
      
        const remainingElement = screen.getByText("Remaining: $500");
        expect(remainingElement).toBeInTheDocument();
      
        const spentElement = screen.getByText("Spent so far: $0");
        expect(spentElement).toBeInTheDocument();
      });
    test("create single expense correctly", () => {
        render(<App />);
        const nameInput = screen.getByTestId("name");
        const costInput = screen.getByTestId("cost");
        const createExpenseButton = screen.getByText("Save");

        fireEvent.change(nameInput, { target: { value: "Groceries" } });
        fireEvent.change(costInput, { target: { value: "130" } });
        fireEvent.click(createExpenseButton);
        
        const expenseName = screen.getByText("Groceries");
        const expenseCost = screen.getByText("$130");

        expect(expenseName).toBeInTheDocument();
        expect(expenseCost).toBeInTheDocument();

        const spendSoFar = screen.getByText("Spent so far: $130");
        const remaining = screen.getByText("Remaining: $370");

        expect(spendSoFar).not.toBeInTheDocument();
        expect(remaining).toBeInTheDocument();
    });
    test("delete expense correctly", () => {
        render(<App />);
        const nameInput = screen.getByTestId("name");
        const costInput = screen.getByTestId("cost");
        const createExpenseButton = screen.getByText("Save");

        fireEvent.change(nameInput, { target: { value: "Groceries" } });
        fireEvent.change(costInput, { target: { value: "130" } });
        fireEvent.click(createExpenseButton);
        
        const deleteButton = screen.getByText("x");
        fireEvent.click(deleteButton);

        const spendSoFar = screen.getByText("Spent so far: $0");
        const remaining = screen.getByText("Remaining: $500");

        expect(spendSoFar).toBeInTheDocument();
        expect(remaining).toBeInTheDocument();
    });
    test("budget balance verification", () => {
        render(<App />);
        const nameInput1 = screen.getByTestId("name");
        const costInput1 = screen.getByTestId("cost");
        const createExpenseButton = screen.getByText("Save");

        fireEvent.change(nameInput1, { target: { value: "Groceries" } });
        fireEvent.change(costInput1, { target: { value: "130" } });
        fireEvent.click(createExpenseButton);

        // 130 + 370 = 500
        const spendSoFar1 = screen.getByText("Spent so far: $130");
        const remaining1 = screen.getByText("Remaining: $370");
        expect(spendSoFar1).toBeInTheDocument();
        expect(remaining1).toBeInTheDocument();

        const deleteButton = screen.getByText("x");

        fireEvent.click(deleteButton);

        const spendSoFar2 = screen.getByText("Spent so far: $0");
        const remaining2 = screen.getByText("Remaining: $500");
        expect(spendSoFar2).toBeInTheDocument();
        expect(remaining2).toBeInTheDocument();

        const nameInput2 = screen.getByTestId("name");
        const costInput2 = screen.getByTestId("cost");

        fireEvent.change(nameInput2, { target: { value: "Breakfast" } });
        fireEvent.change(costInput2, { target: { value: "10" } });
        fireEvent.click(createExpenseButton);

        // 10 + 490 = 500
        const spendSoFar3 = screen.getByText("Spent so far: $10");
        const remaining3 = screen.getByText("Remaining: $490");
        expect(spendSoFar3).toBeInTheDocument();
        expect(remaining3).toBeInTheDocument();
    });


});