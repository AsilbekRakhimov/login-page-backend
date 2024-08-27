import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
    dbUrl: process.env.DATABASE
}

export default dbConfig



