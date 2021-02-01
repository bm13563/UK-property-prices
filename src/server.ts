import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { register } from "./routes";

dotenv.config();
const port = process.env.PORT;
const app = express();

// this will let us get the data from a POST
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

// register our routes, pass app and db
register( app );

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );