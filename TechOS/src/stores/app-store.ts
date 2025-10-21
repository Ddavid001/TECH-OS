import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UserRole, Location, MapMarker } from '@/types';

/**
 * Application state interface
 */
interface AppState {
  // User state
  user: {
    id: string | null;
    email: string | null;
    role: UserRole | null;
    institutionId: string | null;
    profile: {
      firstName: string;
      lastName: string;
    } | null;
  };
  
  // Map state
  map: {
    center: Location;
    zoom: number;
    markers: MapMarker[];
    userLocation: Location | null;
    isLoading: boolean;
  };
  
  // UI state
  ui: {
    sidebarOpen: boolean;
    theme: 'light' | 'dark';
    loading: boolean;
    error: string | null;
  };
  
  // Actions
  setUser: (user: Partial<AppState['user']>) => void;
  clearUser: () => void;
  setMapCenter: (center: Location) => void;
  setMapZoom: (zoom: number) => void;
  setMapMarkers: (markers: MapMarker[]) => void;
  setUserLocation: (location: Location | null) => void;
  setMapLoading: (loading: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

/**
 * Initial state
 */
const initialState = {
  user: {
    id: null,
    email: null,
    role: null,
    institutionId: null,
    profile: null,
  },
  map: {
    center: { latitude: 10.4806, longitude: -66.9036 }, // Caracas coordinates
    zoom: 13,
    markers: [],
    userLocation: null,
    isLoading: false,
  },
  ui: {
    sidebarOpen: false,
    theme: 'light' as const,
    loading: false,
    error: null,
  },
};

/**
 * Zustand store with devtools
 */
export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      ...initialState,
      
      // User actions
      setUser: (user) => set((state) => ({ user: { ...state.user, ...user } }), false, 'setUser'),
      clearUser: () => set((state) => ({ user: initialState.user }), false, 'clearUser'),
      
      // Map actions
      setMapCenter: (center) => set((state) => ({ map: { ...state.map, center } }), false, 'setMapCenter'),
      setMapZoom: (zoom) => set((state) => ({ map: { ...state.map, zoom } }), false, 'setMapZoom'),
      setMapMarkers: (markers) => set((state) => ({ map: { ...state.map, markers } }), false, 'setMapMarkers'),
      setUserLocation: (location) => set((state) => ({ map: { ...state.map, userLocation: location } }), false, 'setUserLocation'),
      setMapLoading: (isLoading) => set((state) => ({ map: { ...state.map, isLoading } }), false, 'setMapLoading'),
      
      // UI actions
      setSidebarOpen: (sidebarOpen) => set((state) => ({ ui: { ...state.ui, sidebarOpen } }), false, 'setSidebarOpen'),
      setTheme: (theme) => set((state) => ({ ui: { ...state.ui, theme } }), false, 'setTheme'),
      setLoading: (loading) => set((state) => ({ ui: { ...state.ui, loading } }), false, 'setLoading'),
      setError: (error) => set((state) => ({ ui: { ...state.ui, error } }), false, 'setError'),
      clearError: () => set((state) => ({ ui: { ...state.ui, error: null } }), false, 'clearError'),
    }),
    {
      name: 'app-store',
    }
  )
);

/**
 * Selectors for specific state slices
 */
export const useUserStore = () => useAppStore((state) => state.user);
export const useMapStore = () => useAppStore((state) => state.map);
export const useUIStore = () => useAppStore((state) => state.ui);

/**
 * Computed selectors
 */
export const useIsAuthenticated = () => useAppStore((state) => !!state.user.id);
export const useUserRole = () => useAppStore((state) => state.user.role);
export const useIsLoading = () => useAppStore((state) => state.ui.loading);
export const useError = () => useAppStore((state) => state.ui.error);
