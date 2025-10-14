import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { API_ENDPOINTS } from '@/config/api';
import { Navbar } from '@/components/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';



const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('client');
  const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
  phone: '',
  countryCode: '+216',   // default Tunisia
  address: '',
  city: '',
  zipCode: '',
  country: '',
  companyName: '',
  newsletter: false
});

  const { toast } = useToast();

const countries = [
  { name: "Tunisie", code: "+216", flag: "/ftunisia.png" },
  { name: "Algerie", code: "+213", flag: "/falgeria.png" },
  { name: "Maroc", code: "+212", flag: "/fmaroc.png" },
  { name: "Portugal", code: "+351", flag: "/fportugal.png" },
  { name: "KSA", code: "+966", flag: "/fksa.png" },
];

const [showPassword, setShowPassword] = useState(false);
const [passwordStrength, setPasswordStrength] = useState<
  "weak" | "medium-low" | "medium-high" | "strong" | ""
>("");


const hasMinLength = formData.password.length >= 8;
const hasLetters = /[a-zA-Z]/.test(formData.password);
const hasDigits = /\d/.test(formData.password);
const hasUpper = /[A-Z]/.test(formData.password);
const hasSymbols = /[^a-zA-Z0-9]/.test(formData.password);

const hasLettersAndDigits = hasLetters && hasDigits;
const hasUpperOrSymbols = hasUpper || hasSymbols;


const checkPasswordStrength = (password: string) => {
  if (!password) return "";

  // 1️⃣ Weak if less than 8 characters
  if (password.length < 8) return "weak";

  const allDigits = /^\d+$/.test(password);
  const allLetters = /^[a-zA-Z]+$/.test(password); // letters only (no digits, no symbols)
  const hasLetters = /[a-zA-Z]/.test(password);
  const hasDigits = /\d/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  // 2️⃣ Only numbers OR only letters → medium-low
  if (allDigits || allLetters) return "medium-low";

  // 3️⃣ Letters + numbers
  if (hasLetters && hasDigits) {
    if (hasUpper || hasSymbols) return "strong";
    return "medium-high";
  }

  // 4️⃣ Letters + symbols (or other combinations)
  if (hasLetters && hasSymbols) return "medium-high";

  // Default fallback
  return "medium-low";
};





  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!isLogin) {
    if (formData.email !== formData.confirmEmail) {
      toast({
        title: "Erreur",
        description: "Les adresses email ne correspondent pas",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }

    // 🚨 New: check password strength
    if (passwordStrength === "weak") {
      toast({
        title: "Erreur",
        description:
          "Le mot de passe est trop faible. Il doit contenir au moins 8 caractères.",
        variant: "destructive",
      });
      return;
    }
  }

  // 👇 Combine phone prefix + number
  const fullPhone = `${formData.countryCode}${formData.phone}`;

  try {
    const endpoint = isLogin
      ? API_ENDPOINTS.AUTH.LOGIN
      : API_ENDPOINTS.AUTH.REGISTER;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        phone: fullPhone,
        userType,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      toast({
        title: "Succès",
        description: isLogin
          ? "Connexion réussie"
          : "Compte créé avec succès",
      });

      if (isLogin && data.token) {
        try {
          const tokenPayload = JSON.parse(
            atob(data.token.split(".")[1])
          );
          if (tokenPayload.role === "admin") {
            window.location.href = "/admin";
          } else {
            navigate(from, { replace: true });
          }
        } catch (e) {
          window.location.href = "/account";
        }
      } else {
        window.location.href = "/account";
      }
    } else {
      toast({
        title: "Erreur",
        description: data.message || "Une erreur est survenue",
        variant: "destructive",
      });
    }
  } catch (error) {
    toast({
      title: "Erreur",
      description: "Impossible de se connecter au serveur",
      variant: "destructive",
    });
  }
};


  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    // Redirect to OAuth endpoint
    const endpoint = provider === 'google' ? API_ENDPOINTS.AUTH.GOOGLE : API_ENDPOINTS.AUTH.FACEBOOK;
    window.location.href = endpoint;
  };

  const navigate = useNavigate();
const location = useLocation();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const from = (location.state as any)?.from?.pathname || '/account'; // default if no "from"
const token = localStorage.getItem('token');

// Redirect logged-in user away from /auth
React.useEffect(() => {
  if (token) {
    navigate(from, { replace: true });
  }
}, [token, from, navigate]);


  return (
<div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden
                bg-gradient-to-br from-amber-50 to-orange-100
                before:content-[''] before:absolute before:inset-y-0 before:right-0 before:w-64 md:before:w-5/12
                before:bg-[url('/minibg82.png')] before:bg-[right_0] before:bg-contain before:opacity-20
                after:content-[''] after:absolute after:inset-y-0 after:left-0 after:w-64 md:after:w-5/12
                after:bg-[url('/minibg82.png')] after:bg-[left_140%] after:bg-contain after:opacity-20">
                  
  <div className="relative z-10 w-full flex flex-col items-center">
    <Navbar />
    <Card className="w-full max-w-md mt-28">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            {isLogin ? 'Connexion' : 'Créer un compte'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={isLogin ? 'login' : 'register'} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" onClick={() => setIsLogin(true)}>
                Connexion
              </TabsTrigger>
              <TabsTrigger value="register" onClick={() => setIsLogin(false)}>
                Inscription
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div>
  <Label htmlFor="login-password">Mot de passe</Label>

  <div className="relative">
    <Input
      id="login-password"
      type={showPassword ? "text" : "password"}
      value={formData.password}
      onChange={(e) => handleInputChange("password", e.target.value)}
      required
    />

    {/* Eye icon button */}
    <button
      type="button"
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? "👁️" : "🙈"}
    </button>
  </div>
</div>

                <Button type="submit" className="w-full">
                  Se connecter
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Type de compte</Label>
                  <RadioGroup value={userType} onValueChange={setUserType} className="flex flex-row space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="client" id="client" />
                      <Label htmlFor="client">Client particulier</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="enterprise" id="enterprise" />
                      <Label htmlFor="enterprise">Entreprise</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="country">Pays *</Label>
                  <Select
  value={formData.country}
  onValueChange={(value) => {
    const selected = countries.find(c => c.name === value);
    handleInputChange("country", value);
    if (selected) {
      handleInputChange("countryCode", selected.code);
    }
  }}
>
  <SelectTrigger>
    <SelectValue placeholder="Sélectionnez votre pays" />
  </SelectTrigger>
  <SelectContent>
    {countries.map((country) => (
      <SelectItem key={country.code} value={country.name}>
        <div className="flex items-center gap-2">
          <img
            src={country.flag}
            alt={`${country.name} flag`}
            className="w-7 h-5 rounded-sm object-cover"
          />
          <span>{country.name}</span>
        </div>
      </SelectItem>
    ))}
  </SelectContent>
</Select>
                </div>

                {userType === 'enterprise' && (
                  <div>
                    <Label htmlFor="companyName">Nom de l'entreprise *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
  <Label htmlFor="phone">Numéro de téléphone *</Label>
  <div className="flex gap-2">
    {/* Display selected country code */}
    <div className="flex items-center gap-2 px-3 border rounded-md bg-gray-50">
      {(() => {
        const selected = countries.find(c => c.name === formData.country) || countries[0];
        return (
          <>
            <img src={selected.flag} alt={selected.name} className="w-5 h-5 rounded-sm" />
            <span>{selected.code}</span>
          </>
        );
      })()}
    </div>

    {/* Phone number input */}
    <Input
      id="phone"
      type="tel"
      value={formData.phone}
      onChange={(e) => handleInputChange("phone", e.target.value)}
      placeholder="Votre numéro"
      required
      className="flex-1"
    />
  </div>
</div>



                <div>
                  <Label htmlFor="address">Adresse *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="city">Ville *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Code postal *</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="confirmEmail">Confirmez email *</Label>
                  <Input
                    id="confirmEmail"
                    type="email"
                    value={formData.confirmEmail}
                    onChange={(e) => handleInputChange('confirmEmail', e.target.value)}
                    required
                  />
                </div>

                <div>
  <Label htmlFor="password">Mot de passe *</Label>
  <div className="relative">
    <Input
      id="password"
      type={showPassword ? "text" : "password"}
      value={formData.password}
      onChange={(e) => {
        handleInputChange("password", e.target.value);
        setPasswordStrength(checkPasswordStrength(e.target.value));
      }}
      required
    />
    {/* Eye icon button */}
    <button
      type="button"
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? "👁️" : "🙈"}
    </button>
  </div>

  {/* Strength bar */}
{formData.password && (
  <>
    {/* Strength bar */}
    <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
      <div
        className={`h-2 rounded-full ${
          passwordStrength === "weak"
            ? "bg-red-500 w-1/4"
            : passwordStrength === "medium-low"
            ? "bg-orange-500 w-2/4"
            : passwordStrength === "medium-high"
            ? "bg-yellow-400 w-3/4"
            : passwordStrength === "strong"
            ? "bg-green-500 w-full"
            : ""
        }`}
      ></div>
    </div>

    {/* Checklist */}
<div className="mt-2 text-sm space-y-1">
  <div className="flex items-center gap-2">
    <span>{hasMinLength ? "✅" : "❌"}</span>
    <span>8 caractères minimum</span>
  </div>
  <div className="flex items-center gap-2">
    <span>{hasLettersAndDigits ? "✅" : "❌"}</span>
    <span>Combinaison lettres et chiffres</span>
  </div>
  <div className="flex items-center gap-2">
    <span>{hasUpperOrSymbols ? "✅" : "❌"}</span>
    <span>Contient une majuscule ou un symbole</span>
  </div>
</div>
  </>
)}

</div>


                <div>
                  <Label htmlFor="confirmPassword">Confirmez mot de passe *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                  />
                </div>

                

                

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) => handleInputChange('newsletter', checked as boolean)}
                  />
                  <Label htmlFor="newsletter" className="text-sm">
                    J'accepte de recevoir des offres promotionnelles de Propat par message électronique
                  </Label>
                </div>

                <Button type="submit" className="w-full">
                  Créer mon compte
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Ou continuez avec</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('google')}
                className="w-full"
              >
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('facebook')}
                className="w-full"
              >
                Facebook
              </Button>
            </div>
          </div>

          <div className="mt-4 text-center text-sm">
            <Link to="/" className="text-primary hover:underline">
              Retour à l'accueil
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default Auth;