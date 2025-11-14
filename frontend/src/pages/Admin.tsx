import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { API_ENDPOINTS, getAuthHeaders } from "@/config/api";
import { useToast } from "@/hooks/use-toast";
import { Eye, Edit, FileText, Package } from "lucide-react";

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
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
  previewImage?: string;
  logoFile?: {
    filename: string;
    originalName: string;
    mimetype: string;
    size: number;
    path: string;
  };
  userId: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const Admin = () => {
  const [orders, setOrders] = useState<CustomizationOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<CustomizationOrder | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const { toast } = useToast();

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const statusLabels: Record<string, string> = {
    pending: 'En attente',
    'in-progress': 'En cours',
    completed: 'Terminé',
    cancelled: 'Annulé'
  };

  useEffect(() => {
    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.CUSTOMIZATION.ADMIN_ORDERS}?status=${selectedStatus}`,
        {
          headers: getAuthHeaders()
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les commandes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string, notes: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.CUSTOMIZATION.UPDATE_STATUS(orderId), {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, adminNotes: notes }),
      });

      if (response.ok) {
        toast({
          title: "Succès",
          description: "Statut mis à jour avec succès",
        });
        fetchOrders();
        setSelectedOrder(null);
      } else {
        throw new Error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
    }
  };

  const openOrderDialog = (order: CustomizationOrder) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setAdminNotes(order.adminNotes || '');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-primary mb-4 italic">
            Tableau de bord administrateur
          </h1>
          <p className="text-muted-foreground italic">
            Gérez toutes les commandes de personnalisation
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Filtres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-center">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="in-progress">En cours</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">
                {orders.length} commande(s) trouvée(s)
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Orders Grid */}
        <div className="grid gap-6">
          {orders.map((order) => (
            <Card key={order._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-4">
                  {/* Order Info */}
                  <div>
                    <h3 className="font-medium text-primary mb-2">
                      {order.reference}
                    </h3>
                    <Badge className={statusColors[order.status] || 'bg-gray-100 text-gray-800'}>
                      {statusLabels[order.status] || order.status}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-2">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <h4 className="font-medium text-sm mb-1">Client</h4>
                    <p className="text-sm">
                      {order.userId?.firstName} {order.userId?.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.userId?.email}
                    </p>
                  </div>

                  {/* Order Details */}
                  <div>
                    <h4 className="font-medium text-sm mb-1">Détails</h4>
                    <p className="text-sm">
                      Chocolat {order.chocolateType}
                    </p>
                    <p className="text-sm">
                      Quantité: {order.quantity}
                    </p>
                    <p className="text-sm">
                      Type: {order.textType}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openOrderDialog(order)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Voir
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Détails de la commande {order.reference}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          {/* Reference and Preview */}
                          <div className="mb-6">
                            <h4 className="font-medium mb-2">Référence</h4>
                            <div className="bg-muted p-3 rounded-md">
                              <code className="text-lg font-mono text-primary">
                                {order.reference}
                              </code>
                            </div>
                          </div>

                          {/* Preview Image */}
                          {order.previewImage && (
                            <div className="mb-6">
                              <h4 className="font-medium mb-2">Aperçu</h4>
                              <div className="border rounded-lg p-4 bg-muted/10">
                                <img 
                                  src={order.previewImage} 
                                  alt="Aperçu de la commande"
                                  className="max-w-full h-auto rounded"
                                />
                              </div>
                            </div>
                          )}

                          {/* Order Details */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Informations produit</h4>
                              <div className="space-y-1 text-sm">
                                <p><strong>Type:</strong> Chocolat {order.chocolateType}</p>
                                <p><strong>Forme:</strong> {order.shape?.name}</p>
                                <p><strong>Dimensions:</strong> {order.shape?.dimensions}</p>
                                <p><strong>Poses par planche:</strong> {order.shape?.posesPerSheet}</p>
                                <p><strong>Quantité:</strong> {order.quantity}</p>
                                <p><strong>Couleur:</strong> 
                                  <span 
                                    className="inline-block w-4 h-4 rounded ml-2 border" 
                                    style={{ backgroundColor: order.textColor }}
                                  ></span>
                                  {order.textColor}
                                </p>
                                <p><strong>Type de texte:</strong> {order.textType}</p>
                                {order.textContent && <p><strong>Contenu:</strong> {order.textContent}</p>}
                                {order.textStyle && <p><strong>Style:</strong> {order.textStyle}</p>}
                                {order.logoFile && (
                                  <p><strong>Logo:</strong> {order.logoFile.originalName} ({(order.logoFile.size / 1024).toFixed(1)} KB)</p>
                                )}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Informations client</h4>
                              <div className="space-y-1 text-sm">
                                <p><strong>Nom:</strong> {order.customerInfo.prenom} {order.customerInfo.nom}</p>
                                <p><strong>Adresse:</strong> {order.customerInfo.ville}, {order.customerInfo.codePostal}</p>
                                <p><strong>Pays:</strong> {order.customerInfo.pays}</p>
                                <p><strong>Email:</strong> {order.customerInfo.email}</p>
                                <p><strong>Téléphone:</strong> {order.customerInfo.telephone}</p>
                              </div>
                            </div>
                          </div>

                          {/* Admin Notes Display */}
                          {order.adminNotes && (
                            <div className="mt-4">
                              <h4 className="font-medium mb-2">Notes administrateur actuelles</h4>
                              <div className="bg-muted p-3 rounded-md text-sm">
                                {order.adminNotes}
                              </div>
                            </div>
                          )}

                          {/* Order Dates */}
                          <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div>
                              <p><strong>Créée le:</strong> {new Date(order.createdAt).toLocaleString('fr-FR')}</p>
                            </div>
                            <div>
                              <p><strong>Modifiée le:</strong> {new Date(order.updatedAt).toLocaleString('fr-FR')}</p>
                            </div>
                          </div>

                          {/* Status Update */}
                          <div>
                            <h4 className="font-medium mb-2">Mise à jour du statut</h4>
                            <div className="space-y-4">
                              <Select value={newStatus} onValueChange={setNewStatus}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">En attente</SelectItem>
                                  <SelectItem value="in-progress">En cours</SelectItem>
                                  <SelectItem value="completed">Terminé</SelectItem>
                                  <SelectItem value="cancelled">Annulé</SelectItem>
                                </SelectContent>
                              </Select>
                              <Textarea
                                placeholder="Notes administrateur..."
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                              />
                              <Button 
                                onClick={() => updateOrderStatus(order._id, newStatus, adminNotes)}
                                className="w-full"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Mettre à jour
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {orders.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Aucune commande trouvée</h3>
              <p className="text-muted-foreground">
                Aucune commande ne correspond aux critères sélectionnés.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Admin;