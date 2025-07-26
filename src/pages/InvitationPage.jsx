import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { 
  Gift, 
  ExternalLink, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Heart
} from 'lucide-react';
import { publicService } from '../lib/api';
import { motion } from 'framer-motion';
import '../App.css';

const InvitationPage = () => {
  const { uniqueId } = useParams();
  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [converted, setConverted] = useState(false);

  useEffect(() => {
    loadInvitation();
  }, [uniqueId]);

  const loadInvitation = async () => {
    try {
      const response = await publicService.getInvitationDetails(uniqueId);
      setInvitation(response.data);
    } catch (error) {
      setError(error.response?.data?.error || 'Invitation non trouvée');
    } finally {
      setLoading(false);
    }
  };

  const handleConvert = async () => {
    try {
      await publicService.convertInvitation(uniqueId);
      setConverted(true);
    } catch (error) {
      console.error('Erreur lors de la conversion:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-destructive/5 via-background to-secondary/10 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl border-destructive/20">
            <CardContent className="pt-6 text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Invitation non valide
                </h2>
                <p className="text-muted-foreground mb-4">
                  {error}
                </p>
                <Button asChild>
                  <Link to="/">
                    Retour à l'accueil
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (converted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-secondary/10 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl border-green-200">
            <CardContent className="pt-6 text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Merci !
                </h2>
                <p className="text-muted-foreground mb-4">
                  Votre action a été enregistrée. {invitation?.referral?.referrer_name} sera 
                  récompensé une fois votre parrainage validé.
                </p>
                <Button asChild>
                  <Link to="/">
                    Découvrir notre boutique
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const expiresAt = new Date(invitation?.referral?.expires_at);
  const daysLeft = Math.ceil((expiresAt - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            {/* Header avec nom du parrain */}
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Heart className="w-6 h-6 text-red-500" />
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  Invitation spéciale
                </Badge>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                <span className="text-primary">{invitation?.referral?.referrer_name}</span>
                <br />
                vous invite à découvrir
                <br />
                <span className="text-primary">Opti-w</span>
              </h1>
              
              {invitation?.referral?.custom_message && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 max-w-2xl mx-auto">
                  <p className="text-lg italic text-muted-foreground">
                    "{invitation.referral.custom_message}"
                  </p>
                </div>
              )}
            </div>

            {/* Offre spéciale */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl p-8 border max-w-2xl mx-auto"
            >
              <div className="space-y-6">
                <div className="text-center">
                  <Gift className="mx-auto w-12 h-12 text-primary mb-4" />
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    Offre Exclusive
                  </h2>
                  <p className="text-muted-foreground">
                    Profitez d'une réduction spéciale sur votre première commande
                  </p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
                  <div className="text-5xl font-bold text-primary mb-2">
                    -{invitation?.offer?.percentage || 15}%
                  </div>
                  <div className="text-lg text-muted-foreground">
                    {invitation?.offer?.text || 'Sur votre première commande'}
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full text-lg py-6"
                    onClick={handleConvert}
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Profiter de l'offre
                  </Button>
                  
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>
                      Offre valable encore {daysLeft} jour{daysLeft > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Avantages */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            >
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Qualité garantie</h3>
                <p className="text-sm text-muted-foreground">
                  Produits sélectionnés avec soin
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Livraison rapide</h3>
                <p className="text-sm text-muted-foreground">
                  Expédition sous 24h
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Service client</h3>
                <p className="text-sm text-muted-foreground">
                  Support 7j/7
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Cette invitation vous a été envoyée par {invitation?.referral?.referrer_name}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            © 2025 Opti-w. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default InvitationPage;

