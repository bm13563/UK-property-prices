import * as express from "express";
import * as pricePaid from "./pricePaid";
import flatCache from "flat-cache";

export const register = ( app: express.Application ) => {
    // get a router for our api, allowing us to set up middleware
    const apiRouter = express.Router();

    // our middleware
    apiRouter.use( ( req: express.Request, res: express.Response, next: () => void ) => {
        // tslint:disable-next-line:no-console
        console.log( `${req.method} ${req.path}` );
        next();
    } );

    // attach our apiRouter to the api route
    app.use( '/api', apiRouter );

    // set up cache for caching our requests
    const cache = flatCache.load('productsCache');
    const flatCacheMiddleware = ( req: express.Request, res: any, next: () => void) => {
        const key =  '__express__' + req.originalUrl || req.url
        const cacheContent = cache.getKey( key );
        if( cacheContent){
            res.send( cacheContent );
        }else{
            res.sendResponse = res.send;
            res.send = ( body: any ) => {
                cache.setKey( key,body );
                cache.save();
                res.sendResponse( body )
            }
            next()
        }
    };

    apiRouter.route( '/price_paid' ).get( flatCacheMiddleware, ( req: express.Request, res: express.Response ) => {
        pricePaid.getPricePaid( req, res );
    } )
};