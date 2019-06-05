exports = function(payload, response) {
  
  const twilio = context.services.get("voting");
  const votes = context.services.get("mongodb-atlas").db("worldVoting").collection("votes");
 
  const fromPhone = payload.From;
  const team = payload.Body.trim();
  
  //const addVote = votes.insertOne({"fromPhone": fromPhone, "team": team});
  if (team=="one" || team=="two" || team=="three") {
  
    votes.updateOne({"team": team}, {
      $inc: {"votes": 1}
    }, {upsert: true});
    console.log("VOTE FOR  " + team + " from " + fromPhone);     
    // twilio.send({
    //     to: fromPhone,
    //     from: context.values.get("twilioNumber"),
    //     body: `Thanks for your vote! Be sure to visit Builder's Fest at MongoDB World to see how this app works.` 
    // });  
  } else {
    console.log("VOTE FOR Invalid team");     
    // twilio.send({
    //     to: fromPhone,
    //     from: context.values.get("twilioNumber"),
    //     body: `Thanks for voting - but unfortunately, you need to vote for one, two, or three` 
    // });  
  }
};
