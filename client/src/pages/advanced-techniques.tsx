import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowRight, BookOpen, Lightbulb } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "@/components/code-block";
import AnalysisPanel from "@/components/analysis/analysis-panel";

export default function AdvancedTechniques() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Advanced Techniques Section */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-6">Advanced Prompting Techniques</h2>
        <p className="text-lg mb-6">
          Learn how to craft sophisticated prompts that yield precise, high-quality responses from LLMs. 
          These advanced techniques build upon fundamental principles and can dramatically improve your results.
        </p>
        
        <div className="flex flex-col md:flex-row mb-8 gap-4">
          <Card className="flex-1">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Lightbulb className="h-6 w-6 text-accent mr-2" />
                <h3 className="text-xl font-semibold">Chain-of-Thought Prompting</h3>
              </div>
              <p className="mb-4">
                Guide the model through a step-by-step reasoning process to solve complex problems and arrive at more accurate conclusions.
              </p>
              <Link href="#chain-of-thought">
                <Button variant="link" className="text-accent p-0">Learn more →</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="flex-1">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 text-accent mr-2" />
                <h3 className="text-xl font-semibold">Few-Shot Learning</h3>
              </div>
              <p className="mb-4">
                Provide multiple examples within your prompt to establish patterns that the model can then apply to new instances.
              </p>
              <Link href="#few-shot">
                <Button variant="link" className="text-accent p-0">Learn more →</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Chain of Thought Section */}
      <section id="chain-of-thought" className="mb-12 scroll-mt-16">
        <h3 className="text-2xl font-bold mb-4">Chain-of-Thought Prompting</h3>
        <p className="mb-6">
          Chain-of-Thought (CoT) prompting encourages the language model to break down complex problems into intermediate steps, 
          similar to how humans solve problems by "thinking aloud".
        </p>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h4 className="text-lg font-semibold mb-4">Why it works</h4>
            <p className="mb-4">When models verbalize their reasoning process step-by-step:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>They're less likely to make simple arithmetic or logical errors</li>
              <li>Intermediate steps serve as "checkpoints" that keep reasoning on track</li>
              <li>Complex problems become manageable when broken down</li>
              <li>The model can catch and correct its own mistakes</li>
            </ul>
          </CardContent>
        </Card>

        {/* Example Implementation */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-4">Implementation Example</h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="bg-primary text-white px-4 py-2 font-medium flex items-center rounded-t-lg">
                <BookOpen className="h-5 w-5 mr-2" />
                Standard Prompt
              </div>
              <CodeBlock 
                code="If I have 5 apples and give 2 to my friend, then buy 3 more, and eat 1, how many apples do I have left?"
                language="plaintext"
              />
              <div className="p-4 border-x border-b rounded-b-lg bg-white">
                <h5 className="font-medium text-gray-700 mb-2">Result:</h5>
                <p>You have 5 apples left.</p>
              </div>
            </div>
            
            <div>
              <div className="bg-primary text-white px-4 py-2 font-medium flex items-center rounded-t-lg">
                <Lightbulb className="h-5 w-5 mr-2" />
                Chain-of-Thought Prompt
              </div>
              <CodeBlock 
                code={`If I have 5 apples and give 2 to my friend, then buy 3 more, and eat 1, how many apples do I have left?

Let's solve this step-by-step:
1. Initial count: 5 apples
2. After giving 2 to friend: 5 - 2 = 3 apples
3. After buying 3 more: 3 + 3 = 6 apples
4. After eating 1: 6 - 1 = ? apples`}
                language="plaintext"
              />
              <div className="p-4 border-x border-b rounded-b-lg bg-white">
                <h5 className="font-medium text-gray-700 mb-2">Result:</h5>
                <p>
                  Following the steps:<br />
                  1. Initial count: 5 apples<br />
                  2. After giving 2 to friend: 5 - 2 = 3 apples<br />
                  3. After buying 3 more: 3 + 3 = 6 apples<br />
                  4. After eating 1: 6 - 1 = 5 apples<br /><br />
                  Therefore, you have 5 apples left.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tips */}
        <div className="bg-blue-50 border-l-4 border-accent p-5 rounded">
          <h4 className="font-semibold mb-2 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-accent" />
            Pro Tips
          </h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use explicit phrases like "Let's think step by step" or "Let's solve this systematically"</li>
            <li>For mathematical problems, encourage the model to work with equations</li>
            <li>For logical reasoning, ask the model to consider premises and implications individually</li>
            <li>When debugging code, ask the model to trace through execution line by line</li>
          </ul>
        </div>
      </section>

      {/* Few-Shot Learning Section */}
      <section id="few-shot" className="mb-12 scroll-mt-16">
        <h3 className="text-2xl font-bold mb-4">Few-Shot Learning</h3>
        <p className="mb-6">
          Few-shot learning leverages the model's ability to recognize patterns through examples. 
          By providing demonstrations of the desired input-output format, you can guide the model toward producing similar results.
        </p>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h4 className="text-lg font-semibold mb-4">When to use Few-Shot Prompting</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2">Most Effective For:</h5>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Formatting consistency requirements</li>
                  <li>Specialized tasks where instruction alone is ambiguous</li>
                  <li>Establishing a specific tone or writing style</li>
                  <li>Tasks requiring a specialized knowledge domain</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2">Less Necessary For:</h5>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Common tasks the model is already well-trained on</li>
                  <li>Simple instructions that are unambiguous</li>
                  <li>When you want the model to use its own judgment</li>
                  <li>When token limitations are a concern</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Example Implementation */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-4">Implementation Example</h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="bg-primary text-white px-4 py-2 font-medium flex items-center rounded-t-lg">
                <BookOpen className="h-5 w-5 mr-2" />
                Zero-Shot Prompt
              </div>
              <CodeBlock 
                code={`Extract the company name, position, and years of experience from this text:

"I've been working as a Senior Software Engineer at TechCorp for 5 years, focusing on backend development."`}
                language="plaintext"
              />
              <div className="p-4 border-x border-b rounded-b-lg bg-white">
                <h5 className="font-medium text-gray-700 mb-2">Result:</h5>
                <p>
                  Company name: TechCorp<br />
                  Position: Senior Software Engineer<br />
                  Years of experience: 5 years
                </p>
              </div>
            </div>
            
            <div>
              <div className="bg-primary text-white px-4 py-2 font-medium flex items-center rounded-t-lg">
                <Lightbulb className="h-5 w-5 mr-2" />
                Few-Shot Prompt
              </div>
              <CodeBlock 
                code={`Extract the company name, position, and years of experience from these texts in JSON format:

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
"I've been working as a Senior Software Engineer at TechCorp for 5 years, focusing on backend development."`}
                language="plaintext"
              />
              <div className="p-4 border-x border-b rounded-b-lg bg-white">
                <h5 className="font-medium text-gray-700 mb-2">Result:</h5>
                <pre className="code-font text-sm bg-gray-50 p-2 rounded">{`{
  "company": "TechCorp",
  "position": "Senior Software Engineer",
  "experience": 5
}`}</pre>
              </div>
            </div>
          </div>
        </div>
        
        {/* Try it yourself */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-4">Try It Yourself</h4>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">Create your own few-shot prompt for entity extraction. Use the playground to test it with Ollama.</p>
              <Link href="/playground">
                <Button className="bg-accent hover:bg-accent/90 text-white">
                  <ArrowRight className="h-5 w-5 mr-1" />
                  Open in Playground
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interactive Playground Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4">Interactive Playground</h3>
        <p className="mb-6">
          Test these advanced techniques with Ollama's models. Experiment with different prompting approaches and compare results.
        </p>
        
        <Card className="overflow-hidden">
          <Tabs defaultValue="cot">
            <div className="border-b">
              <TabsList className="px-4 pt-2">
                <TabsTrigger value="cot">Chain of Thought</TabsTrigger>
                <TabsTrigger value="few-shot">Few-Shot Learning</TabsTrigger>
                <TabsTrigger value="custom">Custom Template</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="cot" className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium text-gray-700">Prompt</label>
                      <div className="flex">
                        <Button variant="ghost" size="sm" className="text-sm text-gray-500 hover:text-gray-700 mr-3">Clear</Button>
                        <Button variant="ghost" size="sm" className="text-sm text-accent hover:text-blue-700">Load Template</Button>
                      </div>
                    </div>
                    <div className="border rounded-lg bg-gray-50 overflow-hidden">
                      <div className="flex items-center px-3 py-2 bg-gray-100 border-b">
                        <span className="text-sm font-medium text-gray-700">Edit Prompt</span>
                        <div className="ml-auto flex">
                          <Button variant="ghost" size="sm" className="p-1 rounded hover:bg-gray-200" title="Copy to clipboard">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                      <textarea 
                        className="w-full p-3 bg-gray-50 code-font text-sm min-h-[300px] focus:outline-none" 
                        placeholder="Enter your prompt here..."
                        defaultValue={`Solve the following problem by explaining each step of your reasoning:

Tom needs to buy 3 shirts costing $25 each and 2 pairs of pants costing $40 each. The store has a promotion where buying 3 or more items gives a 10% discount on the total purchase. Sales tax is 8%. 

How much will Tom pay in total?

Let's break this down step-by-step:`}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <label className="font-medium text-gray-700 mr-2">Model:</label>
                      <select className="border rounded p-1.5 text-sm">
                        <option>llama2:7b</option>
                        <option>mistral:7b</option>
                        <option>codellama:7b</option>
                      </select>
                    </div>
                    
                    <div>
                      <Button className="bg-secondary hover:bg-secondary/90 text-white">
                        <ArrowRight className="h-5 w-5 mr-1" />
                        Run
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="mb-2">
                    <label className="font-medium text-gray-700">Response</label>
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="flex items-center px-3 py-2 bg-gray-100 border-b">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-gray-700">llama2:7b</span>
                      </div>
                      <div className="ml-auto flex">
                        <Button variant="ghost" size="sm" className="p-1 rounded hover:bg-gray-200" title="Copy to clipboard">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1 rounded hover:bg-gray-200 ml-1" title="Save response">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 overflow-auto min-h-[300px]">
                      <p className="mb-2">I'll solve this step-by-step:</p>
                      
                      <p className="mb-2">1. First, let's calculate the cost of the shirts:<br />
                      3 shirts × $25 each = $75</p>
                      
                      <p className="mb-2">2. Next, let's calculate the cost of the pants:<br />
                      2 pairs of pants × $40 each = $80</p>
                      
                      <p className="mb-2">3. Now, let's find the subtotal before any discounts:<br />
                      $75 + $80 = $155</p>
                      
                      <p className="mb-2">4. Tom is buying 5 items total (3 shirts + 2 pants), which is more than the minimum 3 items required for the promotion, so he qualifies for the 10% discount.</p>
                      
                      <p className="mb-2">5. Let's calculate the discount amount:<br />
                      $155 × 10% = $155 × 0.1 = $15.50</p>
                      
                      <p className="mb-2">6. Now, let's subtract the discount from the subtotal to get the discounted price:<br />
                      $155 - $15.50 = $139.50</p>
                      
                      <p className="mb-2">7. Next, we need to calculate the sales tax (8%) on the discounted price:<br />
                      $139.50 × 8% = $139.50 × 0.08 = $11.16</p>
                      
                      <p className="mb-2">8. Finally, we add the sales tax to the discounted price to get the total amount Tom will pay:<br />
                      $139.50 + $11.16 = $150.66</p>
                      
                      <p className="font-medium">Therefore, Tom will pay a total of $150.66.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="few-shot" className="px-6">
              <p className="py-6">Select the Few-Shot Learning tab to try examples of few-shot prompting patterns.</p>
            </TabsContent>

            <TabsContent value="custom" className="px-6">
              <p className="py-6">Create your own custom prompt template and test it here.</p>
            </TabsContent>
          </Tabs>
          
          {/* Analysis Panel */}
          <div className="border-t p-6 bg-gray-50">
            <AnalysisPanel 
              scores={{ 
                effectiveness: 9.2, 
                coherence: "Excellent", 
                coherenceScore: 92,
                techniques: ["Chain-of-Thought", "Step-by-Step"]
              }} 
            />
          </div>
        </Card>
      </section>
    </div>
  );
}
