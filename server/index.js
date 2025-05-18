import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5007;

app.use(cors());
app.use(express.json());

// In-memory stores
let users = [];
let products = [];

// --- USER CRUD ---

// CREATE user (register)
app.post('/api/users', (req, res) => {
  const { name, email, password, role, location } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: 'User already exists' });
  }
  const newUser = {
    id: `user${users.length + 1}`,
    name,
    email,
    password, // In production, hash the password!
    role,
    location
  };
  users.push(newUser);
  res.status(201).json({ id: newUser.id, name, email, role, location });
});

// READ all users
app.get('/api/users', (req, res) => {
  res.json(users.map(({ password, ...u }) => u));
});

// READ one user
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { password, ...userData } = user;
  res.json(userData);
});

// UPDATE user
app.put('/api/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  const { name, email, password, role, location } = req.body;
  users[idx] = { ...users[idx], name, email, password, role, location };
  const { password: pw, ...userData } = users[idx];
  res.json(userData);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  const { password, ...deleted } = users.splice(idx, 1)[0];
  res.json(deleted);
});

// --- PRODUCT CRUD ---

// CREATE product
app.post('/api/products', (req, res) => {
  const { name, description, price, image_url, seller_id } = req.body;
  if (!name || !description || !price || !image_url || !seller_id) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const newProduct = {
    id: `product${products.length + 1}`,
    name,
    description,
    price,
    image_url,
    seller_id,
    created_at: new Date().toISOString()
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// READ all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// READ one product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// UPDATE product
app.put('/api/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  const { name, description, price, image_url, seller_id } = req.body;
  products[idx] = { ...products[idx], name, description, price, image_url, seller_id };
  res.json(products[idx]);
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  const deleted = products.splice(idx, 1)[0];
  res.json(deleted);
});

// --- LOGIN (for demo) ---
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const { password: pw, ...userData } = user;
  res.json(userData);
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});