import { Database } from "sqlite";
import { Request, Response } from "express";

export async function createExpenseServer(req: Request, res: Response, db: Database) {

    try {
        // Type casting the request body to the expected format.
        const { id, cost, description } = req.body as { id: string, cost: number, description: string };
 
        if (!description || !id || !cost) {
            return res.status(400).send({ error: "Missing required fields" });
        }
 
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
        res.status(201).send({ id, description, cost });
 
    } catch (error) {
 
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };

 }
 

export async function deleteExpense(req: Request, res: Response, db: Database) {
    try {
        // Type casting the request body to the expected format.
        const { id } = req.params;
        // check if the expense with that ID exists in the table
        const expense = await db.get('SELECT * FROM expenses WHERE id = ?', [id]);
        // expense exists
        if (expense) {
            await db.run('DELETE FROM expenses WHERE id=?', [id]);            
            res.status(204).end(); 
        } else {
            res.status(404).send({ message: 'Expense not found' });
        }
    } catch (error) {
 
        return res.status(400).send({ error: `Expense could not be deleted: ${error}` });
    };
}

export async function getExpenses(req: Request, res: Response, db: Database) {
    try {
        // Use db.all() (The db.all() method takes a SQL query string as its first argument, which specifies the operation to be performed, such as retrieving rows from a table.)
        const expenses = await db.all('SELECT * FROM expenses');
        
        res.status(200).send({ data: expenses });
    } catch (error) {

        console.error(error);
        res.status(500).send({ error: 'Could not fetch all expenses.' });
    }
}