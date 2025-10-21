import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const LandingHeader = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-4 bg-transparent dark:bg-transparent">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-white dark:text-gray-100">TechOS</div>
        <nav className="flex items-center space-x-4" role="navigation" aria-label="Navegación principal">
          <Link to="/login">
            <Button 
              variant="outline" 
              className="bg-transparent text-white border-white hover:bg-white hover:text-black dark:text-gray-100 dark:border-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              aria-label="Iniciar sesión en la plataforma"
            >
              Iniciar Sesión
            </Button>
          </Link>
          <Link to="/register">
            <Button 
              className="bg-white text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              aria-label="Registrarse en la plataforma"
            >
              Registrarse
            </Button>
          </Link>
          <Select onValueChange={changeLanguage} defaultValue={i18n.language}>
            <SelectTrigger 
              className="w-[80px] text-white bg-transparent border-white dark:text-gray-100 dark:border-gray-300"
              aria-label="Seleccionar idioma"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="es" className="dark:text-gray-100">ES</SelectItem>
              <SelectItem value="en" className="dark:text-gray-100">EN</SelectItem>
            </SelectContent>
          </Select>
        </nav>
      </div>
    </header>
  );
};