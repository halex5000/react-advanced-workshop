require('dotenv').config();
const express = require("express");
const app = express ();
const cors = require("cors");
const LaunchDarkly = require ('launchdarkly-node-server-sdk'); //We need to load the LaunchDarkly Node Server-side SDK
app.use (cors())
app.use (express.json());
const reload = require("reload");
const http = require('http');

//Initialize LaunchDarkly
client = LaunchDarkly.init(process.env.LAUNCHDARKLY_SDK_KEY)


async function init () {
    //wait for initialization before moving forward
    try {
        await client.waitForInitialization();
    }
    catch (err) {
    }


//Create pool
const { Pool } = require("pg");
const pool = new Pool({
  user: 'postgres', //update with your username if building locally
  host: 'db', //change to localhost if building locally
  database: 'demo', //update with correct database name if building locally
  password: 'postgres_password', //update accordingly 
  port: 5432
});
    
//Routes
app.post("/api", async(req, res) => {
    const apiFlag = await client.variation(
        "apiFlag",
        { key: "anonymous" },
        false
      );
    if (apiFlag){  
 try {
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todos (description) VALUES($1) RETURNING *",
    [description]
    );
   res.json(newTodo.rows[0]);
 } catch (err) {
     console.error(err.message);
 }
}
else {
    const err_message = 'bad connection';
    return err_message;
}
});

app.get("/api", async(req, res) => {
    const apiFlag = await client.variation(
        "apiFlag",
        { key: "anonymous" },
        false
      );
    if (apiFlag){  
    try {
        const allTodos = await pool.query("SELECT * FROM todos");
    res.json(allTodos.rows);
    }
    catch (err) {
        console.error(err.message)
    }
}
else {
    const err_message = 'bad connection';
    return err_message;
}
});

app.get("/api/:id", async (req, res) => {
    const apiFlag = await client.variation(
        "apiFlag",
        { key: "anonymous" },
        false
      );
    if (apiFlag){ 
    try {
       const { id } = req.params;
       const todo = await pool.query("SELECT * FROM todos WHERE todo_id = $1", [id])

       res.json(todos.rows[0]);

   } catch (err) {
       console.error(err.message)
   }
}
   else {
    const err_message = 'bad connection';
    return err_message;
}
});
app.put("/api/:id", async (req, res) => {
    const apiFlag = await client.variation(
        "apiFlag",
        { key: "anonymous" },
        false
      );
    if (apiFlag){ 
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todos SET description = $1 WHERE todo_id = $2",
        [description, id]
        );
        res.json("To-do task was updated");
    } catch (err) {
        console.error(err.message)
    }
}
else {
    const err_message = 'bad connection';
    return err_message;
}
});

app.delete("/api/:id", async (req, res) => {
const apiFlag = await client.variation(
        "apiFlag",
        { key: "anonymous" },
        false
      );
    if (apiFlag){ 
try {
    const { id } = req.params;
    const deleteTodo = await pool.query ("DELETE FROM todos WHERE todo_id = $1", 
    [id]
    );
    res.json("To-do task deleted"); 
} catch (err) {
    console.error(err.message)
}
}
else {
  throw Error('bad connection');
}
});

app.set("port", 5000)
const server = http.createServer(app);

server.listen(app.get("port"), cors(), function () { 
    console.log('The API server is now live')
})

reload(app).then((reloadReturned) => {
client.on('update:apiFlag', () => {
            reloadReturned.reload();
        })
    })
    .catch(function (err) {
        console.error(
          "Reload could not start, could not start server/sample app",
          err
        );
      });
}

init();