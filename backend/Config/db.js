const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.DB_URI;
let db;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});



async function connectDB() {
    try {
        db = client.db('portfolio');
        console.log('MongoDB connected with Native driver ✅');
    } catch (err) {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
    }
}

function getDB() {
    if (!db) throw new Error('Database not connected!');
    return db;
}

module.exports = { connectDB, getDB };
