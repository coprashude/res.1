import { Router } from 'express';

const router = Router();

const ACTION_VERBS = [
  "Spearheaded", "Architected", "Engineered", "Orchestrated", "Accelerated",
  "Optimized", "Revamped", "Pioneered", "Automated", "Delivered"
];

router.post('/enhance-bullet', (req, res) => {
  const { text } = req.body;
  const verb = ACTION_VERBS[Math.floor(Math.random() * ACTION_VERBS.length)];
  const cleaned = (text || "Built scalable web components").replace(/^[a-zA-Z]+ed\s+/i, "");
  res.json({
    enhanced: `${verb} ${cleaned}, improving system throughput by 35% and reducing user friction.`
  });
});

export default router;

