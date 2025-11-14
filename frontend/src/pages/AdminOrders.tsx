import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { API_ENDPOINTS, getAuthHeaders } from "@/config/api";
import { useToast } from "@/hooks/use-toast";
import { Eye, Edit, FileText, Package, ShoppingCart } from "lucide-react";
import AdminNavbar from "@/components/AdminNavbar";

interface CustomizationOrder {
  _id: string;
  reference: string;
  chocolateType: string;
  shape: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  quantity: number;
  textColor: string;
  textType: string;
  textContent: string;
  textStyle: string;
  customerInfo: any; // eslint-disable-line @typescript-eslint/no-explicit-any
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

const AdminOrders = () => {
  const [orders, setOrders] = useState<CustomizationOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<CustomizationOrder | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const { toast } = useToast();

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusLabels: Record<string, string> = {
    pending: "En attente",
    "in-progress": "En cours",
    completed: "Terminé",
    cancelled: "Annulé",
  };

  useEffect(() => {
    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus]);

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      const response = await fetch(
        `${API_ENDPOINTS.CUSTOMIZATION.ADMIN_ORDERS}?status=${selectedStatus}`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      } else {
        throw new Error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Fetch orders error:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les commandes",
        variant: "destructive",
      });
    } finally {
      setOrdersLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string, notes: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.CUSTOMIZATION.UPDATE_STATUS(orderId), {
        method: "PUT",
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
        throw new Error("Erreur lors de la mise à jour");
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
    setAdminNotes(order.adminNotes || "");
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
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

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Commandes de personnalisation
            </CardTitle>
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-muted-foreground">Chargement...</p>
              </div>
            ) : orders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Référence</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Produit</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>
                        <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                          {order.reference}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {order.userId?.firstName} {order.userId?.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.userId?.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>Chocolat {order.chocolateType}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.shape?.name}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[order.status] || "bg-gray-100 text-gray-800"}>
                          {statusLabels[order.status] || order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                      </TableCell>
                      <TableCell>
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
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Détails de la commande {order.reference}</DialogTitle>
                            </DialogHeader>
<div className="space-y-6">
                                  {/* Reference and Preview */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h4 className="font-medium mb-2">Référence</h4>
                                      <div className="bg-muted p-3 rounded-md">
                                        <code className="text-lg font-mono text-primary">
                                          {order.reference}
                                        </code>
                                      </div>
                                    </div>
                                    
                                    {/* Preview Image */}
                                    {order.previewImage && (
                                      <div>
                                        <h4 className="font-medium mb-2">Aperçu</h4>
                                        <div className="border rounded-lg p-4 bg-muted/10">
                                          <img 
                                            src={order.previewImage} 
                                            alt="Aperçu de la commande"
                                            className="max-w-full h-auto rounded max-h-48"
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {/* Order Details */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h4 className="font-medium mb-3">Informations produit</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="font-medium">Type:</span>
                                          <span>Chocolat {order.chocolateType}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="font-medium">Forme:</span>
                                          <span>{order.shape?.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="font-medium">Dimensions:</span>
                                          <span>{order.shape?.dimensions}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="font-medium">Poses/planche:</span>
                                          <span>{order.shape?.posesPerSheet}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="font-medium">Quantité:</span>
                                          <span>{order.quantity}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                          <span className="font-medium">Couleur:</span>
                                          <div className="flex items-center gap-2">
                                            <span 
                                              className="w-4 h-4 rounded border" 
                                              style={{ backgroundColor: order.textColor }}
                                            />
                                            <span>{order.textColor}</span>
                                          </div>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="font-medium">Type de texte:</span>
                                          <span>{order.textType}</span>
                                        </div>
                                        {order.textContent && (
                                          <div className="flex justify-between">
                                            <span className="font-medium">Contenu:</span>
                                            <span className="text-right max-w-48 break-words">{order.textContent}</span>
                                          </div>
                                        )}
                                        {order.textStyle && (
                                          <div className="flex justify-between">
                                            <span className="font-medium">Style:</span>
                                            <span>{order.textStyle}</span>
                                          </div>
                                        )}
                                        {order.logoFile && (
                                          <div className="flex justify-between">
                                            <span className="font-medium">Logo:</span>
                                            <span className="text-right max-w-48 break-words">
                                              {order.logoFile.originalName} ({(order.logoFile.size / 1024).toFixed(1)} KB)
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <h4 className="font-medium mb-3">Informations client</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="font-medium">Nom:</span>
                                          <span>{order.customerInfo.prenom} {order.customerInfo.nom}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="font-medium">Email:</span>
                                          <span className="text-right max-w-48 break-words">{order.customerInfo.email}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="font-medium">Téléphone:</span>
                                          <span>{order.customerInfo.telephone}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="font-medium">Ville:</span>
                                          <span>{order.customerInfo.ville}, {order.customerInfo.codePostal}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="font-medium">Pays:</span>
                                          <span>{order.customerInfo.pays}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Admin Notes Display */}
                                  {order.adminNotes && (
                                    <div>
                                      <h4 className="font-medium mb-2">Notes administrateur actuelles</h4>
                                      <div className="bg-muted p-3 rounded-md text-sm">
                                        {order.adminNotes}
                                      </div>
                                    </div>
                                  )}

                                  {/* Order Dates */}
                                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground border-t pt-4">
                                    <div>
                                      <span className="font-medium">Créée le:</span> {new Date(order.createdAt).toLocaleString('fr-FR')}
                                    </div>
                                    <div>
                                      <span className="font-medium">Modifiée le:</span> {new Date(order.updatedAt).toLocaleString('fr-FR')}
                                    </div>
                                  </div>

                                  {/* Status Update */}
                                  <div className="border-t pt-6">
                                    <h4 className="font-medium mb-4">Mise à jour du statut</h4>
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
                                        rows={3}
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucune commande trouvée</h3>
                <p className="text-muted-foreground">
                  Aucune commande ne correspond aux critères sélectionnés.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOrders;
