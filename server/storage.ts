import { 
  type User, type InsertUser, 
  type Template, type InsertTemplate,
  type PromptHistory, type InsertPromptHistory,
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Template operations
  getAllTemplates(): Promise<Template[]>;
  getTemplate(id: number): Promise<Template | undefined>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  
  // Prompt history operations
  getAllPromptHistory(): Promise<PromptHistory[]>;
  getPromptHistory(id: number): Promise<PromptHistory | undefined>;
  createPromptHistory(history: InsertPromptHistory): Promise<PromptHistory>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private templates: Map<number, Template>;
  private promptHistory: Map<number, PromptHistory>;
  private userId: number;
  private templateId: number;
  private promptHistoryId: number;

  constructor() {
    this.users = new Map();
    this.templates = new Map();
    this.promptHistory = new Map();
    this.userId = 1;
    this.templateId = 1;
    this.promptHistoryId = 1;

    // Initialize with some example templates
    this.initializeTemplates();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Template operations
  async getAllTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values());
  }
  
  async getTemplate(id: number): Promise<Template | undefined> {
    return this.templates.get(id);
  }
  
  async createTemplate(insertTemplate: InsertTemplate): Promise<Template> {
    const id = this.templateId++;
    const now = new Date().toISOString();
    const template: Template = { ...insertTemplate, id, created_at: now };
    this.templates.set(id, template);
    return template;
  }
  
  // Prompt history operations
  async getAllPromptHistory(): Promise<PromptHistory[]> {
    return Array.from(this.promptHistory.values());
  }
  
  async getPromptHistory(id: number): Promise<PromptHistory | undefined> {
    return this.promptHistory.get(id);
  }
  
  async createPromptHistory(insertHistory: InsertPromptHistory): Promise<PromptHistory> {
    const id = this.promptHistoryId++;
    const now = new Date().toISOString();
    const history: PromptHistory = { ...insertHistory, id, created_at: now };
    this.promptHistory.set(id, history);
    return history;
  }

  // Initialize with example templates
  private initializeTemplates() {
    const templates: InsertTemplate[] = [
      {
        title: "Expert Chain-of-Thought",
        description: "For complex reasoning tasks requiring domain expertise",
        content: `As an expert in [DOMAIN], solve the following problem using rigorous step-by-step reasoning:

[PROBLEM]

To solve this, I'll think through it systematically:
1. First, I'll identify the key elements...
2. Next, I'll analyze how these elements relate...
3. Then, I'll apply the relevant principles...
4. Finally, I'll derive the solution by...`,
        tags: ["Chain-of-Thought", "Expert Role"],
      },
      {
        title: "Information Extraction",
        description: "For extracting structured data from text",
        content: `Extract the following entities from the text below in JSON format:
- [ENTITY_1]
- [ENTITY_2]
- [ENTITY_3]

Example 1:
"[EXAMPLE_TEXT_1]"
{
  "entity_1": "[EXTRACTED_VALUE]",
  "entity_2": "[EXTRACTED_VALUE]",
  "entity_3": "[EXTRACTED_VALUE]"
}

Now extract from this text:
"[INPUT_TEXT]"`,
        tags: ["Few-Shot", "Structured Output"],
      },
      {
        title: "Comparative Analysis",
        description: "For analyzing differences between concepts",
        content: `Analyze the similarities and differences between [CONCEPT_A] and [CONCEPT_B] using the following structured format:

1. Key Similarities:
   - Consider shared principles
   - Identify common applications
   - Note historical connections

2. Important Differences:
   - Examine foundational approaches
   - Compare technical implementations
   - Contrast practical limitations

3. Synthesis:
   - Explain how they complement each other
   - Identify potential integration points`,
        tags: ["Analytical", "Structured"],
      },
      {
        title: "Code Debugging Assistant",
        description: "For systematic code review and debugging",
        content: `Review the following code and identify any bugs, inefficiencies, or improvements. Proceed systematically:

\`\`\`[LANGUAGE]
[CODE]
\`\`\`

Please provide your analysis in this format:
1. Issues Identified:
   - [Issue 1]: [Brief description]
   - [Issue 2]: [Brief description]

2. Recommended Fixes:
\`\`\`[LANGUAGE]
[CORRECTED CODE SNIPPET 1]
\`\`\`

3. Optimizations:
   - [Suggestion 1]
   - [Suggestion 2]

4. Best Practices:
   - [Recommendation 1]
   - [Recommendation 2]`,
        tags: ["Code", "Debugging"],
      },
      {
        title: "Role-Based Persona",
        description: "For responses from a specific expert perspective",
        content: `You are an experienced [PROFESSION/ROLE] with expertise in [SPECIFIC_DOMAIN]. Your communication style is [STYLE_DESCRIPTION].

I need your professional perspective on the following situation:

[SITUATION/QUESTION]

In your response:
- Draw on your [PROFESSION/ROLE] expertise
- Consider important factors such as [FACTOR_1], [FACTOR_2]
- Provide practical, actionable advice based on best practices in [SPECIFIC_DOMAIN]
- Include any relevant [TOOLS/METHODS/FRAMEWORKS] that would be helpful`,
        tags: ["Role-Play", "Expert"],
      },
      {
        title: "Task Decomposition",
        description: "For breaking down complex problems into manageable steps",
        content: `I need to accomplish the following complex task: [TASK_DESCRIPTION]

Please help me break this down into smaller, manageable subtasks. For each subtask:

1. Provide a clear objective
2. List the resources or information needed
3. Highlight potential challenges
4. Suggest an approach or methodology
5. Indicate how to verify completion

Organize these in a logical sequence, indicating dependencies between subtasks where they exist.`,
        tags: ["Problem-Solving", "Structured"],
      }
    ];

    templates.forEach(template => {
      this.createTemplate(template);
    });
  }
}

export const storage = new MemStorage();
