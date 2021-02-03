import { _generateArgumentMap, _generateDefaultArguments, _formatRequestUrl } from "./api.pricePaid";

const argumentMap = {
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

const defaultArguments = {
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

describe('_generateArgumentMap api.pricePaid', () => {
    it('Argument map is correct', () => {
        expect( _generateArgumentMap() ).toEqual( argumentMap );
    });
});

describe('_generateDefaultArguments api.pricePaid', () => {
    it('Default arguments are correct', () => {
        expect( _generateDefaultArguments() ).toEqual( defaultArguments );
    });
});

describe('_formatRequestUrl api.pricePaid', () => {
    const inputArguments = {
        buildingName: "undefined",
        street: "undefined",
        town: "undefined",
        postcode: "undefined",
        detached: "undefined",
        semiDetached: "undefined",
        terraced: "undefined",
        flat: "undefined",
        other: "undefined",
        newBuild: "undefined",
        notNewBuild: "undefined",
        freehold: "undefined",
        leasehold: "undefined",
        minPrice: "undefined",
        maxPrice: "undefined",
        dateFrom: "undefined",
        dateTo: "undefined",
        perPage: "undefined",
    }
    it('No inputs is correct', () => {
        expect( _formatRequestUrl( inputArguments, argumentMap, defaultArguments ) ).toEqual( "https://landregistry.data.gov.uk/app/ppd/ppd_data.csv?header=true&ptype%5B%5D=lrcommon%3Adetached&ptype%5B%5D=lrcommon%3Asemi-detached&ptype%5B%5D=lrcommon%3Aterraced&ptype%5B%5D=lrcommon%3Aflat-maisonette&ptype%5B%5D=lrcommon%3AotherPropertyType&nb%5B%5D=true&nb%5B%5D=false&et%5B%5D=lrcommon%3Afreehold&et%5B%5D=lrcommon%3Aleasehold&limit=100" );
    });
});

describe('_formatRequestUrl api.pricePaid', () => {
    const inputArguments = {
        buildingName: "undefined",
        street: "undefined",
        town: "undefined",
        postcode: "undefined",
        detached: "detached",
        semiDetached: "semi-detached",
        terraced: "terraced",
        flat: "flat-maisonette",
        other: "otherPropertyType",
        newBuild: "true",
        notNewBuild: "false",
        freehold: "freehold",
        leasehold: "leasehold",
        minPrice: "undefined",
        maxPrice: "undefined",
        dateFrom: "undefined",
        dateTo: "undefined",
        perPage: "100",
    }
    it('Default inputs are correct', () => {
        expect( _formatRequestUrl( inputArguments, argumentMap, defaultArguments ) ).toEqual( "https://landregistry.data.gov.uk/app/ppd/ppd_data.csv?header=true&ptype%5B%5D=lrcommon%3Adetached&ptype%5B%5D=lrcommon%3Asemi-detached&ptype%5B%5D=lrcommon%3Aterraced&ptype%5B%5D=lrcommon%3Aflat-maisonette&ptype%5B%5D=lrcommon%3AotherPropertyType&nb%5B%5D=true&nb%5B%5D=false&et%5B%5D=lrcommon%3Afreehold&et%5B%5D=lrcommon%3Aleasehold&limit=100" );
    });
});

describe('_formatRequestUrl api.pricePaid', () => {
    const inputArguments = {
        buildingName: "undefined",
        street: "undefined",
        town: "undefined",
        postcode: "N10",
        detached: "undefined",
        semiDetached: "undefined",
        terraced: "undefined",
        flat: "undefined",
        other: "undefined",
        newBuild: "undefined",
        notNewBuild: "undefined",
        freehold: "undefined",
        leasehold: "undefined",
        minPrice: "undefined",
        maxPrice: "undefined",
        dateFrom: "2020-01-01",
        dateTo: "undefined",
        perPage: "1025",
      }
    it('postcode, dateFrom, perPage are correct', () => {
        expect( _formatRequestUrl( inputArguments, argumentMap, defaultArguments ) ).toEqual( "https://landregistry.data.gov.uk/app/ppd/ppd_data.csv?header=true&postcode=N10&ptype%5B%5D=lrcommon%3Adetached&ptype%5B%5D=lrcommon%3Asemi-detached&ptype%5B%5D=lrcommon%3Aterraced&ptype%5B%5D=lrcommon%3Aflat-maisonette&ptype%5B%5D=lrcommon%3AotherPropertyType&nb%5B%5D=true&nb%5B%5D=false&et%5B%5D=lrcommon%3Afreehold&et%5B%5D=lrcommon%3Aleasehold&min_date=2020-01-01&limit=1025" );
    });
});