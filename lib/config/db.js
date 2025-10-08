import mongoose from "mongoose"


export const connectDB = async ()=>{
    await mongoose.connect('Enter your mondodb uri here')

    console.log("DB Connected")
}