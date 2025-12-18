import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || "mongodb+srv://SUJI_G:Suji01092006@apprecharge.3qqwytu.mongodb.net/rechargeDB?retryWrites=true&w=majority";
  
  try {
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB Atlas connected successfully!");
    console.log('📊 Database:', mongoose.connection.name);
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }

  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB disconnected');
  });
};

export default connectDB;
