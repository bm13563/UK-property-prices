import * as express from "express";
import * as pricePaid from "./pricePaid";
import flatCache from "flat-cache";

export const register = ( app: express.Application ) => {
    // get an instance of the express Router
    const router = express.Router();

    // middleware to use for all requests, if we want it
    router.use( ( req: any, res, next: () => void ) => {
        next();
    } );

    // all of our routes will be prefixed with /api
    app.use( '/api', router );

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

    // get all current matches
    router.route( '/price_paid' ).get( flatCacheMiddleware, ( req: express.Request, res: express.Response ) => {
        pricePaid.getPricePaid( req, res );
    } )
};