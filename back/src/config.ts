import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'fisProject';
const MONGO_PASSWORD = process.env.MONGO_USERNAME || 'fis2021';
const MONGO_HOST = process.env.MONGO_URL || `first-cluster.qbi2c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const SERVER_HOSTNAME = process.env.HOST_NAME || 'localhost';

const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    mongo: MONGO,
    server: SERVER
};

export default config;

