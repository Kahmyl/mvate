import dotenv from "dotenv"
dotenv.config()

export default{
    port: 4500,
    host: 'localhost',
    dbURI: process.env.DVENT_DB_URI,
    saltWorkFactor: 10,
    privateKey: ''
}
