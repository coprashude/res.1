import { Router } from 'express';

const router = Router();

router.post('/login', (req, res) => {
  const { email } = req.body;
  res.json({
    token: "mock-jwt-token-12345",
    user: {
      id: "usr-1",
      email: email || "alex.morgan@techlead.dev",
      name: (email || "Alex Morgan").split("@")[0]
    }
  });
});

router.post('/register', (req, res) => {
  const { email, name } = req.body;
  res.status(201).json({
    token: "mock-jwt-token-67890",
    user: { id: "usr-new", email, name }
  });
});

export default router;

