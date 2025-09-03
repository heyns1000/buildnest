import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";
import EngineEntry from "@/components/EngineEntry";
import { useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showEngineEntry, setShowEngineEntry] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <EngineEntry 
          isVisible={showEngineEntry} 
          onComplete={() => setShowEngineEntry(false)} 
        />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
