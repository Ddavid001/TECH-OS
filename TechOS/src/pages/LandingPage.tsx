import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
          TECH OS 
        </h1>
        
        <p className="mb-12 max-w-2xl text-lg text-white/90 md:text-xl">
          Our platform ensures that learning never stops, connecting teachers, students, and representatives in real-time.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            size="lg"
            onClick={() => navigate('/login')}
            className="text-lg"
          >
            Go to Portal / Sign In
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
