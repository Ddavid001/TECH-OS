import { supabase } from '@/integrations/supabase/client';

// Helper to bypass type checking for database operations
// This is needed when types haven't been generated yet
export const db = supabase as any;
