const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, UpdateCommand } = require("@aws-sdk/lib-dynamodb");

// Create client
const client = new DynamoDBClient({ region: "us-east-1" });
const dynamo = DynamoDBDocumentClient.from(client);

// Main function
async function abc({ bookingId, flightId, newStatus }) {
    const params = {
        TableName: "Flightbooking_production",
        Key: {
            bookingId: String(bookingId),   // or String(bookingId) based on schema
            flightId:  String(flightId) 
        },
         UpdateExpression: "SET #s = :newStatus, #b = :newBookingStatus",
  ExpressionAttributeNames: {
    "#s": "status",
    "#b": "bookingStatus"
  },
  ExpressionAttributeValues: {
    ":newStatus": "pending",
    ":newBookingStatus": "pending"
  }
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
    flightId: "b364be91-0553-475a-a0a9-0402a796144d",
    newStatus: "Pending",
    
});
