import mongoose from "mongoose";

export const connectDB = async () => {
   await mongoose.connect('mongodb+srv://kritika892:1203@cluster0.iylko.mongodb.net/foodie').then(()=>console.log(`DB Connected!! @ ${mongoose.connection.host}`));
};




