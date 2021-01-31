import { _generateArgumentMap, _generateDefaultArguments } from "./api.pricePaid";

describe('_generateArgumentMap api.pricePaid', () => {
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
    it('Argument map is correct', () => {
        expect(_generateArgumentMap()).toEqual(argumentMap);
    });
});

describe('_generateDefaultArguments api.pricePaid', () => {
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
    it('Argument map is correct', () => {
        expect(_generateDefaultArguments()).toEqual(defaultArguments);
    });
});