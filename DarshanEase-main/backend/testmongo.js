const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/yourdbname", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log("Connected. Testing query...");
        const db = mongoose.connection.db;
        const cols = await db.listCollections().toArray();
        console.log("Collections:", cols.map(c => c.name));
        process.exit(0);
    })
    .catch(err => {
        console.log("Error:", err);
        process.exit(1);
    });
