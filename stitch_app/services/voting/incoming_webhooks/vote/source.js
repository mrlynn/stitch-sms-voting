exports = async function(payload, response) {
  
  const twilio = context.services.get("sendSMS");
  const votes = context.services.get("mongodb-atlas").db("worldVoting").collection("votes");
 
  const fromPhone = payload.From;
  var team = payload.Body.trim().toLowerCase();
  var rtn;
  
  switch (team) {
    case 1:
	  case "1":
	  case "one":
  		team="two";
  		break;
    case 2:
	  case "2":
	  case "two":
  		team="two";
  		break;
    case 3:
	  case "3":
	  case "three":
  		team="three";
  		break;
  	default:
  	  console.log("Invalid team");     
      let rtn = await twilio.send({
        to: fromPhone,
        from: context.values.get("twilioNumber"),
        body: `Thanks for voting - but unfortunately, you need to vote for one, two, or three` 
      });
      return false;
  }
  
  if (team==="one" || team==="two" || team==="three") {
    
    votes.updateOne({"team": team}, {
      $inc: {"votes": 1}
    }, {upsert: true});
    
    console.log("VOTE FOR " + team + " from " + fromPhone);    
    try {
      let rtn = await twilio.send({
        to: fromPhone,
        from: "+12018066646",
        body: `Thanks for your vote for team ` + team + `! Be sure to visit Builder's Fest at MongoDB World to see how this app works.` 
      });
    } catch(e) {
      console.log(JSON.stringify(e));
    }
  } else {
    console.log("VOTE FOR Invalid team");     
    let rtn = await twilio.send({
        to: fromPhone,
        from: context.values.get("twilioNumber"),
        body: `Thanks for voting - but unfortunately, you need to vote for one, two, or three` 
    });  
  }
  
};
