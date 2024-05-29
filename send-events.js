require("dotenv").config();
const { EventHubProducerClient } = require("@azure/event-hubs");

const connectionString = process.env.EVENTHUBS_CONNECTIONSTRING;
const eventHubName = process.env.EVENTHUBS_NAME;

const sendBatch = async (data) => {
  const producerClient = new EventHubProducerClient(
    connectionString,
    eventHubName
  );

  console.log("Creating and sending a batch of events...");

  try {
    const batch = await producerClient.createBatch();

    console.log(`Batch message to be sent - ${JSON.stringify(data)}`);
    console.log(data);

    const batchAdded = batch.tryAdd({ body: data });

    if (batchAdded) {
      console.log("Added to the batch");
    }

    // Send the batch to the event hub.
    console.log("Sending message as a batch...");
    await producerClient.sendBatch(batch);
    console.log("Message batch sent...");
  } catch (error) {
    console.log(error);

    throw error;
  }

  // Close the producer client.
  await producerClient.close();
};

module.exports = { sendBatch };
