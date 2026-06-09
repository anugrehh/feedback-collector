const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://anugrah:anugrah123@ac-j8edrv2-shard-00-00.ugg2kma.mongodb.net:27017,ac-j8edrv2-shard-00-01.ugg2kma.mongodb.net:27017,ac-j8edrv2-shard-00-02.ugg2kma.mongodb.net:27017/?ssl=true&replicaSet=atlas-dzcnk7-shard-0&authSource=admin&appName=FeedbackCluster"
)
.then(() => {
  console.log("✅ CONNECTED TO ATLAS");
  process.exit(0);
})
.catch((err) => {
  console.log("❌ CONNECTION FAILED");
  console.log(err);
  process.exit(1);
});