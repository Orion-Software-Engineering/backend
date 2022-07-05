import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import db, {sequelize} from './models';

const app = express();
const corsOptions = {
    origin: 'https://localhost:8000',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const {Role, Interest, INTERESTS, ROLES} = db;

sequelize
    .sync({force: true}) // force: true forces dropping and resyncing the database
    .then(() => {
        console.log('Syncing DB');
        initial()
    });

// this function initializes the roles, run only once on a new database else there'll be errors
function initial() {
    // Role.create({
    //     id: 1,
    //     name: "user"
    // });
    //
    // Role.create({
    //     id: 2,
    //     name: "moderator"
    // });
    //
    // Role.create({
    //     id: 3,
    //     name: "admin"
    // });

    ROLES.forEach(role => {
        Role.create({
            name: role,
        });
    });

    INTERESTS.forEach(interest => {
        Interest.create({
            name: interest,
        });
    });
}

app.get('/', (req: Request, res: Response) => {
    res.json({message: 'Welcome to Orion Meet'});
});

userRoutes(app);
authRoutes(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`DATABASE_URL is ${process.env.DATABASE_URL}`);
});
