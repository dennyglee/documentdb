"use strict";

// DocuemntDB libraries
var DocumentBase = require('documentdb').DocumentBase;
var DocumentDBClient = require('documentdb').DocumentClient;

// Connection Policy
var connectionPolicy = new DocumentBase.ConnectionPolicy();
connectionPolicy.EnableEndpointDiscovery = true;
connectionPolicy.PreferredLocations = ["West US", "East US 2", "Southeast Asia", "Western Europe","Canada Central"];
//connectionPolicy.PreferredLocations = ["Southeast Asia", "Western Europe","Canada Central", "West US", "East US 2"];

// Host configuration
var host = "https://doctorwho.documents.azure.com:443";
var masterKey = "le1n99i1w5l7uvokJs3RT5ZAH8dc3ql7lx2CG0h0kK4lVWPkQnwpRLyAN0nwS1z4Cyd1lJgvGUfMWR3v8vkXKA==";
var client = new DocumentDBClient(host, {masterKey: masterKey}, connectionPolicy);
var databaseId = 'Airports';
var collectionId = 'Codes';

// Configurations the DocumentDB client will use to connect to the database and collection
var dbLink = 'dbs/' + databaseId;
var collLink = dbLink + '/colls/' + collectionId;


// Queries
var query = "SELECT c.City FROM c WHERE c.IATA='SEA'"


// runQuery() 
//  Recursively run query to DocumentDB
function runQuery() {
  // Connect to database and run query
  var time_query = process.hrtime();
  client.queryDocuments(collLink, query).toArray(function (err, results, headers) {
      // query duration
      var diff = process.hrtime(time_query);

      // RUs consumed and Activity ID
      var ruConsumed = headers['x-ms-request-charge'];
      var activityId = headers['x-ms-activity-id'];
      console.log(`${(diff[0]*1000) + (diff[1]/1000000)} milliseconds, ${ruConsumed} RUs, ActivityId: ${activityId}`)

      // Iterate
      setTimeout(runQuery, 1000);
  });
}

// Connect to database and run query
//var time_query = process.hrtime();
client.queryDocuments(collLink, query).toArray(function (err, results, headers) {
  // runQuery()
  setTimeout(runQuery, 1000);
});




