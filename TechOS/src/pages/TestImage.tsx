import React from 'react';

const TestImage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Prueba de Imagen</h1>
      
      <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Imagen desde carpeta public:</h2>
        <img 
          src="/tech-os-logo.png" 
          alt="Tech OS Logo" 
          className="mx-auto max-h-64 object-contain mb-8"
        />
        
        <h2 className="text-xl font-semibold mb-4">Video desde carpeta public:</h2>
        <video
          autoPlay
          loop
          muted
          playsInline
          controls
          className="w-full max-h-96 object-contain"
        >
          <source src="/Educational_Campus_Montage_Video_Generation.mp4" type="video/mp4" />
          Tu navegador no soporta el tag de video.
        </video>
      </div>
    </div>
  );
};

export default TestImage;