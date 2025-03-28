import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, CheckCircle, AlertTriangle } from "lucide-react";
import CodeBlock from "@/components/code-block";

export default function Fundamentals() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-6">Prompt Engineering Fundamentals</h2>
        <p className="text-lg mb-6">
          Prompt engineering is the process of crafting inputs for language models to generate desired outputs. 
          Understanding these fundamentals will help you create more effective prompts.
        </p>
      </div>

      {/* Key Concepts Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4">Key Concepts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 text-accent mr-2" />
                <h4 className="text-xl font-semibold">Context and Specificity</h4>
              </div>
              <p className="mb-4">
                LLMs respond based on the context provided in your prompt. The more specific and detailed your prompt, 
                the more aligned the response will be with your expectations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 text-accent mr-2" />
                <h4 className="text-xl font-semibold">Intent Clarity</h4>
              </div>
              <p className="mb-4">
                Clearly communicate what you want the model to do. Be explicit about the format, style, and content 
                you expect in the response.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Basic Prompting Techniques Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4">Basic Prompting Techniques</h3>
        
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4">Zero-Shot Prompting</h4>
          <p className="mb-4">
            The simplest form of prompting where you directly ask the model to perform a task without providing examples.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="bg-primary text-white px-4 py-2 font-medium flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Example: Zero-Shot Prompting
            </div>
            <CodeBlock 
              code={`Explain the concept of prompt engineering in simple terms.`}
              language="plaintext"
            />
          </div>
          
          <div className="flex items-start mb-6">
            <CheckCircle className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">Best for:</p>
              <p>Simple, straightforward tasks where the instruction is clear and unambiguous.</p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4">Role Prompting</h4>
          <p className="mb-4">
            Instructing the model to assume a specific role or persona to guide its response style and expertise level.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="bg-primary text-white px-4 py-2 font-medium flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Example: Role Prompting
            </div>
            <CodeBlock 
              code={`As an experienced software engineer, explain the concept of dependency injection and provide a simple code example.`}
              language="plaintext"
            />
          </div>
          
          <div className="flex items-start mb-6">
            <CheckCircle className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">Best for:</p>
              <p>Tasks requiring expertise in specific domains or a particular tone/style of communication.</p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4">Instruction Prompting</h4>
          <p className="mb-4">
            Providing explicit instructions about the format, style, or approach you want the model to use.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="bg-primary text-white px-4 py-2 font-medium flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Example: Instruction Prompting
            </div>
            <CodeBlock 
              code={`Write a brief summary of quantum computing. Use simple language, limit to 3 paragraphs, and include one analogy to help beginners understand.`}
              language="plaintext"
            />
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">Best for:</p>
              <p>When you need specific format, length, or style requirements in the response.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4">Common Mistakes to Avoid</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-50 p-5 rounded-lg border-l-4 border-red-500">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Vague Instructions</h4>
                <p>Providing unclear or ambiguous instructions leads to unpredictable outputs.</p>
                <div className="mt-2">
                  <p className="font-medium text-red-600 text-sm">Example:</p>
                  <p className="text-sm italic">"Tell me about stuff."</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 p-5 rounded-lg border-l-4 border-red-500">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Overloading with Information</h4>
                <p>Including too much irrelevant information can confuse the model.</p>
                <div className="mt-2">
                  <p className="font-medium text-red-600 text-sm">Example:</p>
                  <p className="text-sm italic">"I'm a student who likes basketball and my favorite color is blue and I have a dog named Max and yesterday I went shopping and..."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section>
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h3 className="text-2xl font-bold mb-4">Ready to Learn More?</h3>
          <p className="mb-6">
            Now that you understand the basics, explore our advanced techniques to create even more effective prompts for complex tasks.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/advanced-techniques">
              <Button className="bg-accent hover:bg-accent/90 text-white">
                Advanced Techniques
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/playground">
              <Button variant="outline">
                Try in Playground
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
