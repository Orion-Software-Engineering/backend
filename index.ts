import express, {Express, Request, Response} from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const corsOptions = {
    origin: 'https://localhost:8000'
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const db = require("./models")
const Role = db.role

db.sequelize.sync({force: true})
    .then(() => {
        console.log('Drop and Resync DB')
        initial()
    })

function initial() {
    Role.create({
        id: 1,
        name: "user"
    })
    Role.create({
        id: 2,
        name: "moderator"
    })
    Role.create({
        id: 3,
        name: "admin"
    })
}

app.get('/', (req: Request, res: Response) => {
    res.json({message: 'Welcome to Orion Meet'})
})

require('./routes/auth.routes')
require('./routes/user.routes')

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})