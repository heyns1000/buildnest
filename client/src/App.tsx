import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";
import MandibaOverlay from "@/components/MandibaOverlay";
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
  const [showMandiba, setShowMandiba] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <MandibaOverlay 
          isVisible={showMandiba} 
          onComplete={() => setShowMandiba(false)} 
        />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
