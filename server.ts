
import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- File System API ---

  // List directory contents
  app.get("/api/fs/list", async (req, res) => {
    try {
      const dirPath = (req.query.path as string) || ".";
      const absolutePath = path.resolve(__dirname, dirPath);
      
      // Security: Prevent escaping project root
      if (!absolutePath.startsWith(__dirname)) {
        return res.status(403).json({ error: "Access denied" });
      }

      const entries = await fs.readdir(absolutePath, { withFileTypes: true });
      const result = entries.map(entry => ({
        name: entry.name,
        isDirectory: entry.isDirectory(),
        path: path.join(dirPath, entry.name)
      }));
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Read file content
  app.get("/api/fs/read", async (req, res) => {
    try {
      const filePath = req.query.path as string;
      if (!filePath) return res.status(400).json({ error: "Path required" });
      
      const absolutePath = path.resolve(__dirname, filePath);
      if (!absolutePath.startsWith(__dirname)) {
        return res.status(403).json({ error: "Access denied" });
      }

      const content = await fs.readFile(absolutePath, "utf-8");
      res.json({ content });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Write file content
  app.post("/api/fs/write", async (req, res) => {
    try {
      const { filePath, content } = req.body;
      if (!filePath || content === undefined) {
        return res.status(400).json({ error: "Path and content required" });
      }

      const absolutePath = path.resolve(__dirname, filePath);
      if (!absolutePath.startsWith(__dirname)) {
        return res.status(403).json({ error: "Access denied" });
      }

      // Ensure directory exists
      await fs.mkdir(path.dirname(absolutePath), { recursive: true });
      await fs.writeFile(absolutePath, content, "utf-8");
      
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
