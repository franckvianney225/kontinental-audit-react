import { useState } from 'react';
import { toast } from '../components/ui/use-toast';
import { Lock, Mail, Eye, EyeOff, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { supabase } from '../lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.session) {
        toast({
          title: 'Connexion réussie',
          description: 'Redirection vers l\'espace admin...',
          variant: 'default'
        });
        console.log('Session valide, tentative de redirection...');
        try {
          // Rafraîchir la session avant redirection
          await supabase.auth.getSession();
          setTimeout(() => {
            console.log('Exécution de la redirection');
            navigate('/admin', { replace: true });
          }, 1500);
        } catch (err) {
          console.error('Erreur de redirection:', err);
          setError('Erreur lors de la redirection');
        }
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-4 relative overflow-hidden">
      {/* Éléments décoratifs de fond */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDEwIDAgTCAwIDAgMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      
      <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-white/10 border-white/20 shadow-2xl">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Espace Administration
          </CardTitle>
          <p className="text-gray-300 mt-2">Connectez-vous pour accéder au tableau de bord</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {error && (
            <div className="mb-4 p-4 bg-red-500/20 text-red-200 rounded-lg border border-red-500/30 backdrop-blur-sm animate-fade-in">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200 font-medium">
                Adresse e-mail
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-emerald-400 transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@kontinental.com"
                  className="pl-11 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all duration-200 h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200 font-medium">
                Mot de passe
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-emerald-400 transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-11 pr-11 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all duration-200 h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Connexion en cours...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <LogIn className="w-5 h-5" />
                  <span>Se connecter</span>
                </div>
              )}
            </Button>
          </form>

          <div className="text-center pt-4">
            <p className="text-gray-400 text-sm">
              Accès sécurisé • Chiffrement SSL
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}