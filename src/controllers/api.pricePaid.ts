import express from "express"
import axios from "axios";
import csv from "csvtojson";

interface IObjectKeys {
    [key: string]: string;
}

interface IPricePaidObject extends IObjectKeys {
    buildingName: string,
    street: string,
    town: string,
    postcode: string,
    detached: string,
    semiDetached: string,
    terraced: string,
    flat: string,
    other: string,
    newBuild: string,
    notNewBuild: string,
    freehold: string,
    leasehold: string,
    minPrice: string,
    maxPrice: string,
    dateFrom: string,
    dateTo: string,
    perPage: string,
}

export const parseAndReturnData = ( req: express.Request, res: express.Response ) => {
    const inputArguments = _formatArguments( req )
    const argumentMap = _generateArgumentMap()
    const defaultArguments = _generateDefaultArguments();
    const requestUrl = _formatRequestUrl( inputArguments, argumentMap, defaultArguments );
    _fetchResults( requestUrl, res )
}

export const _formatArguments = ( req: express.Request ) => {
    return {
        buildingName: req.query.buildingName,
        street: req.query.street,
        town: req.query.town,
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
        perPage: req.query.perPage,
    }
}

export const _generateArgumentMap = () => {
    return {
        buildingName: "paon=",
        street: "street=",
        town: "town=",
        postcode: "postcode=",
        detached: "ptype%5B%5D=lrcommon%3A",
        semiDetached: "ptype%5B%5D=lrcommon%3A",
        terraced: "ptype%5B%5D=lrcommon%3A",
        flat: "ptype%5B%5D=lrcommon%3A",
        other: "ptype%5B%5D=lrcommon%3A",
        newBuild: "nb%5B%5D=",
        notNewBuild: "nb%5B%5D=",
        freehold: "et%5B%5D=lrcommon%3A",
        leasehold: "et%5B%5D=lrcommon%3A",
        minPrice: "min_price=",
        maxPrice: "max_price=",
        dateFrom: "min_date=",
        dateTo: "max_date=",
        perPage: "limit=",
    }
}

export const _generateDefaultArguments = () => {
    return {
        buildingName: "",
        street: "",
        town: "",
        postcode: "",
        detached: "detached",
        semiDetached: "semi-detached",
        terraced: "terraced",
        flat: "flat-maisonette",
        other: "otherPropertyType",
        newBuild: "true",
        notNewBuild: "false",
        freehold: "freehold",
        leasehold: "leasehold",
        minPrice: "",
        maxPrice: "",
        dateFrom: "",
        dateTo: "",
        perPage: "100",
    }
}

export const _formatRequestUrl = ( inputArguments: any, argumentMap: IPricePaidObject, defaultArguments: IPricePaidObject ) => {
    let baseUrl = "https://landregistry.data.gov.uk/app/ppd/ppd_data.csv?header=true";
        // loop through our arguments dictionary and map the names of the arguments
        for ( const key in inputArguments ) {
            // check if the argument is undefined
            if ( inputArguments[key] === undefined ) {
                // if so, check if there is a default argument
                if ( defaultArguments[key] !== "" ) {
                    // if there is, add it to the base url
                    const argumentString = `&${argumentMap[key]}${defaultArguments[key]}`;
                    baseUrl += argumentString
                }
            } else {
                // add the argument to the base url
                const argumentString = `&${argumentMap[key]}${inputArguments[key]}`;
                baseUrl += argumentString;
            }
        }
        return baseUrl;
}

export const _fetchResults = ( url: string, res: express.Response ) => {
    const AxiosInstance = axios.create();
    AxiosInstance.get( url ).then(
        response => {
            // TODO own function
            // build metadata for return
            const csvString = response.data;
            const csvLength = csvString.split(/\r\n|\r|\n/).length - 2;
            const jsonReturn = {
                meta: {
                    request: url,
                    length: csvLength,
                },
                results: [] as object,
            }

            // parse data
            csv()
            .fromString(csvString)
            .then( jsonObject => {
                jsonReturn.results = jsonObject;
                res.json( jsonReturn )
            } )
        }
    // tslint:disable-next-line:no-console
    ).catch( console.error );
}