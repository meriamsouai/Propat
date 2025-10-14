import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { API_ENDPOINTS, getAuthHeaders } from '@/config/api';
import { User, Package, Settings, LogOut, Eye, RefreshCw, Palette } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

interface Order {
  _id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

interface CustomizationOrder {
  _id: string;
  reference: string;
  chocolateType: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shape: any;
  quantity: number;
  textColor: string;
  textType: string;
  textContent: string;
  textStyle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customerInfo: any;
  status: string;
  createdAt: string;
  previewImage?: string;
}

interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  userType: 'client' | 'enterprise';
  companyName?: string;
}

const Account = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customizationOrders, setCustomizationOrders] = useState<CustomizationOrder[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [selectedOrder, setSelectedOrder] = useState<CustomizationOrder | null>(null);
  const { toast } = useToast();

  const customizationStatusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const customizationStatusLabels: Record<string, string> = {
    pending: 'En attente',
    'in-progress': 'En cours',
    completed: 'Terminé',
    cancelled: 'Annulé'
  };

  useEffect(() => {
    fetchUserProfile();
    fetchOrderHistory();
    fetchCustomizationOrders();
  }, []);

  const fetchCustomizationOrders = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CUSTOMIZATION.MY_ORDERS, {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        setCustomizationOrders(data);
      }
    } catch (error) {
      console.error('Error fetching customization orders:', error);
    }
  };

  const reorderCustomization = async (orderId: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.CUSTOMIZATION.REORDER(orderId), {
        method: 'POST',
        headers: getAuthHeaders()
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Commande dupliquée!",
          description: `Nouvelle commande créée: ${data.order.reference}`,
        });
        fetchCustomizationOrders();
      } else {
        throw new Error('Erreur lors de la duplication');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de dupliquer la commande",
        variant: "destructive",
      });
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.USER.PROFILE, {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setFormData(userData);
      } else {
        // Redirect to login if not authenticated
        window.location.href = '/auth';
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchOrderHistory = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.ORDERS.HISTORY, {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const orderData = await response.json();
        setOrders(orderData);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.USER.PROFILE, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setEditMode(false);
        toast({
          title: "Succès",
          description: "Profil mis à jour avec succès"
        });
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le profil",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur de connexion au serveur",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'processing': return 'En cours';
      case 'shipped': return 'Expédié';
      case 'delivered': return 'Livré';
      default: return status;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Chargement...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Navbar/>
      <div className="container mx-auto px-4 py-8 pt-32">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Mon Compte</h1>
          <div className="flex gap-2">
            <Link to="/">
              <Button variant="outline">Retour à l'accueil</Button>
            </Link>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {user.firstName} {user.lastName}
                </CardTitle>
                {user.userType === 'enterprise' && (
                  <p className="text-sm text-muted-foreground">{user.companyName}</p>
                )}
              </CardHeader>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Profil
                </TabsTrigger>
                <TabsTrigger value="customization" className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Personnalisations
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Commandes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Informations personnelles</CardTitle>
                      <Button 
                        variant={editMode ? "default" : "outline"}
                        onClick={() => editMode ? handleUpdateProfile() : setEditMode(true)}
                      >
                        {editMode ? 'Sauvegarder' : 'Modifier'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                          disabled={!editMode}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                          disabled={!editMode}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!editMode}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={formData.phone || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!editMode}
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Adresse</Label>
                      <Input
                        id="address"
                        value={formData.address || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        disabled={!editMode}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">Ville</Label>
                        <Input
                          id="city"
                          value={formData.city || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                          disabled={!editMode}
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">Code postal</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                          disabled={!editMode}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="country">Pays</Label>
                      <Input
                        id="country"
                        value={formData.country || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                        disabled={!editMode}
                      />
                    </div>

                    {user.userType === 'enterprise' && (
                      <div>
                        <Label htmlFor="companyName">Nom de l'entreprise</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                          disabled={!editMode}
                        />
                      </div>
                    )}

                    {editMode && (
                      <Button variant="outline" onClick={() => setEditMode(false)}>
                        Annuler
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Historique des commandes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {orders.length === 0 ? (
                      <div className="text-center py-8">
                        <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Aucune commande trouvée</p>
                        <Link to="/marketplace">
                          <Button className="mt-4">Commencer vos achats</Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <Card key={order._id} className="border-l-4 border-l-primary">
                            <CardContent className="pt-6">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h3 className="font-semibold">Commande #{order.orderNumber}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(order.date).toLocaleDateString('fr-FR')}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <Badge className={getStatusColor(order.status)}>
                                    {getStatusText(order.status)}
                                  </Badge>
                                  <p className="font-semibold mt-1">{order.total.toFixed(2)} €</p>
                                </div>
                              </div>
                              
                              <Separator className="my-4" />
                              
                              <div className="space-y-2">
                                {order.items.map((item, index) => (
                                  <div key={index} className="flex justify-between text-sm">
                                    <span>{item.name} x{item.quantity}</span>
                                    <span>{(item.price * item.quantity).toFixed(2)} €</span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="customization" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mes commandes de personnalisation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {customizationOrders.length === 0 ? (
                      <div className="text-center py-8">
                        <Palette className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Aucune commande de personnalisation trouvée</p>
                        <Link to="/customization">
                          <Button className="mt-4">Créer une personnalisation</Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {customizationOrders.map((order) => (
                          <Card key={order._id} className="border-l-4 border-l-primary">
                            <CardContent className="pt-6">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h3 className="font-semibold">Référence: {order.reference}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                                  </p>
                                  <p className="text-sm">
                                    Chocolat {order.chocolateType} - {order.quantity} plaquettes
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                   <Badge variant={
                                     order.status === 'completed' ? 'default' : 
                                     order.status === 'in-progress' ? 'secondary' :
                                     order.status === 'cancelled' ? 'destructive' : 'outline'
                                   }>
                                     {customizationStatusLabels[order.status] || order.status}
                                   </Badge>
                                 </div>
                              </div>
                              
                              <Separator className="my-4" />
                              
                              <div className="flex gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <Eye className="h-4 w-4 mr-1" />
                                      Voir détails
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>Détails de la commande {order.reference}</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <h4 className="font-medium mb-2">Produit</h4>
                                          <div className="space-y-1 text-sm">
                                            <p>Type: Chocolat {order.chocolateType}</p>
                                            <p>Forme: {order.shape?.name}</p>
                                            <p>Dimensions: {order.shape?.dimensions}</p>
                                            <p>Quantité: {order.quantity}</p>
                                            <p>Couleur: {order.textColor}</p>
                                            <p>Type: {order.textType}</p>
                                            {order.textContent && <p>Contenu: {order.textContent}</p>}
                                          </div>
                                        </div>
                                         <div>
                                           <h4 className="font-medium mb-2">Statut</h4>
                                            <Badge variant={
                                              order.status === 'completed' ? 'default' : 
                                              order.status === 'in-progress' ? 'secondary' :
                                              order.status === 'cancelled' ? 'destructive' : 'outline'
                                            }>
                                              {customizationStatusLabels[order.status] || order.status}
                                            </Badge>
                                         </div>
                                       </div>
                                       
                                       {/* Preview Image */}
                                       {order.previewImage && (
                                         <div>
                                           <h4 className="font-medium mb-2">Aperçu</h4>
                                           <div className="border rounded-lg p-2 bg-muted/10">
                                             <img 
                                               src={order.previewImage} 
                                               alt="Aperçu de la commande"
                                               className="max-w-full h-auto rounded max-h-40"
                                             />
                                           </div>
                                         </div>
                                       )}
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                
                                {order.status === 'completed' && (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => reorderCustomization(order._id)}
                                  >
                                    <RefreshCw className="h-4 w-4 mr-1" />
                                    Recommander
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;