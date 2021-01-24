import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import * as admin from 'firebase-admin';
import * as routes from "./routes";
import * as init from "./utilities/serverInit";

dotenv.config();
const port = process.env.SERVER_PORT;
const app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

// register our routes, pass app and db
routes.register( app );

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );