const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const { DynamoDBDocumentClient, UpdateCommand } = require("@aws-sdk/lib-dynamodb");



// Create client

const client = new DynamoDBClient({ region: "us-east-1" });

const dynamo = DynamoDBDocumentClient.from(client);



// Main function

async function abc({ bookingId, createdAt, newStatus }) {

    const params = {

        TableName: "Flightbooking_production",

        Key: {

            bookingId: bookingId,
            createdAt: createdAt


        },

        UpdateExpression: "SET #status = :status",

        ExpressionAttributeNames: { "#status": "status" },

        ExpressionAttributeValues: { ":status": newStatus },

        ReturnValues: "UPDATED_NEW"

    };



    try {

        const data = await dynamo.send(new UpdateCommand(params));

        console.log("Updated successfully:", data);

    } catch (err) {

        console.error("Update error:", err);

    }

}



// Test call

abc({

    bookingId: "17925573",

    createdAt: "2025-12-02T06:23:41.525Z",

    newStatus: "Confirmed"

});