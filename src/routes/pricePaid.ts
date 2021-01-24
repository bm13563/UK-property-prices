import * as express from "express";
import axios from "axios";
import csv from "csvtojson";
import { PricePaid } from "../models/PricePaid";

export const getPricePaid = ( req: express.Request, res: express.Response ) => {
    // give arguments an alias that allow them to be mapped to the input arguments of the price paid api
    const argumentObject = {
        buildingName: req.query.buildingName,
        street: req.query.street,
        town: req.query.town,
        district: req.query.district,
        county: req.query.county,
        postcode: req.query.postcode,
        detached: req.query.detached,
        semiDetached: req.query.semiDetached,
        terraced: req.query.terraced,
        flat: req.query.flat,
        other: req.query.other,
        newBuild: req.query.newBuild,
        notNewBuild: req.query.notNewBuild,
        freehold: req.query.freehold,
        leasehold: req.query.leasehold,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
        dateFrom: req.query.dateFrom,
        dateTo: req.query.dateTo,
        page: req.query.page,
        perPage: req.query.perPage,
    }

    // instantiate a new price paid object
    const pricePaid = new PricePaid();
    // format the request url using our input arguments
    const url = pricePaid.formatRequest( argumentObject )

    const AxiosInstance = axios.create();
    AxiosInstance.get( url ).then(
        response => {
            csv()
            .fromString(response.data)
            .then( jsonObject => {
                res.json( jsonObject )
            } )
        }
    // tslint:disable-next-line:no-console
    ).catch( console.error );
}