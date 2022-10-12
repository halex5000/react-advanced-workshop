import http from 'node:http';
import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import reload from 'reload';
import {Pool} from 'pg';

config();

const app = express();

// We need to load the LaunchDarkly Node Server-side SDK
app.use(cors());
app.use(express.json());

// Initialize LaunchDarkly
/* TODO: Add the client initialization function */

async function init() {
	// Wait for initialization before moving forward
	/* try {
        await client.waitForInitialization();
    }
    catch (err) {
    }
*/

	// Create pool
	const pool = new Pool({
		user: 'pcmccarron', // Update with your username if building locally
		host: 'localhost', // Change to localhost if building locally
		database: 'demo', // Update with correct database name if building locally
		// password: 'postgres_password', //update accordingly
		port: 5432,
	});

	// Routes
	app.post('/api', async (request, response) => {
		/* Const apiFlag = await client.variation(
        "apiFlag",
        { key: "anonymous" },
        false
      );
    */
		const apiFlag = false;
		if (apiFlag) {
			try {
				const {description} = request.body;
				const newTodo = await pool.query(
					'INSERT INTO todos (description) VALUES($1) RETURNING *',
					[description],
				);
				response.json(newTodo.rows[0]);
			} catch (error) {
				console.error(error.message);
			}
		} else {
			response.status(404).send('bad connection');
		}
	});

	app.get('/api', async (request, response) => {
		/* Grab the flag values
		 */
		const apiFlag = false;
		if (apiFlag) {
			try {
				const allTodos = await pool.query('SELECT * FROM todos');
				response.json(allTodos.rows);
			} catch (error) {
				console.error(error.message);
			}
		} else {
			response.status(404).send('bad connection');
		}
	});

	app.get('/api/:id', async (request, response) => {
		/* Grab the flag values
		 */
		const apiFlag = false;
		if (apiFlag) {
			try {
				const {id} = request.params;
				const todo = await pool.query(
					'SELECT * FROM todos WHERE todo_id = $1',
					[id],
				);

				response.json(todos.rows[0]);
			} catch (error) {
				console.error(error.message);
			}
		} else {
			response.status(404).send('bad connection');
		}
	});
	app.put('/api/:id', async (request, response) => {
		/* Grab the flag values
		 */
		const apiFlag = false;
		if (apiFlag) {
			try {
				const {id} = request.params;
				const {description} = request.body;
				const updateTodo = await pool.query(
					'UPDATE todos SET description = $1 WHERE todo_id = $2',
					[description, id],
				);
				response.json('To-do task was updated');
			} catch (error) {
				console.error(error.message);
			}
		} else {
			response.status(404).send('bad connection');
		}
	});

	app.delete('/api/:id', async (request, response) => {
		/* Grab the flag values
		 */
		const apiFlag = false;
		if (apiFlag) {
			try {
				const {id} = request.params;
				const deleteTodo = await pool.query(
					'DELETE FROM todos WHERE todo_id = $1',
					[id],
				);
				response.json('To-do task deleted');
			} catch (error) {
				console.error(error.message);
			}
		} else {
			response.status(404).send('bad connection');
		}
	});

	app.set('port', 5000);
	const server = http.createServer(app);

	server.listen(app.get('port'), cors(), function () {
		console.log('The API server is now live');
	});

	// We can also detect flag changes, feel free to uncomment this section to see this in action
	/*
reload(app).then((reloadReturned) => {
client.on('update:apiFlag', () => {
        console.log('the flag has changed'); 
        reloadReturned.reload();
        })
    })
    .catch(function (err) {
        console.error(
          "Reload could not start, could not start server/sample app",
          err
        );
      });
*/
}

init();
