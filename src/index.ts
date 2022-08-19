import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import verifyEmailRoutes from './routes/verify.routes';
import resetPasswordRoutes from './routes/password/resetpassword.routes';
import db, {sequelize} from './models';
import resetPasswordPageRoutes from './routes/password/resetpasswordPage.routes';
import changePasswordRoutes from './routes/password/changePassword.routes';
import locationRoutes from './routes/location.routes';
import interestRouter from './routes/interest.routes';
import messageRoutes from './routes/message.routes';
import conversationRouter from './routes/conversation.routes';

require('dotenv').config();

const app = express();
const corsOptions = {
    origin: 'https://localhost:8000',
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const {Role, Interest, INTERESTS, ROLES} = db;

sequelize
    .sync({force: false}) // force: true forces dropping and resyncing the database
    .then(() => {
        console.log('Syncing DB');
        // initial();
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
resetPasswordRoutes(app);
resetPasswordPageRoutes(app);
changePasswordRoutes(app);
messageRoutes(app)
locationRoutes(app)
app.use('/api/interest', interestRouter);
app.use('/api/conversation', conversationRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`DATABASE_URL is ${process.env.DATABASE_URL}`);
});
