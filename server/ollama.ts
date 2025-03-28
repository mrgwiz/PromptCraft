import fetch from "node-fetch";

interface OllamaCompletionResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

interface OllamaErrorResponse {
  error: string;
}

interface OllamaStatusResponse {
  connected: boolean;
  message?: string;
}

interface OllamaModelsResponse {
  models: Array<{
    name: string;
    modified_at: string;
    size: number;
    digest: string;
    details: Record<string, unknown>;
  }>;
}

interface OllamaCompletionRequest {
  model: string;
  prompt: string;
  stream?: boolean;
  options?: Record<string, unknown>;
}

interface CompletionResult {
  response: string;
  processing_time: number;
}

class OllamaService {
  private baseUrl: string;

  constructor() {
    // Default to localhost:11434 if no environment variable is set
    this.baseUrl = process.env.OLLAMA_HOST || "http://localhost:11434";
  }

  async checkStatus(): Promise<OllamaStatusResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`);
      
      if (response.ok) {
        return { connected: true };
      }
      
      return { 
        connected: false, 
        message: `Ollama server responded with status ${response.status}` 
      };
    } catch (error) {
      return { 
        connected: false, 
        message: `Failed to connect to Ollama: ${error instanceof Error ? error.message : String(error)}` 
      };
    }
  }

  async getModels(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.statusText}`);
      }
      
      const data = await response.json() as OllamaModelsResponse;
      return data.models.map(model => model.name);
    } catch (error) {
      console.error("Error fetching models:", error);
      return ["llama2:7b", "mistral:7b", "codellama:7b"]; // Default fallback models
    }
  }

  async generateCompletion(model: string, prompt: string): Promise<CompletionResult> {
    try {
      const startTime = Date.now();
      
      const requestBody: OllamaCompletionRequest = {
        model,
        prompt,
        stream: false,
      };

      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json() as OllamaErrorResponse;
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json() as OllamaCompletionResponse;
      const processingTime = Date.now() - startTime;

      return {
        response: data.response,
        processing_time: processingTime,
      };
    } catch (error) {
      console.error("Error generating completion:", error);
      
      // For demo purposes, return a mock response if Ollama is not available
      if (process.env.NODE_ENV !== 'production') {
        return {
          response: `[Simulated response - Ollama connection failed: ${error instanceof Error ? error.message : String(error)}]\n\nPrompt engineering is the practice of designing and refining text inputs for language models to generate desired outputs. It's like learning how to ask questions in just the right way to get the best possible answers from an AI assistant.`,
          processing_time: 500,
        };
      }
      
      throw error;
    }
  }
}

export const ollama = new OllamaService();
