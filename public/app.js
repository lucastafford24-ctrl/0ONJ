* {
  box-sizing: border-box;
}

:root {
  --bg: #fffaf5;
  --panel: #ffffff;
  --panel-alt: #fff4ea;
  --text: #1f1a17;
  --muted: #6c5b55;
  --primary: #ef6d2d;
  --primary-dark: #d95616;
  --accent: #f7c66a;
  --border: #f1dfd1;
  --success: #2e9d76;
  --shadow: 0 18px 45px rgba(80, 42, 16, 0.08);
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: linear-gradient(180deg, #fff8f1 0%, #fffaf5 100%);
  color: var(--text);
}

button,
input,
textarea {
  font: inherit;
}

.topbar {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: linear-gradient(135deg, #ef6d2d, #f39e62);
  box-shadow: var(--shadow);
  font-size: 26px;
}

h1,
h2,
p {
  margin: 0;
}

.eyebrow {
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.topbar h1 {
  font-size: clamp(1.6rem, 2vw, 2.5rem);
}

.cart-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--panel);
  border-radius: 999px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 24px 0;
  display: grid;
  grid-template-columns: 1.6fr 0.9fr;
  gap: 24px;
}

.menu-panel,
.checkout-panel,
.recent-orders {
  background: var(--panel);
  border-radius: 24px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.menu-panel,
.checkout-panel {
  padding: 24px;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}

.menu-item {
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
  background: linear-gradient(180deg, #fff 0%, #fffaf6 100%);
}

.menu-item-visual {
  display: grid;
  place-items: center;
  height: 120px;
  font-size: 3rem;
  background: var(--panel-alt);
}

.menu-item-body {
  padding: 16px;
}

.menu-item-top {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 8px;
  margin-bottom: 8px;
}

.menu-item h3 {
  margin: 0;
  font-size: 1.1rem;
}

.category-tag {
  padding: 5px 8px;
  border-radius: 999px;
  background: #ffe7d7;
  color: var(--primary-dark);
  font-size: 0.7rem;
  font-weight: bold;
}

.menu-item p {
  color: var(--muted);
  line-height: 1.5;
  margin-bottom: 14px;
}

.menu-item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.2rem;
  font-weight: 700;
}

.add-btn,
.primary-btn,
.small-btn {
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.15s ease;
}

.add-btn:hover,
.primary-btn:hover,
.small-btn:hover {
  transform: translateY(-1px);
}

.add-btn {
  padding: 10px 12px;
  background: var(--primary);
  color: white;
  font-weight: 700;
}

.checkout-panel {
  align-self: start;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 110px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}

.cart-item-meta {
  display: flex;
  flex-direction: column;
}

.item-price-line {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--muted);
  font-size: 0.9rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.small-btn {
  width: 28px;
  height: 28px;
  background: #f7efe8;
  color: var(--text);
  font-size: 1rem;
}

.totals {
  margin: 20px 0 18px;
  border-top: 1px solid var(--border);
  padding-top: 18px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.total-row {
  font-size: 1.1rem;
  margin-top: 8px;
  padding-top: 10px;
  border-top: 1px solid var(--border);
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.checkout-form label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 600;
}

.checkout-form input,
.checkout-form textarea {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  background: #fffdfb;
}

.fake-payment-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  background: #edfdf6;
  border: 1px solid #bfe9d7;
  border-radius: 12px;
  color: var(--success);
}

.primary-btn {
  padding: 14px 18px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  font-weight: 700;
}

.order-message {
  min-height: 28px;
  margin-top: 16px;
  font-weight: 700;
}

.order-message.success {
  color: var(--success);
}

.order-message.error {
  color: #b1432a;
}

.recent-orders {
  max-width: 1200px;
  margin: 24px auto 48px;
  padding: 24px;
}

.recent-orders-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}

.order-card {
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 16px;
  background: #fffdfb;
}

.order-id {
  font-weight: 700;
  margin-bottom: 6px;
}

.order-card small {
  color: var(--muted);
}

.empty-state {
  color: var(--muted);
  padding: 16px 0;
}

@media (max-width: 840px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }
}
