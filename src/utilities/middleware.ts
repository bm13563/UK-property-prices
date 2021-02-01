import * as express from "express";

type IMiddlewareFunction = ( req: express.Request, res: any ) => void;

export const logRequestToConsole: IMiddlewareFunction = ( req: express.Request, res: express.Response ) => {
    // tslint:disable-next-line:no-console
    console.log( `${req.method} ${req.path}` );
}