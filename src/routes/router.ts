import * as express from "express";
import flatCache from "flat-cache";


type IRequestsFunction = ( req: express.Request, res: express.Response ) => void;
type ICacheFunction = ( cacheName: string ) => ( ( req: express.Request, res: any, next: () => void ) => void );


export class Router{
    router: express.Router = express.Router();
    base: string = "/";
    endpoints: string[] = [];

    addBase = ( app: express.Application, route: string ) => {
        app.use( `/${route}`, this.router );
        this.base = `/${route}`;
    }

    addBaseMiddleware = ( routerCallback: IRequestsFunction ) => {
        this.router.use( ( req: express.Request, res: express.Response, next: () => void ) => {
            routerCallback( req, res );
            next();
        } );
    }

    _addCache: ICacheFunction = ( cacheName: string ) => {
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

    addRouteToBase = ( route: string, callback: IRequestsFunction ) => {
        this.endpoints.push(`${this.base}/${route}`)
        this.router.route( `/${route}` ).get( this._addCache( route ), ( req: express.Request, res: express.Response ) => {
            callback( req, res );
        } )
    }
}