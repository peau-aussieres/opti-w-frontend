import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Loader2, Mail, Lock, User, Phone, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import { motion } from 'framer-motion';
import '../App.css';

const registerSchema = z.object({
  first_name: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  last_name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone_number: z.string().optional(),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');

    try {
      const { confirmPassword, ...userData } = data;
      const result = await registerUser(userData);
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Une erreur inattendue s\'est produite');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl border-0 text-center">
            <CardContent className="pt-6 space-y-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Inscription réussie !
                </h2>
                <p className="text-muted-foreground">
                  Votre compte a été créé avec succès. Vous allez être redirigé vers la page de connexion.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        {/* Back to home */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à l'accueil</span>
            </Link>
          </Button>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">O</span>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Devenir Parrain</CardTitle>
              <CardDescription className="text-base">
                Créez votre compte et commencez à gagner des récompenses
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">Prénom</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="first_name"
                      placeholder="Jean"
                      className="pl-10"
                      {...register('first_name')}
                    />
                  </div>
                  {errors.first_name && (
                    <p className="text-sm text-destructive">{errors.first_name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last_name">Nom</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="last_name"
                      placeholder="Dupont"
                      className="pl-10"
                      {...register('last_name')}
                    />
                  </div>
                  {errors.last_name && (
                    <p className="text-sm text-destructive">{errors.last_name.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="jean.dupont@email.com"
                    className="pl-10"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone_number">Téléphone (optionnel)</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone_number"
                    type="tel"
                    placeholder="+1 416 555 1234"
                    className="pl-10"
                    {...register('phone_number')}
                  />
                </div>
                {errors.phone_number && (
                  <p className="text-sm text-destructive">{errors.phone_number.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    {...register('password')}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    {...register('confirmPassword')}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Création du compte...
                  </>
                ) : (
                  'Créer mon compte'
                )}
              </Button>
            </form>

            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Déjà parrain ?
                  </span>
                </div>
              </div>

              <Button variant="outline" asChild className="w-full" size="lg">
                <Link to="/login">
                  Se connecter
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            En créant un compte, vous acceptez nos{' '}
            <Link to="/terms" className="text-primary hover:underline">
              conditions d'utilisation
            </Link>{' '}
            et notre{' '}
            <Link to="/privacy" className="text-primary hover:underline">
              politique de confidentialité
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;

