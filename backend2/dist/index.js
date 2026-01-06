import { Hono } from 'hono';
import { neon } from "@neondatabase/serverless";
import { z } from "zod";
const connectdb = () => {
    return neon("postgresql://neondb_owner:npg_gYrqOZa0uUt6@ep-calm-term-a4eqq827-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
};
const app = new Hono();
const sql = connectdb();
async function createTable() {
    await sql `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;
    await sql `
  CREATE TABLE IF NOT EXISTS todo(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    work VARCHAR(250) NOT NULL,
    time VARCHAR(250) NOT NULL,
    status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;
}
createTable();
//ZOD
const userSchema = z.object({ username: z.email(), password: z.string().min(3), firstName: z.string(), lastName: z.string() });
const todoSchemaZod = z.object({ work: z.string().min(3), time: z.string(), status: z.boolean().default(false), user_id: z.number() });
//Routes
//1. to add todo
app.post('/todos', async (c) => {
    try {
        const body = await c.req.json();
        const result = todoSchemaZod.safeParse(body);
        if (!result.success) {
            return c.json({ msg: "Wrong inputs" }, 400);
        }
        const todo = result.data;
        await sql `
        INSERT INTO todo (work, time, status, user_id)
        VALUES (${todo.work}, ${todo.time}, ${todo.status}, ${todo.user_id})
    `;
        return c.json({ msg: "Todo added" }, 200);
    }
    catch (error) {
        console.log(error);
    }
});
//2. to delete todo
app.delete('/todos/:id', async (c) => {
    const id = Number(c.req.param('id'));
    try {
        const result = await sql `
      DELETE FROM todo
      where id=${id}
      RETURNING id
    `;
        if (result.length === 0) {
            return c.json({ msg: "Todo not found" }, 404);
        }
        return c.json({ msg: "Todo deleted: ", id }, 200);
    }
    catch (error) {
        console.log(error);
    }
});
//3. to update todo
//4. get list of todos
//5. single todo
app.get('/', (c) => {
    return c.text('Hello Hono!');
});
export default app;
//# sourceMappingURL=index.js.map