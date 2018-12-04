# tinyUrl
This project uses the MEAN stack:
* Mongoose.js: database
* Express.js: backend framework
* Angular: frontend framework
* Node.js: runtime environment

Other tools and technologies used:
* Bootstrap: layout and styles
* angular-chart.js: visualization
* docker:deployment
* redis: cache

Prerequisites

1. Install Docker,Redis
2. Filling the mongoose username and password in the tinyurl/app/server.js
mongoose.connect("mongodb://<username>:<password>@<host:database>", {useMongoClient: true});
