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
            if ( snapshotSize === 0) {
                getTodaysMatches();
            }
        }
    );
};

export const getTodaysMatches = () => {
    const url = "https://www.bbc.com/sport/football/scores-fixtures";
    const AxiosInstance = axios.create();

    // Send an async HTTP Get request to the url
    AxiosInstance.get( url ).then(
        response => {
            const data = response.data;
            const $ = cheerio.load(data);
            const competition: cheerio.Cheerio = $( '.qa-match-block h3' );
            competition.each((i, elem) => {
                // tslint:disable-next-line:no-console
                console.log(elem)
            })
        }
    // tslint:disable-next-line:no-console
    ).catch( console.error );
}