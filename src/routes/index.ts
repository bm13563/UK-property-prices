import * as express from "express";
import * as pricePaid from "./pricePaid";

export const register = ( app: express.Application ) => {
    // get an instance of the express Router
    const router = express.Router();

    // middleware to use for all requests
    router.use( ( req: any, res, next ) => {
        // tslint:disable-next-line:no-console
        console.log('Something is happening.');
        next(); // make sure we go to the next routes and don't stop here
    } );

    // all of our routes will be prefixed with /api
    app.use( '/api', router );

    // get all current matches
    router.route( '/price_paid' ).get( ( req: express.Request, res: express.Response ) => {
        pricePaid.getPricePaid( req, res );
    } )
};