const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const { DynamoDBDocumentClient, UpdateCommand } = require("@aws-sdk/lib-dynamodb");



// Create DynamoDB client

const client = new DynamoDBClient({ region: "us-east-1" });

const dynamo = DynamoDBDocumentClient.from(client);



// ✅ Lambda handler (THIS IS REQUIRED)

exports.handler = async (event) => {

  console.log("Received event:", JSON.stringify(event));



  // Read values from event (API Gateway / test event)

  const { bookingId, flightId, newStatus } = event;



  if (!bookingId || !flightId || !newStatus) {

    return {

      statusCode: 400,

      body: JSON.stringify({ message: "Missing required fields" })

    };

  }



  const params = {

    TableName: "Flightbooking_production",
    Key: {

      bookingId: String(bookingId),

      flightId: String(flightId)
    },
    UpdateExpression: "SET #s = :newStatus, #b = :newBookingStatus",

    ExpressionAttributeNames: {

      "#s": "status",

      "#b": "bookingStatus"

    },

    ExpressionAttributeValues: {

      ":newStatus": success,

      ":newBookingStatus": success,

    }

  };

  try {

    await dynamo.send(new UpdateCommand(params));



    return {

      statusCode: 200,

      body: JSON.stringify({

        message: "DynamoDB updated successfully",

      })

    };

  }
  
  catch (error) {

    console.error("DynamoDB update failed:", error);


    return {

      statusCode: 500,

      body: JSON.stringify({

        message: "Update failed",

        error: error.message

      })

    };

  }

};

// Test call
  ({
    bookingId: "17925573",
    flightId: "b364be91-0553-475a-a0a9-0402a796144d",
    newStatus: "success",

      })

