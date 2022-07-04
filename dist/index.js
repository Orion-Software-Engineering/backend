"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'https://localhost:8000'
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const db = require("./models");
const Role = db.role;
const Interest = db.interest;
const INTERESTS = db.INTERESTS;
const ROLES = db.ROLES;
db.sequelize.sync({ force: false }) // force: true forces dropping and resyncing the database
    .then(() => {
    console.log('Syncing DB');
    //initial()
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
    ROLES.forEach((role, index) => {
        Role.create({
            id: index + 1,
            name: role
        });
    });
    INTERESTS.forEach((interest, index) => {
        Interest.create({
            id: index + 1,
            name: interest
        });
    });
}
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Orion Meet' });
});
(0, user_routes_1.default)(app);
(0, auth_routes_1.default)(app);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`DATABASE_URL is ${process.env.DATABASE_URL}`);
});
