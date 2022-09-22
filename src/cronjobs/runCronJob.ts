import {clearExpiredEvents} from "./clearExpiredEvents";

const cron = require('node-cron')

// Scheduled tasks to be run on the server every six hours
cron.schedule('* * 6 * *', clearExpiredEvents);
