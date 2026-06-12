import { Router } from 'express';
import Activity from '../models/Activity.js';
const router = Router();
// Create activity
router.post('/', async (req, res) => {
    try {
        const { user, type, duration, calories, date } = req.body;
        const activity = new Activity({ user, type, duration, calories, date });
        await activity.save();
        res.status(201).json(activity);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// List activities
router.get('/', async (_req, res) => {
    const activities = await Activity.find().populate('user', 'name email').lean();
    res.json(activities);
});
// Get activity
router.get('/:id', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id).populate('user', 'name email').lean();
        if (!activity)
            return res.status(404).json({ error: 'Activity not found' });
        res.json(activity);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
export default router;
