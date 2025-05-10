const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017'; // Local MongoDB URL
const client = new MongoClient(url);
const dbName = 'passop';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

async function startServer() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('passwards');

    // Get all saved passwords
    app.get('/', async (req, res) => {
      try {
        const result = await collection.find({}).toArray();
        res.json(result);
      } catch (err) {
        console.error('❌ Error fetching data:', err);
        res.status(500).send('Error fetching data');
      }
    });

    // Save a new password entry
    app.post('/', async (req, res) => {
      try {
        const passwordData = req.body;
        // Important: Ensure no _id is sent by frontend
        const result = await collection.insertOne(passwordData);
        res.send({ success: true, result });
      } catch (err) {
        console.error('❌ Error inserting data:', err);
        res.status(500).send('Error inserting data');
      }
    });

    // Delete a password entry (based on unique _id)
    app.delete('/:id', async (req, res) => {
      const id = req.params.id;
      try {
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        res.send({ success: true, result });
      } catch (error) {
        res.status(500).send({ success: false, error });
      }
    });
    app.put('/:id', async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
    
      try {
        const result = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedData }
        );
        res.send({ success: true, result });
      } catch (error) {
        res.status(500).send({ success: false, error });
      }
    });

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });

  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
  }
}

startServer();
