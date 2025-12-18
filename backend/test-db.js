import mongoose from "mongoose";
import Plan from "./src/models/PlanModel.js";

const mongoUri = "mongodb+srv://SUJI_G:Suji01092006@apprecharge.3qqwytu.mongodb.net/rechargeDB?retryWrites=true&w=majority";

const testDatabase = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected successfully!');

    // Clear existing plans
    await Plan.deleteMany({});
    console.log('🧹 Cleared existing plans');

    // Add sample plans
    const samplePlans = [
      {
        operator: "Airtel",
        price: 199,
        validity: "28 Days",
        data: "1.5GB/day",
        call: "Unlimited",
        type: "RECOMMENDED",
        description: "Best value plan"
      },
      {
        operator: "Jio",
        price: 299,
        validity: "28 Days", 
        data: "2GB/day",
        call: "Unlimited",
        type: "TRULY UNLIMITED",
        description: "Unlimited everything"
      },
      {
        operator: "Vi",
        price: 149,
        validity: "28 Days",
        data: "1GB/day", 
        call: "Unlimited",
        type: "SMART RECHARGE",
        description: "Smart choice"
      }
    ];

    const createdPlans = await Plan.insertMany(samplePlans);
    console.log(`✅ Created ${createdPlans.length} sample plans`);

    // Verify data exists
    const allPlans = await Plan.find();
    console.log(`📊 Total plans in database: ${allPlans.length}`);
    
    allPlans.forEach(plan => {
      console.log(`- ${plan.operator}: ₹${plan.price} (${plan.type})`);
    });

    console.log('🎉 Database test completed successfully!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from database');
  }
};

testDatabase();