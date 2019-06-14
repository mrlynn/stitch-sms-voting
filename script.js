const { Stitch, RemoteMongoClient, UserPasswordCredential } = stitch;

// Initialize the App Client
// const client = stitch.Stitch.initializeDefaultAppClient("world-sms-voting-zslvt");
// Get a MongoDB Service Client
const client = stitch.Stitch.initializeDefaultAppClient(
  "world-sms-voting-zslvt"
);

const mongodb = client.getServiceClient(
  stitch.RemoteMongoClient.factory,
  "mongodb-atlas"
);

// Get a reference to the blog database
const db = mongodb.db("worldVoting");

function displayVotesOnLoad() {
  client.auth
    .loginWithCredential(new stitch.AnonymousCredential())
    .then(displayVotes)
    .catch(console.error);
}

function runOnce() {
  db.collection("votes").drop();
  db.collection("votes").insert({ team: "one", votes: 0, order: 0 });
  db.collection("votes").insert({ team: "two", votes: 0, order: 1 });
  db.collection("votes").insert({ team: "three", votes: 0, order: 2 });
}

function displayVotes() {
  getTeamNames;
  getPollState;
  await db.collection("votes")
    .find({})
    .asArray()
    .then(docs => {
      console.log(docs);
      getTeamNames;
      docs.forEach(buildHTML);
    });
}

function getPollState() {
    client.callFunction("pollState").then(pollState => {
        console.log(result) 
        if (pollState == "open") {
            document.getElementById("pollState").innerText = 'Close Poll';
        }
        else {
            document.getElementById("pollState").innerText = 'Open Poll';
        }
    });
}

function openPoll() {
    client.callFunction("openPoll").then(pollState => {
        console.log(result) 
        if (pollState == "yes") {
            document.getElementById("pollState").innerText = 'Close Poll';
        }
        else {
            document.getElementById("pollState").innerText = 'Open Poll';
        }
    });
}
function togglePoll() {
    client.callFunction("togglePoll").then(pollState => {
        console.log(result) 
        if (pollState == "yes") {
            document.getElementById("pollState").innerText = 'Close Poll';
        }
        else {
            document.getElementById("pollState").innerText = 'Open Poll';
        }
    });
}

function getTeamNames() {
  console.log("getting team names");
  db.collection("settings")
    .findOne({ name: "settings" })
    .then(settings => {
        console.log("Settings: " + EJSON.stringify(settings));
        const t1 =
        "<div class='team-name'>" + settings.teamOne.name + "</div>";
        const t2 =
        "<div class='team-name'>" + settings.teamTwo.name + "</div>";
        const t3 =
        "<div class='team-name'>" + settings.teamThree.name + "</div>";
        document.getElementById("teamOneName").innerHTML = t1;
        document.getElementById("teamTwoName").innerHTML = t2;
        document.getElementById("teamThreeName").innerHTML = t3;
        var pollState = settings.pollState;
        if (pollState == "closed") {
            document.getElementById("pollState").innerText = 'Open Poll';
        }
        else {
            document.getElementById("pollState").innerText = 'Close Poll';
        }
    });
}

function buildHTML(team) {
  const d = "<div>" + team.votes + "</div>";
  document.getElementById("votes" + team.team.toUpperCase()).innerHTML = d;
}

function addVote(team) {
  client.auth
    .loginWithCredential(new stitch.AnonymousCredential())
    .then(displayVotes)
    .catch(console.error);

  switch (team) {
    case 1:
    case "1":
    case "one":
      team = "one";
      break;
    case 2:
    case "2":
    case "two":
      team = "two";
      break;
    case 3:
    case "3":
    case "three":
      team = "three";
      break;
    default:
      console.log("Invalid team");
      return false;
  }
  console.log("team: " + team);
  if (team === "one" || team === "two" || team === "three") {
    console.log("Client: ", client.auth.user.id);
      db.collection("votes").updateOne({"team": team}, {
        $inc: {"votes": 1}
      }, {upsert: true});
  } else {
    console.log("VOTE FOR Invalid team");
    return false;
  }
}
