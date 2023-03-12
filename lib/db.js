import { MongoClient } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let db;

export async function connectToDatabase() {
  if (client && client.isConnected) return { client, db };
  try {
    client = await MongoClient.connect(uri, options);
    db = client.db();
    console.log("Connected to database");
    return { client, db };
  } catch (error) {
    console.log("Error connecting to database");
  }
}
