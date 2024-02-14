import { connect } from "mongoose"
const dbConnect = async () => {
    if (!process.env.MONGO_URL) throw new Error('check the MONGO_URL')
    try {
        await connect(process.env.MONGO_URL)
        console.log("Connected to the database")
    } catch (err) {
        console.log("err")
    }
}

export default dbConnect