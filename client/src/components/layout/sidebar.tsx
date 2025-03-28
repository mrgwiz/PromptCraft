import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Code,
  FileText,
  Home,
  LightbulbIcon,
  PlayCircle,
  LayoutList,
  CheckCircle,
  BookOpenCheck,
  BarChart2,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function Sidebar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Check Ollama connection status
  const { data: status, isLoading } = useQuery({
    queryKey: ["/api/ollama/status"],
    refetchInterval: 60000, // Check every minute
  });

  const isConnected = status?.connected;

  const navItems = [
    {
      section: "Learn",
      items: [
        { name: "Home", path: "/", icon: <Home className="h-4 w-4 mr-2" /> },
        { name: "Getting Started", path: "/", icon: <BookOpen className="h-4 w-4 mr-2" /> },
        { name: "Fundamentals", path: "/fundamentals", icon: <BookOpenCheck className="h-4 w-4 mr-2" /> },
        { name: "Best Practices", path: "/best-practices", icon: <CheckCircle className="h-4 w-4 mr-2" /> },
        { name: "Advanced Techniques", path: "/advanced-techniques", icon: <LightbulbIcon className="h-4 w-4 mr-2" /> },
      ],
    },
    {
      section: "Practice",
      items: [
        { name: "Playground", path: "/playground", icon: <PlayCircle className="h-4 w-4 mr-2" /> },
        { name: "Templates", path: "/templates", icon: <LayoutList className="h-4 w-4 mr-2" /> },
        { name: "Analysis", path: "#analysis", icon: <BarChart2 className="h-4 w-4 mr-2" /> },
      ],
    },
    {
      section: "Resources",
      items: [
        { 
          name: "Ollama Docs", 
          path: "https://ollama.ai/docs", 
          icon: <FileText className="h-4 w-4 mr-2" />,
          external: true
        },
        { 
          name: "Community", 
          path: "https://github.com/ollama/ollama", 
          icon: <Code className="h-4 w-4 mr-2" />,
          external: true
        },
      ],
    },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile menu button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="lg:hidden fixed top-4 left-4 z-50 bg-background"
        onClick={toggleSidebar}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <nav className={cn(
        "w-full lg:w-64 bg-primary text-white flex-shrink-0 overflow-y-auto lg:h-screen z-40",
        "fixed lg:static top-0 left-0 h-screen transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">PromptCraft</h1>
          <p className="text-sm text-gray-400">Master LLM Prompting</p>
        </div>

        {navItems.map((section) => (
          <div key={section.section} className="py-2">
            <p className="px-4 py-2 text-sm text-gray-400 uppercase font-medium">{section.section}</p>
            {section.items.map((item) => (
              item.external ? (
                <a 
                  key={item.name}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 hover:bg-gray-800 text-white"
                >
                  {item.icon}
                  {item.name}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              ) : (
                <Link key={item.name} href={item.path}>
                  <a 
                    className={cn(
                      "flex items-center px-4 py-2 hover:bg-gray-800 text-white",
                      location === item.path && "bg-gray-700"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </a>
                </Link>
              )
            ))}
          </div>
        ))}

        <div className="mt-auto p-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className={`w-2 h-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'} rounded-full mr-2`}></div>
            <span className="text-sm">
              {isLoading ? "Checking Ollama..." : (isConnected ? "Ollama: Connected" : "Ollama: Disconnected")}
            </span>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
