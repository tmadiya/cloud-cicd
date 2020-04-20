var AWS = require('aws-sdk');

exports.handler = function (event, context, callback) {
    console.log("event updated with CICD Monday Demo v1.0.0 :: ", JSON.stringify(event));
                var dateObj = new Date().toLocaleString("en-US", {timeZone: "Africa/Johannesburg"});  // Today!
                    dateObj = new Date(dateObj);
    // doesConsumerExist(event.userName).then(exists => {
        // if (exists) {
        //     console.log("Don't Initalize the values it's an exisiting user trying to reset the password")
        //     callback(null, event);
        // }
        // else {
            var params = {
                Item: {
                    "Cognito_Id": event.userName,
                    "Phone_Number": event.request.userAttributes.phone_number,
                    "RegistrationTime":dateObj.toLocaleString(),
                    "experiencePoints": 0,
                    "level": 1,
                    "tCoins": 0,
                    "Avatar": "process.env.DefaultAvatar",
                    "LevelMediaUrl": "process.env.LevelMediaUrl",
                    "billingBalance": {
                        "reservedImageAds": 0,
                        "reservedSurveys": 0,
                        "reservedVideoAds": 0,
                        "unassigned": 0,
                        "walletTotal": 0
                    }

                },
                TableName: process.env.ConsumerInfoTable,
            };

            console.log("params ::", params);
            writeToDynamoDb(params).then(data => {
                console.log('!!! Success !!!.');
                console.log("event", JSON.stringify(event));
                callback(null, event);
            });
        }
    // })
// };

function writeToDynamoDb(params) {
    return new Promise((resolve, reject) => {
        var documentClient = new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });
        documentClient.put(params, function (err, data) {
            if (err) {
                console.log('Error Writing record into dynamo-DB failed: ' + err);
                reject();
            }
            else {
                console.log('Write to Dynamo-DB record succeeded !!!.');
                resolve(data);
            }

        });
    });
}

function doesConsumerExist(cognitoId) {
    return new Promise((resolve, reject) => {
        let documentClient = new AWS.DynamoDB.DocumentClient();

        let getConsumerParams = {
            TableName: process.env.ConsumerInfoTable,
            IndexName: "Cognito_Id-index",
            KeyConditionExpression: "#Cognito_Id = :cognitoId",
            ExpressionAttributeNames: {
                "#Cognito_Id": "Cognito_Id"
            },
            ExpressionAttributeValues: {
                ":cognitoId": cognitoId
            }
        };

        documentClient.query(getConsumerParams, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data.Count > 0 ? true : false);
            }

        });
    });
}