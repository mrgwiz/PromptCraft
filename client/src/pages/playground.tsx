import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest } from "@/lib/queryClient";
import PromptEditor from "@/components/playground/prompt-editor";
import ResponseDisplay from "@/components/playground/response-display";
import AnalysisPanel from "@/components/analysis/analysis-panel";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Loader2 } from "lucide-react";

export default function Playground() {
  const [prompt, setPrompt] = useState(`Explain the concept of prompt engineering in simple terms.`);
  const [model, setModel] = useState("llama2:7b");
  const [response, setResponse] = useState("");
  const { toast } = useToast();

  // Get available models
  const { data: models = [] } = useQuery({
    queryKey: ["/api/ollama/models"],
    onError: (error) => {
      toast({
        title: "Error loading models",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Generate completion
  const { mutate: generateCompletion, isPending } = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/ollama/generate", {
        model,
        prompt,
      });
      return res.json();
    },
    onSuccess: (data) => {
      setResponse(data.response);
    },
    onError: (error) => {
      toast({
        title: "Error generating response",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Template options for common prompt patterns
  const templates = {
    simple: "Explain the concept of prompt engineering in simple terms.",
    cot: `Solve the following problem by explaining each step of your reasoning:

Tom needs to buy 3 shirts costing $25 each and 2 pairs of pants costing $40 each. The store has a promotion where buying 3 or more items gives a 10% discount on the total purchase. Sales tax is 8%. 

How much will Tom pay in total?

Let's break this down step-by-step:`,
    fewshot: `Extract the company name, position, and years of experience from these texts in JSON format:

Example 1:
Text: "I've been a Marketing Director at GlobalMedia for 3 years, specializing in digital campaigns."
Output: {
  "company": "GlobalMedia",
  "position": "Marketing Director",
  "experience": 3
}

Example 2:
Text: "Before joining DataSystems as a Data Analyst last year, I worked in finance."
Output: {
  "company": "DataSystems",
  "position": "Data Analyst",
  "experience": 1
}

Now extract from this text:
"I've been working as a Senior Software Engineer at TechCorp for 5 years, focusing on backend development."`,
  };

  const loadTemplate = (template) => {
    setPrompt(templates[template]);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Prompt Playground</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Test different prompting techniques with Ollama's models and see the results in real-time.
        </p>

        <Card className="overflow-hidden">
          <Tabs defaultValue="editor">
            <div className="border-b">
              <TabsList className="px-4 pt-2">
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="editor" className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <PromptEditor
                    value={prompt}
                    onChange={setPrompt}
                    onClear={() => setPrompt("")}
                    onLoadTemplate={() => {
                      toast({
                        title: "Templates",
                        description: "Select a template from the Templates tab",
                      });
                    }}
                  />

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <label className="font-medium text-gray-700 mr-2">Model:</label>
                      <Select
                        value={model}
                        onValueChange={setModel}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                        <SelectContent>
                          {models.length > 0 ? (
                            models.map((m) => (
                              <SelectItem key={m} value={m}>{m}</SelectItem>
                            ))
                          ) : (
                            <SelectItem value="llama2:7b">llama2:7b</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      className="bg-secondary hover:bg-secondary/90 text-gray-900"
                      onClick={() => generateCompletion()}
                      disabled={isPending || !prompt.trim()}
                    >
                      {isPending ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <ArrowRight className="h-4 w-4 mr-2" />
                      )}
                      Run
                    </Button>
                  </div>
                </div>

                <div className="flex-1">
                  <ResponseDisplay
                    model={model}
                    response={response}
                    loading={isPending}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="cursor-pointer hover:border-accent" onClick={() => loadTemplate("simple")}>
                  <div className="p-4 border-b">
                    <h4 className="font-semibold">Simple Query</h4>
                    <p className="text-sm text-muted-foreground">Basic informational prompt</p>
                  </div>
                  <div className="p-4 bg-gray-50 h-32 overflow-hidden text-sm">
                    <p className="line-clamp-6">{templates.simple}</p>
                  </div>
                </Card>

                <Card className="cursor-pointer hover:border-accent" onClick={() => loadTemplate("cot")}>
                  <div className="p-4 border-b">
                    <h4 className="font-semibold">Chain of Thought</h4>
                    <p className="text-sm text-muted-foreground">Step-by-step reasoning</p>
                  </div>
                  <div className="p-4 bg-gray-50 h-32 overflow-hidden text-sm">
                    <p className="line-clamp-6">{templates.cot.substring(0, 200)}...</p>
                  </div>
                </Card>

                <Card className="cursor-pointer hover:border-accent" onClick={() => loadTemplate("fewshot")}>
                  <div className="p-4 border-b">
                    <h4 className="font-semibold">Few-Shot Learning</h4>
                    <p className="text-sm text-muted-foreground">Example-based prompt</p>
                  </div>
                  <div className="p-4 bg-gray-50 h-32 overflow-hidden text-sm">
                    <p className="line-clamp-6">{templates.fewshot.substring(0, 200)}...</p>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history" className="p-6">
              <p className="text-muted-foreground">Your prompt history will appear here.</p>
            </TabsContent>
          </Tabs>

          {response && (
            <div className="border-t p-6 bg-gray-50">
              <AnalysisPanel 
                scores={{ 
                  effectiveness: 8.5, 
                  coherence: "Good", 
                  coherenceScore: 85,
                  techniques: ["Zero-Shot", "Instructional"]
                }} 
              />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
