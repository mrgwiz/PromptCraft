import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Code, Lightbulb, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to PromptCraft</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Master the art of crafting effective prompts for Large Language Models and experiment with Ollama integration.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/playground">
            <Button className="bg-accent hover:bg-accent/90 text-white">
              Try the Playground
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/fundamentals">
            <Button variant="outline">
              Learn the Fundamentals
              <BookOpen className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardContent className="pt-6">
            <div className="flex mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
            <p className="text-muted-foreground">
              Comprehensive guides on prompt engineering fundamentals and advanced techniques.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Code className="h-6 w-6 text-secondary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Hands-on Practice</h3>
            <p className="text-muted-foreground">
              Test your prompts directly with Ollama's models and see results in real-time.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Lightbulb className="h-6 w-6 text-purple-700" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Template Library</h3>
            <p className="text-muted-foreground">
              Browse and use a growing collection of effective prompt templates.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-12">
        <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <span className="bg-accent text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">1</span>
              Learn the Basics
            </h3>
            <p className="mb-4 text-muted-foreground">
              Start with our fundamentals section to understand key concepts behind effective prompt engineering.
            </p>
            <Link href="/fundamentals">
              <Button variant="outline" size="sm" className="mt-2">
                Explore Fundamentals
              </Button>
            </Link>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <span className="bg-accent text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">2</span>
              Practice with Ollama
            </h3>
            <p className="mb-4 text-muted-foreground">
              Visit the playground to experiment with different prompting techniques using Ollama's models.
            </p>
            <Link href="/playground">
              <Button variant="outline" size="sm" className="mt-2">
                Open Playground
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-primary text-white rounded-lg p-8 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
          <p className="text-gray-300">
            Dive into the interactive playground and start crafting effective prompts today.
          </p>
        </div>
        <Link href="/playground">
          <Button className="bg-white text-primary hover:bg-gray-100">
            Try the Playground
            <Zap className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
