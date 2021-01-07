import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const connectDatabase = async (): Promise<void> => {
    // const result = process.env.NODE_ENV === 'test' ? process.env.DATABASE_TEST : process.env.DATABASE;
    const result = process.env.DATABASE;
    try {
        await mongoose.connect(
            `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@127.0.0.1:27017/${result}?authSource=${result}?retryWrites=false`,
            { useNewUrlParser: true, useUnifiedTopology: true },
        );
        console.log('MongoDB database connection established successfully');
    } catch (e) {
        throw new Error(e);
    }
};

export default connectDatabase;
