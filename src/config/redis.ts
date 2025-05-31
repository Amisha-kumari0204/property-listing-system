import dotenv from 'dotenv';
import Redis from 'ioredis';
dotenv.config();
if (!process.env.REDIS_URL) {
  throw new Error('REDIS_URL environment variable is not defined');
}
const redis = new Redis(process.env.REDIS_URL);

export default redis;
