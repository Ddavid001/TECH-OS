import React from 'react';
import { JobOffersPanel } from '@/components/job-offers/JobOffersPanel';

const JobOffersPage: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Ofertas Laborales</h1>
      <JobOffersPanel />
    </div>
  );
};

export default JobOffersPage;