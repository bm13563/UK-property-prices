export class PricePaid{
    baseUrl: string;
    argumentMap: any;
    defaultArguments: any;
    usedArguments: any;

    constructor() {
        this.baseUrl = "https://landregistry.data.gov.uk/app/ppd/ppd_data.csv?header=true";
        this.argumentMap = {
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
            minDate: "min_date=",
            maxDate: "max_date=",
            perPage: "limit=",
        }
        this.defaultArguments = {
            detached: "detached",
            semiDetached: "semi-detached",
            terraced: "terraced",
            flat: "flat-maisonette",
            other: "otherPropertyType",
            newBuild: "true",
            notNewBuild: "false",
            freehold: "freehold",
            leasehold: "leasehold",
            perPage: 100,
        }
        this.usedArguments = {}
    }

    formatRequest = ( inputArguments: any ): string => {
        // loop through our arguments dictionary and map the names of the arguments
        for ( const key in inputArguments ) {
            // check if the argument is undefined
            if ( inputArguments[key] === undefined ) {
                // if so, check if there is a default argument
                if ( key in this.defaultArguments ) {
                    // if there is, add it to the base url
                    const argumentString = `&${this.argumentMap[key]}${this.defaultArguments[key]}`;
                    this.usedArguments[key] = this.defaultArguments[key];
                    this.baseUrl += argumentString
                }
            } else {
                // add the argument to the base url
                const argumentString = `&${this.argumentMap[key]}${inputArguments[key]}`;
                this.usedArguments[key] = inputArguments[key];
                this.baseUrl += argumentString;
            }
        }
        return this.baseUrl;
    }

    getUsedArguments = () => {
        return this.usedArguments;
    }
}