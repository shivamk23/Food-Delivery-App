import mongoose from "mongoose";

export const connectDB = async () => {
   await mongoose.connect('mongodb+srv://shivamdeveloper23:test1@cluster0.qnf9fdb.mongodb.net/foodie').then(()=>console.log(`DB Connected!! @ ${mongoose.connection.host}`));
};




