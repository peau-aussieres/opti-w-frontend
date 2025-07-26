import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import { 
  Users, 
  Gift, 
  TrendingUp, 
  Mail, 
  Phone, 
  MessageSquare, 
  Loader2,
  CheckCircle,
  Clock,
  XCircle,
  Eye
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import { referralService } from '../lib/api';
import { motion } from 'framer-motion';
import '../App.css';

const inviteSchema = z.object({
  referred_email: z.string().email('Adresse email invalide'),
  referred_name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  referred_phone: z.string().optional(),
  custom_message: z.string().optional(),
});

const DashboardPage = () => {
  const { user } = useAuth();
  const [referrals, setReferrals] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(inviteSchema),
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [referralsResponse, statsResponse] = await Promise.all([
        referralService.getMyReferrals(),
        referralService.getStats()
      ]);
      
      setReferrals(referralsResponse.data.referrals);
      setStats({
        ...statsResponse.data.stats,
        total_rewards: referralsResponse.data.total_rewards
      });
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    setMessage('');

    try {
      const response = await referralService.create(data);
      
      if (response.data) {
        setMessage('Invitation envoyée avec succès !');
        reset();
        loadData(); // Recharger les données
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Erreur lors de l\'envoi de l\'invitation');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'En attente', variant: 'secondary', icon: Clock },
      sent: { label: 'Envoyée', variant: 'default', icon: Mail },
      clicked: { label: 'Consultée', variant: 'default', icon: Eye },
      converted: { label: 'Convertie', variant: 'default', icon: TrendingUp },
      validated: { label: 'Validée', variant: 'default', icon: CheckCircle },
      rejected: { label: 'Rejetée', variant: 'destructive', icon: XCircle },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <Icon className="w-3 h-3" />
        <span>{config.label}</span>
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold text-foreground">
            Bonjour {user?.first_name} !
          </h1>
          <p className="text-muted-foreground text-lg">
            Bienvenue dans votre espace parrain. Invitez vos amis et suivez vos gains.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invitations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.total || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Validées</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats?.validated || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats?.converted || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gains Totaux</CardTitle>
              <Gift className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats?.total_rewards || 0}€</div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire d'invitation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Inviter un ami</span>
                </CardTitle>
                <CardDescription>
                  Partagez notre boutique et gagnez 15€ par parrainage validé
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {message && (
                  <Alert variant={message.includes('succès') ? 'default' : 'destructive'}>
                    <AlertDescription>{message}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="referred_name">Nom de votre ami</Label>
                    <Input
                      id="referred_name"
                      placeholder="Jean Dupont"
                      {...register('referred_name')}
                    />
                    {errors.referred_name && (
                      <p className="text-sm text-destructive">{errors.referred_name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referred_email">Email</Label>
                    <Input
                      id="referred_email"
                      type="email"
                      placeholder="jean.dupont@email.com"
                      {...register('referred_email')}
                    />
                    {errors.referred_email && (
                      <p className="text-sm text-destructive">{errors.referred_email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referred_phone">Téléphone (optionnel)</Label>
                    <Input
                      id="referred_phone"
                      type="tel"
                      placeholder="+33 6 12 34 56 78"
                      {...register('referred_phone')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom_message">Message personnalisé (optionnel)</Label>
                    <Textarea
                      id="custom_message"
                      placeholder="Ajouter un message personnel..."
                      rows={3}
                      {...register('custom_message')}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Envoyer l'invitation
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tableau des parrainages */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Mes parrainages</CardTitle>
                <CardDescription>
                  Suivez le statut de vos invitations et vos gains
                </CardDescription>
              </CardHeader>
              <CardContent>
                {referrals.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Aucune invitation pour le moment
                    </h3>
                    <p className="text-muted-foreground">
                      Commencez par inviter vos premiers amis !
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ami invité</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {referrals.map((referral) => (
                          <TableRow key={referral.id}>
                            <TableCell className="font-medium">
                              {referral.referred_name || 'Non renseigné'}
                            </TableCell>
                            <TableCell>{referral.referred_email}</TableCell>
                            <TableCell>
                              {new Date(referral.created_at).toLocaleDateString('fr-FR')}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(referral.status)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

