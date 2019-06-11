# MongoDB Stitch - SMS Voting App

This repository was created to demonstrate the ability to integrate Twilio and MongoDB using MongoDB Stitch. The example app will be used for MongoDB World 2019 to help the audience determine the winner of the MongoDB World Hackathon. The top three finalists will be flown to NY to appear on stage with Eliot Horowitz to demonstrate their Hackathon projects. The audience will then be able to vote via SMS/Text Message for the project they would like to win.

## Requirements

* Twilio Account with SMS Capabilities
* Twilio Telphone Number (to receive sms messages for votes)
* MongoDB Atlas Account and Stitch Application

## Components

<details><summary>Frontend</summary>
<p>

### HTML - dashboard.html

The `dashboard.html` file is hosted using MongoDB Stitch's static hosting capabilities.

</p>
</details>

<details><summary>Backend</summary>
<p>

### Service: Twilio - Incoming Webhook - vote.js

This is the code that executes when an sms text message is sent from Twilio to the API created in Stitch.

### Value: twilioNumber

Create a value to store the twilio telephone number you will use.

</p>
</details>

<details><summary>Infrastructure</summary>
<p>

### MongoDB Servers - MongoDB Atlas

MongoDB Databases are hosted in MongoDB Atlas.

</p>
</details>
