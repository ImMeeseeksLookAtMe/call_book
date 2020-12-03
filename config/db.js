const mongoose = require('mongoose');

const connectDB = async () =>  {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false   
        })
        console.log('Connected to DB')
    } catch (error) {
        console.error(error.message);
        //Exit process with failure
        process.exit(1)
    }
}

module.exports = connectDB