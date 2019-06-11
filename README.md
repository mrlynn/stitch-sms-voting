# MongoDB Stitch - SMS Voting App

This repository was created to demonstrate the ability to integrate Twilio and MongoDB using MongoDB Stitch. The example app will be used for MongoDB World 2019 to help the audience determine the winner of the MongoDB World Hackathon. The top three finalists will be flown to NY to appear on stage with Eliot Horowitz to demonstrate their Hackathon projects. The audience will then be able to vote via SMS/Text Message for the project they would like to win.

## Requirements

* Twilio Account with SMS Capabilities
* Twilio Telphone Number (to receive sms messages for votes)
* MongoDB Atlas Account and Stitch Application

## Components

<details><summary>Front End</summary>
<p>

### HTML - dashboard.html

</p>
</details>

<details><summary>Stitch Service - Twilioo</summary>
<p>

### Incoming Webhook - vote.js

This is the code that executes when an sms text message is sent from Twilio to the API created in Stitch.

</p>
</details>

