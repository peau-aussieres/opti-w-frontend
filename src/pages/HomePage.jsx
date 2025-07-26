import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Users, Gift, TrendingUp, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import '../App.css';

const HomePage = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Invitez vos amis",
      description: "Partagez facilement nos lunettes avec vos proches grâce à votre lien unique."
    },
    {
      icon: <Gift className="w-8 h-8 text-primary" />,
      title: "Gagnez des récompenses",
      description: "Recevez 15€ de bon d'achat pour chaque ami qui effectue sa première commande."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Suivez vos gains",
      description: "Consultez en temps réel le statut de vos parrainages et vos récompenses."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Programme sécurisé",
      description: "Toutes vos données sont protégées et vos récompenses garanties."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Inscrivez-vous",
      description: "Créez votre compte parrain en quelques clics"
    },
    {
      number: "02", 
      title: "Invitez vos amis",
      description: "Partagez votre lien unique par email ou SMS"
    },
    {
      number: "03",
      title: "Ils découvrent",
      description: "Vos amis bénéficient d'une offre spéciale"
    },
    {
      number: "04",
      title: "Vous gagnez",
      description: "Recevez vos récompenses après validation"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <Badge variant="secondary" className="text-primary">
                  Programme de Parrainage Opti-W
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Partagez et 
                  <span className="text-primary"> gagnez</span> avec vos amis
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Invitez vos proches à découvrir notre sélection de lunettes de soleil et de vue, et recevez 15$ de récompense pour chaque nouveau client. Simple, rapide et avantageux !
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg px-8 py-6">
                  <Link to="/register">
                    Devenir Parrain
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6">
                  <Link to="/login">Se connecter</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Gratuit</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Sans engagement</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Récompenses garanties</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 border">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-foreground">Vos gains potentiels</h3>
                    <p className="text-muted-foreground">Calculez vos récompenses</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-3xl font-bold text-primary">15$</div>
                      <div className="text-sm text-muted-foreground">par parrainage</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">∞</div>
                      <div className="text-sm text-muted-foreground">invitations</div>
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Exemple : 5 amis =</div>
                    <div className="text-4xl font-bold text-primary">75$</div>
                    <div className="text-sm text-muted-foreground">de récompenses</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Pourquoi choisir notre programme ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un programme de parrainage simple, transparent et avantageux pour tous
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              4 étapes simples pour commencer à gagner des récompenses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                      {step.number}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border -translate-y-0.5"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold">
              Prêt à commencer votre aventure de parrainage ?
            </h2>
            <p className="text-xl opacity-90">
              Rejoignez des centaines de parrains qui gagnent déjà des récompenses 
              en partageant notre boutique avec leurs amis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
                <Link to="/register">
                  Commencer maintenant
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary hover:text-white">
                <Link to="/contact">En savoir plus</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

