// class representing a firestore collection
export class FirestoreCollection {
    db: FirebaseFirestore.Firestore;
    name: string;
    today: string;

    constructor( dbConnection: FirebaseFirestore.Firestore, collectionName: string ) {
        this.db = dbConnection;
        this.name = collectionName;
        this.today = new Date().toISOString().slice(0, 10);
    }

    getDocumentNames() {
        const documentNames: string[] = [];
        this.db.collection( this.name ).get().then(
            snapshot => {
                snapshot.forEach( ( doc ) => {
                    documentNames.push( doc.id );
                } );
            }
        );
        return documentNames;
    }


}