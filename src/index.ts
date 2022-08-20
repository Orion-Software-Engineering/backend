import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import verifyEmailRoutes from './routes/verify.routes';
import resetpasswordRoutes from './routes/password/resetpassword.routes';
import db, {sequelize} from './models';
import resetpasswordPageRoutes from './routes/password/resetpasswordPage.routes';
import changePasswordRoutes from './routes/password/changePassword.routes';
import interestRouter from './routes/interest.routes';
import messageRouter from './routes/message.routes';
import conversationRouter from './routes/conversation.routes';
import eventRouter from './routes/event.routes';
import path from "path";

require('dotenv').config();
require('multer')

const app = express();
const corsOptions = {
    origin: 'https://localhost:8000',
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, 'src/public')))

const {Role, Interest, INTERESTS, ROLES} = db;

sequelize
    .sync({force: true}) // force: true forces dropping and resyncing the database
    .then(() => {
        console.log('Syncing DB');
        initial();
    });

// this function initializes the roles, run only once on a new database else there'll be errors
function initial() {
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
verifyEmailRoutes(app);
resetpasswordRoutes(app);
resetpasswordPageRoutes(app);
changePasswordRoutes(app);
eventRouter(app);
app.use('/api/interest', interestRouter);
app.use('/api/message', messageRouter);
app.use('/api/conversation', conversationRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`DATABASE_URL is ${process.env.DATABASE_URL}`);
});
