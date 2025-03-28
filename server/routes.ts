import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ollama } from "./ollama";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes for Ollama integration
  app.get("/api/ollama/status", async (req, res) => {
    try {
      const status = await ollama.checkStatus();
      res.json(status);
    } catch (error) {
      res.status(500).json({ 
        connected: false, 
        message: "Failed to connect to Ollama service" 
      });
    }
  });

  app.get("/api/ollama/models", async (req, res) => {
    try {
      const models = await ollama.getModels();
      res.json(models);
    } catch (error) {
      res.status(500).json({ 
        error: "Failed to fetch models from Ollama" 
      });
    }
  });

  app.post("/api/ollama/generate", async (req, res) => {
    try {
      const { model, prompt } = req.body;

      if (!model || !prompt) {
        return res.status(400).json({ error: "Model and prompt are required" });
      }

      const response = await ollama.generateCompletion(model, prompt);
      
      // Save to history
      await storage.createPromptHistory({
        model,
        prompt,
        response: response.response,
        metadata: { processing_time: response.processing_time },
      });

      res.json(response);
    } catch (error) {
      res.status(500).json({ 
        error: "Failed to generate completion" 
      });
    }
  });

  // API Routes for templates
  app.get("/api/templates", async (req, res) => {
    try {
      const templates = await storage.getAllTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch templates" });
    }
  });

  app.get("/api/templates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const template = await storage.getTemplate(id);
      
      if (!template) {
        return res.status(404).json({ error: "Template not found" });
      }
      
      res.json(template);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch template" });
    }
  });

  app.post("/api/templates", async (req, res) => {
    try {
      const { title, description, content, tags } = req.body;
      
      if (!title || !description || !content || !tags) {
        return res.status(400).json({ error: "All fields are required" });
      }
      
      const template = await storage.createTemplate({
        title,
        description,
        content,
        tags,
      });
      
      res.status(201).json(template);
    } catch (error) {
      res.status(500).json({ error: "Failed to create template" });
    }
  });

  // API Routes for prompt history
  app.get("/api/history", async (req, res) => {
    try {
      const history = await storage.getAllPromptHistory();
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch prompt history" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
