exports = async function(event) {
  
  const db = context.services.get("mongodb-atlas").db("worldVoting");
  const events = db.collection("events");

  const eventDoc = event;
  delete eventDoc._id;
  
  eventDoc.date_created = new Date();
  events.insertOne({event: eventDoc});
  

  const twilio = context.services.get("sendSMS");
  console.log("Twilio Number: " + context.values.get("twilioNumber"));
  try {
    await twilio.send({
      to: '+12158666036',
      from: '+12018066646',
      body: "vote received"
    });
  } catch(e) {
    console.log(JSON.stringify(e));
  }

};