import * as express from "express";
import { parseAndReturnData } from "../controllers/api.pricePaid";
import { Router } from "./router";


export const register = ( app: express.Application ) => {
    const apiRouter = new Router();
    apiRouter.addBase( app, "api" );
    apiRouter.addBaseMiddleware( () => {return;} )
    apiRouter.addRouteToBase( "pricePaid", parseAndReturnData )
};