import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from 'react';
import { ThemeProvider } from "./context/ThemeContext";
import { supabase } from './lib/supabaseClient';
import type { Session } from '@supabase/supabase-js';
import { BackToTop } from "@/components/BackToTop";
import { LanguageProvider } from "./context/LanguageContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/ThemeToggle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ModernServices from "./components/ModernServices";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import AtoutsPage from "./pages/AtoutsPage";
import TeamPage from "./pages/TeamPage";
import NotFound from "./pages/NotFound";
import { default as AdminPage } from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ThemeProvider>
        <LanguageProvider>
        <BrowserRouter>
          <ThemeToggle className="hidden md:block" />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/test-design" element={<ModernServices />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/nos-atouts" element={<AtoutsPage />} />
            <Route path="/equipe" element={<TeamPage />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </LanguageProvider>
      </ThemeProvider>
    </TooltipProvider>
    <BackToTop />
  </QueryClientProvider>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Erreur de vérification d\'authentification:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
    
    // Écoute les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
      }
    );
    
    return () => subscription?.unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <p>Vérification de l'authentification...</p>
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default App;
