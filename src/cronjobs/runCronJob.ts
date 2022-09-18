import {clearExpiredEvents} from "./clearExpiredEvents";

const cron = require('node-cron')

// Scheduled tasks to be run on the server.
cron.schedule('* * 6 * *', clearExpiredEvents);
