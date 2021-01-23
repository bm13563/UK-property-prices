import axios from "axios";
import cheerio from "cheerio";
import { Response } from "express-serve-static-core"

export const getCurrentMatches = ( res: Response<any, Record<string, any>, number> ) => {
    const url = "https://www.whoscored.com/LiveScores";
    const AxiosInstance = axios.create();

    // Send an async HTTP Get request to the url
    AxiosInstance.get( url ).then(
        response => {
            const data = response.data;
            const $ = cheerio.load(data);
            const statsTable: cheerio.Cheerio = $('.stacked-teams-display');
            statsTable.each((i, elem) => {
                // tslint:disable-next-line:no-console
                console.log(elem)
            })
        }
    // tslint:disable-next-line:no-console
    ).catch( console.error );

    const jsonResponse = {
        message: "Hello, matches!"
    }
    return res.json( jsonResponse )
}