import { ReactNode } from "react";
import Sidebar from "./sidebar";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MainLayoutProps {
  children: ReactNode;
}

function getPageTitle(location: string): string {
  switch (location) {
    case "/":
      return "Home";
    case "/fundamentals":
      return "Prompt Engineering Fundamentals";
    case "/best-practices":
      return "Best Practices";
    case "/advanced-techniques":
      return "Advanced Techniques";
    case "/playground":
      return "Playground";
    case "/templates":
      return "Template Library";
    default:
      return "PromptCraft";
  }
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [location] = useLocation();
  const pageTitle = getPageTitle(location);

  return (
    <div className="flex flex-col h-screen lg:flex-row">
      <Sidebar />
      
      <main className="flex-1 overflow-auto bg-background">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold ml-10 lg:ml-0">{pageTitle}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Input
                  type="text"
                  placeholder="Search documentation..."
                  className="pl-10 pr-4 py-2 w-64"
                />
                <Search className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
              </div>
              {location !== "/playground" && (
                <Link href="/playground">
                  <Button className="hidden md:flex bg-accent hover:bg-accent/90 text-white">
                    <ArrowRight className="h-5 w-5 mr-1" />
                    Try in Playground
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        {children}
      </main>
    </div>
  );
}
