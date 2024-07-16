const express = require('express')
const app = express();

require('dotenv').config();
const database = require('./config/database')
const cookieParser = require('cookie-parser');
const cors = require('cors')

const usersRouter = require('./routes/usersRouter')
const todosRouter = require('./routes/todosRouter')
const notesRouter = require('./routes/notesRouter')

app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
      origin: "*",
      credentials: true,
    })
);

database.connect()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send("Server is running")
})

app.use('/api/users', usersRouter)
app.use('/api/todos', todosRouter)
app.use('/api/notes', notesRouter)

app.listen(PORT, ()=>{
    console.log(`APP IS LISTENING TO PORT ${PORT}`)
})