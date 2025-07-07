const moongoose = require('mongoose');

const connectDB = async () => {
    try {
        await moongoose.connect(process.env.MONGO_URI, {});
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1); 
    }
}

module.exports = connectDB;