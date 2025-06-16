
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Menu, User, Bell, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Header = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { user, logout } = useAuth();

  const handleAuthDialog = (loginMode: boolean) => {
    setIsLoginMode(loginMode);
    setAuthDialogOpen(true);
  };

  const closeAuthDialog = () => {
    setAuthDialogOpen(false);
  };

  const switchAuthMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-900">ConsultCare</span>
            <Badge variant="secondary" className="ml-2">API Demo</Badge>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Find Doctors
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Services
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="hidden md:inline">{user.firstName}</span>
                      <Badge variant="outline" className="text-xs">{user.role}</Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Medical Records</DropdownMenuItem>
                    <DropdownMenuItem>Appointments</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={() => handleAuthDialog(true)}>
                  Login
                </Button>
                <Button onClick={() => handleAuthDialog(false)}>
                  Sign Up
                </Button>
              </div>
            )}
            
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {isLoginMode ? (
            <LoginForm onSwitchToRegister={switchAuthMode} />
          ) : (
            <RegisterForm onSwitchToLogin={switchAuthMode} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
