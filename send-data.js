require("dotenv").config();
const SendEvents = require("./send-events");

async function main() {
  let sendData = [];
  // Create a producer client to send messages to the event hub.
  sendData.length = 0;
  const retrieveBackUpdata = [
    {
      user_id: "example-user-Id",
      channel: "example-channel",
      org: "example-org",
      testing: "example-data",
      data: {
        "example-key-data": "example-value-data",
      },
    },
  ];
  retrieveBackUpdata.forEach(async (result) => {
    //result.data = JSON.parse(result.data.replace(/\\"/g, '"'));
    sendData.push(result);
  });
  console.log("result: ", `${JSON.stringify(sendData)}`);

  if (sendData.length > 0) {
    for (var i = 0; i < sendData.length; i++) {
      await SendEvents.sendBatch(sendData[i]);
    }
  }
  console.log("All the events are sent done now.");
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
