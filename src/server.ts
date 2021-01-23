import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import firestoreCredentials from './config/live-football-data-64a3832ce247.json';
import * as admin from 'firebase-admin';
import * as routes from "./routes";
import * as init from "./utilities/serverInit";

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;

const app = express();

// Initialize Firebase
const serviceAccount = firestoreCredentials as admin.ServiceAccount
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

// register our routes, pass app and db
routes.register( app, db );

// start the express server
app.listen( port, () => {
    init.getMatchIds( db );
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );