import { Router } from 'express';
import User from '../models/User.js';
import Activity from '../models/Activity.js';

const router = Router();

// Create a user
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

// List users
router.get('/', async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

// Get single user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

// Get activities for a user
router.get('/:id/activities', async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.params.id }).lean();
    res.json(activities);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

export default router;
