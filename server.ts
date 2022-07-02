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

app.get('/', (req: Request, res: Response) => {
    res.json({message: 'Welcome to Orion Meet'})
})

const PORT = process.env.PORT || 8000