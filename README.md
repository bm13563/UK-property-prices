# UK-property-price-api

A REST API that exposes the Land Registry Price paid data found on the Land Registry price paid search: https://landregistry.data.gov.uk/app/ppd/. Allows quick and easy access to the dataset, giving you more time to do cool stuff with the data. You can use it to generate stuff like this:

![Alt text](/misc/n10_transactions.png?raw=true "Optional Title")

(or better, if you're good at that sort of thing).

Currently, the only working endpoint is https://uk-property-price-api.herokuapp.com/api/pricePaid. An example request is https://uk-property-price-api.herokuapp.com/api/pricePaid?postcode=N10&perPage=12&dateFrom=2020-01-01. I hope to add documentation and further endpoints soon.

Please note that I'm hosting the API on free heroku dynos - so the first request might take a while.
