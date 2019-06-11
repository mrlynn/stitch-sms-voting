exports = async function(payload, response) {
  
  const twilio = context.services.get("voting");
  const votes = context.services.get("mongodb-atlas").db("worldVoting").collection("votes");
 
  const fromPhone = payload.From;
  var team = payload.Body.trim().toLowerCase();
    
  try {
    await twilio.send({
      to: fromPhone,
      from: "+12018066646",
      body: `Thanks for your vote! Be sure to visit Builder's Fest at MongoDB World to see how this app works.` 
    });
  } catch(e) {
    console.log(JSON.stringify(e));
  }

};
