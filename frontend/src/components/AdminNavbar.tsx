import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart3, Users, Package, LogOut } from 'lucide-react';
import logo from "/logo-propat.png"; 


const AdminNavbar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-card border-b border-border py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
                        {/* Logo */}
              <Link to="/admin" className="flex items-center pr-5">
                  <img src={logo} alt="Propat Logo" className="h-16 w-auto" />
              </Link>
              <Link to="/admin" className="text-xl font-bold text-accent pr-28">
                Administrateur
              </Link>
            </div>
            <div className="ml-6 flex space-x-8">
              <Link
                to="/admin"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/admin')
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
              <Link
                to="/admin/orders"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/admin/orders')
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <Package className="w-4 h-4 mr-2" />
                Customization Orders
              </Link>
              <Link
                to="/admin/users"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/admin/users')
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <Users className="w-4 h-4 mr-2" />
                User Management
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;