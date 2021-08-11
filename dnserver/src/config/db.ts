import mongoose from "mongoose";
import { DB_URI } from "./env";

mongoose.Promise = global.Promise;
try {
    mongoose.connect(DB_URI, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Connected To DB")
    })
} catch(e){
    console.log("Failed To Connect To DB")
}