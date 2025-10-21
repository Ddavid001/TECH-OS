import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import videoSrc from "/Educational_Campus_Montage_Video_Generation.mp4";
import posterSrc from "/poster.jpg"; // Asegúrate de crear y añadir una imagen poster.jpg en la carpeta public

const LandingHeader = () => {
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

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.5 },
  }),
};

const LandingHero = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Intentamos reproducir el video una vez que el componente se monta.
    // El método .play() devuelve una promesa.
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play().catch((error) => {
        // Este catch es importante para evitar errores en la consola si el navegador
        // bloquea la reproducción automática a pesar de nuestros esfuerzos.
        console.error("Error al intentar reproducir el video:", error);
      });
    }
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-gray-900 dark:bg-gray-900 flex-1">
      <LandingHeader />
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={posterSrc}
        className="absolute inset-0 h-full w-full object-cover dark:brightness-60"
        aria-label="Video de fondo mostrando el campus educativo"
      >
        <source src={videoSrc} type="video/mp4" />
        Tu navegador no soporta el tag de video.
      </video>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white dark:text-gray-100 px-4">
        <h1 className="text-4xl font-bold md:text-6xl lg:text-7xl mb-6">
          <motion.span 
            custom={0} 
            initial="hidden" 
            animate="visible" 
            variants={textVariants} 
            className="mb-4 block"
          >
            {t('heroTitle1')}
          </motion.span>
          <motion.span 
            custom={1} 
            initial="hidden" 
            animate="visible" 
            variants={textVariants} 
            className="mb-4 block"
          >
            {t('heroTitle2')}
          </motion.span>
          <motion.span 
            custom={2} 
            initial="hidden" 
            animate="visible" 
            variants={textVariants} 
            className="block"
          >
            {t('heroTitle3')}
          </motion.span>
        </h1>
        
        <motion.p 
          custom={3}
          initial="hidden" 
          animate="visible" 
          variants={textVariants}
          className="text-lg md:text-xl max-w-2xl text-white/90 dark:text-gray-200 mb-8"
        >
          {t('heroDescription')}
        </motion.p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-label="Desplazarse hacia abajo"
      >
        <ChevronDown className="h-8 w-8 text-white" />
      </motion.div>
    </section>
  );
};

export default LandingHero;
