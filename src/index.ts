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
import eventRouter from './routes/event.routes';
import path from "path";
import {where} from "sequelize";
import likeRoutes from "./routes/like.routes";

import {logger} from "./logger/logger";
import {morganMiddleware} from "./middleware/morganMiddleware";
import deleteAccountRoutes from "./routes/account.routes";
import logsRoutes from "./routes/logs.routes";

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
app.use(morganMiddleware)

const {Role, Interest, Conversation, Message, INTERESTS, ROLES} = db;

sequelize
    .sync({force: false}) // force: true forces dropping and resyncing the database
    .then(() => {
        console.log('Syncing DB');
        logger.info("Syncing Database");
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
eventRouter(app);
messageRoutes(app)
locationRoutes(app)
likeRoutes(app);
deleteAccountRoutes(app)
logsRoutes(app)

app.use('/api/interest', interestRouter);
app.use('/api/conversation', conversationRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`DATABASE_URL is ${process.env.DATABASE_URL}`);
    logger.info(`Server is running on port ${PORT}`);
    logger.info(`DATABASE_URL is ${process.env.DATABASE_URL}`)
});
