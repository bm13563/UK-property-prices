import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import * as admin from 'firebase-admin';
import * as routes from "./routes";

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;

const app = express();

// config firebase for backend storage
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};
// Initialize Firebase
admin.initializeApp(firebaseConfig);
const db = admin.firestore();

const snapshot = await db.collection('users').get();
snapshot.forEach((doc) => {
    // tslint:disable-next-line:no-console
    console.log(doc.id, '=>', doc.data());
});


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

// register our routes, pass app and db
routes.register( app, db );

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );