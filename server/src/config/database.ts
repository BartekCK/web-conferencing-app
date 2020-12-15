import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const connectDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(
            // `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@srv06.mikr.us:40282/${process.env.DATABASE}?retryWrites=false`,
            `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@127.0.0.1:27017/${process.env.DATABASE}?retryWrites=false`,
            { useNewUrlParser: true, useUnifiedTopology: true },
        );
        console.log('MongoDB database connection established successfully');
    } catch (e) {
        throw new Error(e);
    }
};

export default connectDatabase;
