import { EnhancedMapView } from './EnhancedMapView';

interface MapViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedInstitutionId?: string;
}

export const MapViewModal = ({ open, onOpenChange, selectedInstitutionId }: MapViewModalProps) => {
  return (
    <EnhancedMapView 
      open={open} 
      onOpenChange={onOpenChange} 
      selectedInstitutionId={selectedInstitutionId}
    />
  );
};

export default MapViewModal;
