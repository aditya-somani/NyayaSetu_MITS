
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Complaints from "./pages/Complaints";
import Legal from "./pages/Legal";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthSelection from "./pages/auth/AuthSelection";
import UserLogin from "./pages/auth/user/UserLogin";
import UserRegister from "./pages/auth/user/UserRegister";
import LawyerLogin from "./pages/auth/lawyer/LawyerLogin";
import LawyerRegister from "./pages/auth/lawyer/LawyerRegister";
import EmployeeLogin from "./pages/auth/employee/EmployeeLogin";
import AdminLogin from "./pages/auth/admin/AdminLogin";
import NotFound from "./pages/NotFound";
import Chatbot from "./components/Chatbot";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/complaints/new" element={<Complaints />} />
          <Route path="/legal" element={<Legal />} />
          
          {/* Auth Routes */}
          <Route path="/auth" element={<AuthSelection />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          
          {/* User Auth Routes */}
          <Route path="/auth/user/login" element={<UserLogin />} />
          <Route path="/auth/user/register" element={<UserRegister />} />
          
          {/* Lawyer Auth Routes */}
          <Route path="/auth/lawyer/login" element={<LawyerLogin />} />
          <Route path="/auth/lawyer/register" element={<LawyerRegister />} />
          
          {/* Employee Auth Routes */}
          <Route path="/auth/employee/login" element={<EmployeeLogin />} />
          
          {/* Admin Auth Routes */}
          <Route path="/auth/admin/login" element={<AdminLogin />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Global Chatbot - appears on every page */}
        <Chatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
