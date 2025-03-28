import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, AlertTriangle, Lightbulb, ThumbsUp, ThumbsDown } from "lucide-react";
import CodeBlock from "@/components/code-block";

export default function BestPractices() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-6">Best Practices for Prompt Engineering</h2>
        <p className="text-lg mb-6">
          Effective prompt engineering combines both art and science. These best practices will help you craft prompts 
          that consistently produce high-quality outputs from language models.
        </p>
      </div>

      {/* General Best Practices Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">General Best Practices</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Check className="h-6 w-6 text-secondary mr-2 flex-shrink-0" />
                <h4 className="text-xl font-semibold">Be Specific and Clear</h4>
              </div>
              <p className="mb-4">
                Provide detailed instructions with clear expectations about the format, length, style, and content you want.
              </p>
              <div className="bg-gray-50 p-3 rounded-lg border text-sm">
                <p className="font-medium mb-1">Example:</p>
                <p className="text-muted-foreground">
                  "Write a 3-paragraph summary of quantum computing for high school students. Include a simple analogy in the first paragraph."
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Check className="h-6 w-6 text-secondary mr-2 flex-shrink-0" />
                <h4 className="text-xl font-semibold">Use Delimiters</h4>
              </div>
              <p className="mb-4">
                Clearly separate different parts of your prompt using delimiters like triple quotes, dashes, or brackets.
              </p>
              <div className="bg-gray-50 p-3 rounded-lg border text-sm">
                <p className="font-medium mb-1">Example:</p>
                <p className="text-muted-foreground">
                  "Summarize the following text: ```{'{content goes here}'}```"
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Check className="h-6 w-6 text-secondary mr-2 flex-shrink-0" />
                <h4 className="text-xl font-semibold">Specify the Context</h4>
              </div>
              <p className="mb-4">
                Provide relevant background information that helps the model understand the broader context of your request.
              </p>
              <div className="bg-gray-50 p-3 rounded-lg border text-sm">
                <p className="font-medium mb-1">Example:</p>
                <p className="text-muted-foreground">
                  "I'm planning a presentation for software developers who are new to machine learning. Given this audience, explain how neural networks work."
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Check className="h-6 w-6 text-secondary mr-2 flex-shrink-0" />
                <h4 className="text-xl font-semibold">Use System Instructions</h4>
              </div>
              <p className="mb-4">
                Begin prompts with high-level instructions about how the model should behave throughout the interaction.
              </p>
              <div className="bg-gray-50 p-3 rounded-lg border text-sm">
                <p className="font-medium mb-1">Example:</p>
                <p className="text-muted-foreground">
                  "You are a professional writing assistant that helps improve clarity and conciseness. Review this paragraph and suggest improvements: [paragraph]"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Examples: Before and After Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">Examples: Before and After</h3>
        
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
            Example 1: Improving a Vague Prompt
          </h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-2">
                <ThumbsDown className="h-5 w-5 mr-2 text-red-500" />
                <h5 className="font-medium">Before (Vague)</h5>
              </div>
              <CodeBlock 
                code="Tell me about machine learning."
                language="plaintext"
              />
              <div className="mt-2 text-muted-foreground text-sm">
                <p>This prompt is too broad and can lead to generic, unfocused responses that may not address what you actually want to know.</p>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <ThumbsUp className="h-5 w-5 mr-2 text-secondary" />
                <h5 className="font-medium">After (Specific)</h5>
              </div>
              <CodeBlock 
                code="Explain supervised learning in machine learning. Include:
1. A simple definition suitable for beginners
2. Two common algorithms (with a one-sentence explanation of each)
3. A real-world example application
Keep your response under 300 words."
                language="plaintext"
              />
              <div className="mt-2 text-muted-foreground text-sm">
                <p>This prompt clearly specifies the subtopic, structure, complexity level, and length, leading to a more useful response.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-xl font-semibold mb-4 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
            Example 2: Adding Context and Role
          </h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-2">
                <ThumbsDown className="h-5 w-5 mr-2 text-red-500" />
                <h5 className="font-medium">Before (No Context)</h5>
              </div>
              <CodeBlock 
                code="Write code to sort a list."
                language="plaintext"
              />
              <div className="mt-2 text-muted-foreground text-sm">
                <p>Without specifying language, requirements, or optimization priorities, the response could be in any programming language and may not meet your needs.</p>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <ThumbsUp className="h-5 w-5 mr-2 text-secondary" />
                <h5 className="font-medium">After (With Context and Role)</h5>
              </div>
              <CodeBlock 
                code="As a Python expert teaching beginners, write code to sort a list of integers in ascending order. Include:
1. The simplest built-in method
2. A brief explanation of how it works
3. An example with sample input and output
4. One common pitfall beginners should avoid

The code should follow PEP 8 style guidelines and include comments."
                language="plaintext"
              />
              <div className="mt-2 text-muted-foreground text-sm">
                <p>This prompt specifies the programming language, audience, exact task, format, style guidelines, and additional helpful elements.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Pitfalls Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">Common Pitfalls to Avoid</h3>
        
        <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded mb-6">
          <h4 className="font-semibold mb-2 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
            Overreliance on Specific Formatting Instructions
          </h4>
          <p className="mb-2">
            While formatting instructions are important, focusing too much on format at the expense of content quality can lead to shallow responses.
          </p>
          <div className="text-sm text-muted-foreground">
            <p><span className="font-medium">Better approach:</span> Balance format instructions with clear content expectations.</p>
          </div>
        </div>
        
        <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded mb-6">
          <h4 className="font-semibold mb-2 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
            Assuming the Model Understands Your Intent
          </h4>
          <p className="mb-2">
            Don't assume the model intuitively understands what you want or has the same context you do.
          </p>
          <div className="text-sm text-muted-foreground">
            <p><span className="font-medium">Better approach:</span> Be explicit about your requirements and provide necessary context.</p>
          </div>
        </div>
        
        <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded">
          <h4 className="font-semibold mb-2 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
            Writing Prompts That Are Too Rigid
          </h4>
          <p className="mb-2">
            Overly prescriptive prompts can limit the model's ability to provide valuable insights beyond what you explicitly asked for.
          </p>
          <div className="text-sm text-muted-foreground">
            <p><span className="font-medium">Better approach:</span> Find a balance between structure and flexibility.</p>
          </div>
        </div>
      </section>

      {/* Try in Playground Section */}
      <section>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-2xl font-bold mb-4">Apply What You've Learned</h3>
          <p className="mb-6">
            The best way to master prompt engineering is through practice. Head to our playground to experiment with these best practices and see the differences in responses.
          </p>
          <Link href="/playground">
            <Button className="bg-accent hover:bg-accent/90 text-white">
              Try in Playground
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
