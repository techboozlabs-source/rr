import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock API for payment processing
  app.post("/api/checkout", (req, res) => {
    const { items, total, shipping, billing } = req.body;
    
    // In a real app, you'd integrate with Stripe or Razorpay here
    console.log("Processing order for:", billing.email);
    console.log("Total Amount:", total);
    
    // Simulate success
    setTimeout(() => {
      res.json({ 
        success: true, 
        orderId: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        message: "Payment processed successfully!" 
      });
    }, 1500);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
