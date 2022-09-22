require('dotenv').config();
const OneSignal = require('onesignal-node');

export const sendNotification = async (username:string, deviceId:string, messageToSend: string|any) => {
    const client = new OneSignal.Client(process.env.ONESIGNAL_APP_ID, process.env.ONESIGNAL_API_KEY);
    const notification = {
        contents: {
            'en': `${username}: ${messageToSend}`,
        },
        include_player_ids: [deviceId],
    };

    try {
        const response = await client.createNotification(notification);
        console.log(response.body);
    } catch (e: any) {
        if (e instanceof OneSignal.HTTPError) {
            // When status code of HTTP response is not 2xx, HTTPError is thrown.
            console.log(e.statusCode);
            console.log(e.body);
        }
    }
}
