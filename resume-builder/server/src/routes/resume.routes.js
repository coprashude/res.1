import { Router } from 'express';

const router = Router();

// In-memory resume store for fast prototyping
let resumes = [];

router.get('/', (req, res) => {
  res.json({ resumes });
});

router.post('/', (req, res) => {
  const newResume = { id: `res-${Date.now()}`, ...req.body, updatedAt: new Date().toISOString() };
  resumes.push(newResume);
  res.status(201).json(newResume);
});

router.get('/:id', (req, res) => {
  const resume = resumes.find(r => r.id === req.params.id);
  if (!resume) return res.status(404).json({ message: "Resume not found" });
  res.json(resume);
});

router.put('/:id', (req, res) => {
  const index = resumes.findIndex(r => r.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Resume not found" });
  resumes[index] = { ...resumes[index], ...req.body, updatedAt: new Date().toISOString() };
  res.json(resumes[index]);
});

export default router;

