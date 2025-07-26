import { useState, useEffect } from 'react';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { 
  Users, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Clock,
  Eye,
  Mail,
  Shield,
  BarChart3,
  Filter
} from 'lucide-react';
import { adminService } from '../lib/api';
import { motion } from 'framer-motion';
import '../App.css';

const AdminPage = () => {
  const [dashboard, setDashboard] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [actionType, setActionType] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [rewardAmount, setRewardAmount] = useState(15);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [dashboardResponse, referralsResponse] = await Promise.all([
        adminService.getDashboard(),
        adminService.getAllReferrals({ status: 'converted' })
      ]);
      
      setDashboard(dashboardResponse.data);
      setReferrals(referralsResponse.data.referrals);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    if (!selectedReferral || !actionType) return;

    setProcessing(true);
    try {
      if (actionType === 'validate') {
        await adminService.validateReferral(selectedReferral.id, {
          admin_notes: adminNotes,
          reward_amount: rewardAmount
        });
      } else if (actionType === 'reject') {
        await adminService.rejectReferral(selectedReferral.id, {
          admin_notes: adminNotes
        });
      }

      // Recharger les données
      await loadData();
      
      // Réinitialiser le formulaire
      setSelectedReferral(null);
      setActionType('');
      setAdminNotes('');
      setRewardAmount(15);
    } catch (error) {
      console.error('Erreur lors de l\'action:', error);
    } finally {
      setProcessing(false);
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
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              Administration
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Gérez le programme de parrainage et validez les récompenses.
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
              <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboard?.stats?.total_users || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Parrainages</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboard?.stats?.total_referrals || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {dashboard?.stats?.pending_referrals || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
              <BarChart3 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {dashboard?.stats?.conversion_rate?.toFixed(1) || 0}%
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Parrainages en attente de validation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Parrainages à valider</span>
              </CardTitle>
              <CardDescription>
                Validez ou rejetez les parrainages convertis pour attribuer les récompenses
              </CardDescription>
            </CardHeader>
            <CardContent>
              {referrals.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Aucun parrainage en attente
                  </h3>
                  <p className="text-muted-foreground">
                    Tous les parrainages ont été traités.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parrain</TableHead>
                        <TableHead>Filleul</TableHead>
                        <TableHead>Date de conversion</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {referrals.map((referral) => (
                        <TableRow key={referral.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {referral.users?.first_name} {referral.users?.last_name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {referral.users?.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {referral.referred_name || 'Non renseigné'}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {referral.referred_email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {referral.conversion_date ? 
                              new Date(referral.conversion_date).toLocaleDateString('fr-FR') : 
                              'Non converti'
                            }
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(referral.status)}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    size="sm" 
                                    onClick={() => {
                                      setSelectedReferral(referral);
                                      setActionType('validate');
                                    }}
                                  >
                                    Valider
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Valider le parrainage</DialogTitle>
                                    <DialogDescription>
                                      Confirmez la validation de ce parrainage et l'attribution de la récompense.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="reward_amount">Montant de la récompense (€)</Label>
                                      <Input
                                        id="reward_amount"
                                        type="number"
                                        value={rewardAmount}
                                        onChange={(e) => setRewardAmount(Number(e.target.value))}
                                        min="0"
                                        step="0.01"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="admin_notes">Notes (optionnel)</Label>
                                      <Textarea
                                        id="admin_notes"
                                        value={adminNotes}
                                        onChange={(e) => setAdminNotes(e.target.value)}
                                        placeholder="Ajouter des notes sur cette validation..."
                                        rows={3}
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button 
                                      onClick={handleAction}
                                      disabled={processing}
                                    >
                                      {processing ? 'Validation...' : 'Valider et attribuer la récompense'}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    size="sm" 
                                    variant="destructive"
                                    onClick={() => {
                                      setSelectedReferral(referral);
                                      setActionType('reject');
                                    }}
                                  >
                                    Rejeter
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Rejeter le parrainage</DialogTitle>
                                    <DialogDescription>
                                      Confirmez le rejet de ce parrainage. Cette action est irréversible.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="admin_notes_reject">Raison du rejet</Label>
                                      <Textarea
                                        id="admin_notes_reject"
                                        value={adminNotes}
                                        onChange={(e) => setAdminNotes(e.target.value)}
                                        placeholder="Expliquez la raison du rejet..."
                                        rows={3}
                                        required
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button 
                                      variant="destructive"
                                      onClick={handleAction}
                                      disabled={processing || !adminNotes.trim()}
                                    >
                                      {processing ? 'Rejet...' : 'Rejeter le parrainage'}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
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
  );
};

export default AdminPage;

