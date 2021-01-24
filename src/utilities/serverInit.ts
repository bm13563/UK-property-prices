import axios from "axios";
import cheerio from "cheerio";

export const getMatchIds = ( db: FirebaseFirestore.Firestore ) => {
    const today = new Date().toISOString().slice(0, 10)

    // TODO get this into a model
    db.collection( "match_ids" ).get().then(
        snapshot => {
            let snapshotSize = snapshot.size;
            snapshot.forEach( ( doc ) => {
                // if the document does not contain today's date, it is yesterdays document, so we need to delete it
                if ( !( doc.id.includes( today ) )  ) {
                    db.collection( "match_ids" ).doc( doc.id ).delete();
                    snapshotSize -= 1;
                }
            } );
            // if we've emptied all of our old matches, we need to add todays matches
            if ( snapshotSize === 1) {
                getTodaysMatches();
            }
        }
    );
};

export const getTodaysMatches = () => {
    const url = "https://www.flashscore.co.uk/";
    const AxiosInstance = axios.create();
    // tslint:disable-next-line:no-console
    console.log(1)
    // Send an async HTTP Get request to the url
    AxiosInstance.get( url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36' }
    } ).then(
        response => {
            // tslint:disable-next-line:no-console
            console.log(2)
            const data = response.data;
            const $ = cheerio.load(data);

            const competition: cheerio.Cheerio = $( 'event__title--name' );
            competition.each((i, elem) => {
                // tslint:disable-next-line:no-console
                console.log($(elem).text())
            })
        }
    // tslint:disable-next-line:no-console
    ).catch( console.error );
}