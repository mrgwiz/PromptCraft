import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AdvancedTechniques from "@/pages/advanced-techniques";
import Fundamentals from "@/pages/fundamentals";
import Playground from "@/pages/playground";
import Templates from "@/pages/templates";
import BestPractices from "@/pages/best-practices";
import MainLayout from "@/components/layout/main-layout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/advanced-techniques" component={AdvancedTechniques} />
      <Route path="/fundamentals" component={Fundamentals} />
      <Route path="/playground" component={Playground} />
      <Route path="/templates" component={Templates} />
      <Route path="/best-practices" component={BestPractices} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Router />
      </MainLayout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
