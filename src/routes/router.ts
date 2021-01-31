import * as express from "express";
import flatCache from "flat-cache";


type CacheFunction = ( cacheName: string ) => ( ( req: express.Request, res: any, next: () => void ) => void );


export class Router{
    router: express.Router = express.Router();
    base: string = "/";
    endpoints: string[] = [];

    addBase = ( app: express.Application, route: string ) => {
        app.use( `/${route}`, this.router );
        this.base = `/${route}`;
    }

    addBaseMiddleware = ( routerCallback: () => void ) => {
        this.router.use( ( req: express.Request, res: express.Response, next: () => void ) => {
            routerCallback();
            // tslint:disable-next-line:no-console
            console.log( `${req.method} ${req.path}` );
            next();
        } );
    }

    _addCache: CacheFunction = ( cacheName: string ) => {
        flatCache.clearAll();
        const cache = flatCache.load( cacheName );
        const flatCacheMiddleware = ( req: express.Request, res: any, next: () => void ) => {
            const key =  '__express__' + req.originalUrl || req.url
            const cacheContent = cache.getKey( key );
            if( cacheContent){
                res.send( cacheContent );
            } else {
                res.sendResponse = res.send;
                res.send = ( body: any ) => {
                    cache.setKey( key,body );
                    cache.save();
                    res.sendResponse( body )
                }
                next()
            }
        }
        return flatCacheMiddleware;
    }

    addRouteToBase = ( route: string, callback: ( req: express.Request, res: express.Response ) => void ) => {
        this.endpoints.push(`${this.base}/${route}`)
        this.router.route( `/${route}` ).get( this._addCache( route ), ( req: express.Request, res: express.Response ) => {
            callback( req, res );
        } )
    }
}