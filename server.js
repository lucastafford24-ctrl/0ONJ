const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

const menu = [
  {
    id: 'burger-classic',
    name: 'Classic Burger',
    category: 'Burgers',
    price: 12.5,
    description: 'Beef patty, cheddar, lettuce, tomato, pickles, and signature sauce.',
    image: '🍔'
  },
  {
    id: 'chicken-wrap',
    name: 'Crispy Chicken Wrap',
    category: 'Wraps',
    price: 11.0,
    description: 'Crispy chicken, lettuce, tomato, slaw, and ranch in a warm tortilla.',
    image: '🌯'
  },
  {
    id: 'margherita-pizza',
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: 16.0,
    description: 'Hand-tossed crust with mozzarella, basil, and tomato sauce.',
    image: '🍕'
  },
  {
    id: 'caesar-salad',
    name: 'Caesar Salad',
    category: 'Salads',
    price: 9.75,
    description: 'Romaine, parmesan, croutons, and creamy Caesar dressing.',
    image: '🥗'
  },
  {
    id: 'fries',
    name: 'Loaded Fries',
    category: 'Sides',
    price: 5.5,
    description: 'Crispy fries topped with cheddar, scallions, and smoky sauce.',
    image: '🍟'
  },
  {
    id: 'milkshake',
    name: 'Vanilla Shake',
    category: 'Drinks',
    price: 4.5,
    description: 'Creamy vanilla shake made with premium ice cream.',
    image: '🥤'
  }
];

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
  }
}

function readOrders() {
  ensureDataFile();
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
  } catch (error) {
    return [];
  }
}

function writeOrders(orders) {
  ensureDataFile();
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

function sendOrderConfirmationEmail(order, customerEmail) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    return transporter.sendMail({
      from: process.env.EMAIL_FROM || 'Foodie Hub <no-reply@foodiehub.local>',
      to: customerEmail,
      subject: `Your Foodie Hub order #${order.id} is confirmed`,
      html: `
        <h2>Thanks for your order, ${order.customer.name}!</h2>
        <p>Your order has been received and is being prepared.</p>
        <p><strong>Order Number:</strong> ${order.id}</p>
        <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
        <p><strong>Delivery Address:</strong> ${order.customer.address}</p>
        <ul>
          ${order.items
            .map(
              (item) =>
                `<li>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`
            )
            .join('')}
        </ul>
      `
    });
  }

  const fakeEmailLog = {
    orderId: order.id,
    to: customerEmail,
    subject: `Your Foodie Hub order #${order.id} is confirmed`,
    body: `Thank you for your order, ${order.customer.name}! Your order is confirmed and will be prepared shortly.`
  };

  const confirmationLogPath = path.join(DATA_DIR, 'email-confirmations.json');
  let logs = [];

  if (fs.existsSync(confirmationLogPath)) {
    logs = JSON.parse(fs.readFileSync(confirmationLogPath, 'utf8'));
  }

  logs.push(fakeEmailLog);
  fs.writeFileSync(confirmationLogPath, JSON.stringify(logs, null, 2));

  console.log('FAKE EMAIL SENT:', fakeEmailLog);
  return Promise.resolve({ messageId: `demo-${order.id}` });
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/menu', (req, res) => {
  res.json(menu);
});

app.get('/api/orders', (req, res) => {
  res.json(readOrders());
});

app.post('/api/orders', async (req, res) => {
  const { customer, items } = req.body;

  if (!customer || !customer.name || !customer.email || !customer.address) {
    return res.status(400).json({ error: 'Customer details are required.' });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Your cart is empty.' });
  }

  const validItems = items
    .map((item) => {
      const menuItem = menu.find((entry) => entry.id === item.id);
      if (!menuItem) return null;

      const quantity = Number(item.quantity || 0);
      if (quantity <= 0) return null;

      return {
        id: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity,
        total: menuItem.price * quantity
      };
    })
    .filter(Boolean);

  if (validItems.length === 0) {
    return res.status(400).json({ error: 'Please select valid items from the menu.' });
  }

  const order = {
    id: `FH-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
    customer: {
      name: customer.name,
      email: customer.email,
      address: customer.address
    },
    items: validItems,
    total: validItems.reduce((sum, item) => sum + item.total, 0),
    paymentStatus: 'Fake payment approved',
    status: 'Confirmed'
  };

  try {
    const orders = readOrders();
    orders.unshift(order);
    writeOrders(orders);

    await sendOrderConfirmationEmail(order, customer.email);

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully. Confirmation email sent.',
      order
    });
  } catch (error) {
    console.error('Error processing order:', error);
    return res.status(500).json({ error: 'There was a problem placing your order.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Food ordering app is running on http://localhost:${PORT}`);
});
