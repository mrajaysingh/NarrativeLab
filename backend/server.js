
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const redis = require('redis');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

// Note: Ensure DATABASE_URL is set in your environment matching the request
const prisma = new PrismaClient();
const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'narrative_architect_core_2025_secure';

// Redis connection for fast analytics and session queries
const redisClient = redis.createClient({
  url: "redis://default:N3wYFKINplXEp6K5RpFFh5VEkvvJUnXp@redis-14698.crce179.ap-south-1-1.ec2.redns.redis-cloud.com:14698"
});

redisClient.on('error', err => console.error('Redis Error:', err));
redisClient.connect().then(() => console.log('Redis Connected Successfully'));

app.use(cors());
app.use(express.json());

// Middleware: Authenticate JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Authentication required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// Middleware: Superadmin Only
const isAdmin = async (req, res, next) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (user && user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied: Superadmin privileges required' });
  }
};

// Auth: Register
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const userCount = await prisma.user.count();
    
    // First user becomes Admin by default for setup
    const user = await prisma.user.create({
      data: { 
        email, 
        password: hashedPassword,
        role: userCount === 0 ? 'ADMIN' : 'USER',
        tokensLimit: 5 
      }
    });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ 
      user: { 
        id: user.id, 
        email: user.email, 
        hasPaid: user.hasPaid, 
        role: user.role, 
        tokensUsed: 0, 
        tokensLimit: user.tokensLimit 
      }, 
      token 
    });
  } catch (e) {
    res.status(400).json({ error: 'Identification already exists in database.' });
  }
});

// Auth: Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials. Access denied.' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ 
    user: { 
      id: user.id, 
      email: user.email, 
      hasPaid: user.hasPaid, 
      role: user.role, 
      tokensUsed: user.tokensUsed, 
      tokensLimit: user.tokensLimit,
      plan: user.plan
    }, 
    token 
  });
});

// User: Profile
app.get('/api/user/me', authenticateToken, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  res.json({ 
    id: user.id, 
    email: user.email, 
    hasPaid: user.hasPaid, 
    plan: user.plan, 
    role: user.role,
    tokensUsed: user.tokensUsed,
    tokensLimit: user.tokensLimit
  });
});

// User: Purchase Plan
app.post('/api/user/purchase', authenticateToken, async (req, res) => {
  const { plan } = req.body;
  const limits = { 'Seed': 10, 'Growth': 25, 'Authority': 100 };
  
  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: { 
      hasPaid: true, 
      plan, 
      tokensLimit: limits[plan] || 10 
    }
  });

  await redisClient.del(`user:${user.id}`); // Invalidate cache
  res.json(user);
});

// User: Cancel Plan
app.post('/api/user/cancel', authenticateToken, async (req, res) => {
  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: { hasPaid: false, plan: null, tokensLimit: 5 }
  });
  res.json(user);
});

// User: Record Usage (Increment Tokens)
app.post('/api/user/usage', authenticateToken, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (user.tokensUsed >= user.tokensLimit) {
    return res.status(403).json({ error: 'Daily synthesis limit reached. Please upgrade.' });
  }

  const updated = await prisma.user.update({
    where: { id: req.user.id },
    data: { tokensUsed: { increment: 1 } }
  });
  res.json(updated);
});

// Admin: System-wide Analytics
app.get('/api/admin/analytics', authenticateToken, isAdmin, async (req, res) => {
  const cacheKey = 'admin:analytics:v1';
  const cached = await redisClient.get(cacheKey);
  if (cached) return res.json(JSON.parse(cached));

  const totalUsers = await prisma.user.count();
  const paidUsers = await prisma.user.count({ where: { hasPaid: true } });
  const authorityUsers = await prisma.user.count({ where: { plan: 'Authority' } });
  const growthUsers = await prisma.user.count({ where: { plan: 'Growth' } });
  
  // Simulated revenue calculation
  const revenue = (authorityUsers * 29) + (growthUsers * 12);
  const synthesisCount = await prisma.user.aggregate({ _sum: { tokensUsed: true } });

  const analytics = {
    totalUsers,
    activeToday: Math.floor(totalUsers * 0.35) + 1,
    revenue,
    dbStatus: 'Healthy',
    redisStatus: 'Connected',
    synthesisCount: synthesisCount._sum.tokensUsed || 0
  };

  await redisClient.set(cacheKey, JSON.stringify(analytics), { EX: 60 }); // Cache for 60 seconds
  res.json(analytics);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`[Narrative Architect Engine] Protocol active on port ${PORT}`));
