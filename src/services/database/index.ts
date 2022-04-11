import mongoose from "mongoose";

const connectMongoDB = async () => {
  if (mongoose.connections[0].readyState === 1) {
    console.log("Already connected");
    return;
  }
  await mongoose.connect(
    process.env.DATABASE_URI || "mongodb://localhost:27017/jpbakery"
  );
  console.log("Database connected.....");
};

export default connectMongoDB;
