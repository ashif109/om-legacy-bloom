const mongoose = require('mongoose');

async function testConnection() {
  const uri = "mongodb+srv://ashifansari04704_db_user:Agr%4012345@cluster-om.7hq5qty.mongodb.net/?appName=Cluster-Om";
  try {
    console.log("Connecting...");
    await mongoose.connect(uri);
    console.log("Success!");
    process.exit(0);
  } catch (e) {
    console.error("Failed:", e.message);
    process.exit(1);
  }
}

testConnection();
