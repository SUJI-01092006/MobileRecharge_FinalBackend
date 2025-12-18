import Plan from "../models/PlanModel.js";

export const getPlans = async (req, res) => {
  try {
    console.log('📋 Fetching plans from database...');
    const plans = await Plan.find();
    console.log(`✅ Found ${plans.length} plans in database`);
    res.json({ success: true, plans });
  } catch (error) {
    console.error('❌ Get plans error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch plans' });
  }
};

export const createPlan = async (req, res) => {
  try {
    console.log('📝 Creating new plan:', req.body);
    const plan = await Plan.create(req.body);
    console.log('✅ Plan created successfully:', plan._id);
    res.status(201).json({ success: true, plan });
  } catch (error) {
    console.error('❌ Create plan error:', error);
    res.status(500).json({ success: false, message: 'Failed to create plan', error: error.message });
  }
};

export const updatePlan = async (req, res) => {
  console.log('=== UPDATE PLAN ===');
  console.log('Plan ID:', req.params.id);
  console.log('Update data:', req.body);
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!plan) {
      console.log('Plan not found with ID:', req.params.id);
      return res.status(404).json({ success: false, message: 'Plan not found' });
    }
    console.log('Plan updated successfully:', plan);
    res.json({ success: true, plan });
  } catch (error) {
    console.error('Update plan error:', error);
    if (error.name === 'ValidationError') {
      console.error('Validation errors:', error.errors);
      return res.status(400).json({ success: false, message: error.message });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid plan ID' });
    }
    res.status(500).json({ success: false, message: 'Failed to update plan' });
  }
};

export const deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.json({ success: true, message: 'Plan not found or already deleted' });
    }
    res.json({ success: true, message: 'Plan deleted successfully' });
  } catch (error) {
    console.error('Delete plan error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid plan ID' });
    }
    res.status(500).json({ success: false, message: 'Failed to delete plan' });
  }
};
