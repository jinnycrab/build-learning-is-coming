import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { Database, Json } from "@/integrations/supabase/types";

// Contract for the checked-in CMS migration, not a claim that it has run.
// Keep the generated database types untouched until Supabase applies it.
type ContentRow = {
  key: string;
  data: Json;
  updated_at: string;
  updated_by: string | null;
};

type CmsDatabase = Omit<Database, "public"> & {
  public: {
    Tables: {
      site_content: {
        Row: ContentRow;
        Insert: { key: string; data: Json; updated_at?: string; updated_by?: string | null };
        Update: Partial<ContentRow>;
        Relationships: [];
      };
      site_content_history: {
        Row: { id: number; key: string; data: Json; saved_at: string; saved_by: string | null };
        Insert: { key: string; data?: Json; saved_at?: string; saved_by?: string | null };
        Update: { key?: string; data?: Json; saved_at?: string; saved_by?: string | null };
        Relationships: [];
      };
    };
    Views: Database["public"]["Views"];
    Functions: {
      has_role: { Args: { _user_id: string; _role: "admin" }; Returns: boolean };
      claim_first_admin: { Args: Record<string, never>; Returns: boolean };
      grant_admin_by_email: { Args: { _email: string }; Returns: string };
      list_admins: {
        Args: Record<string, never>;
        Returns: { user_id: string; email: string; created_at: string }[];
      };
      revoke_admin: { Args: { _user_id: string }; Returns: undefined };
    };
    Enums: { app_role: "admin" };
    CompositeTypes: Database["public"]["CompositeTypes"];
  };
};

// Reuse the existing connection, session and request handling. Missing-schema
// errors still reach the existing setup screen and public-content fallback.
export const cmsSupabase = supabase as unknown as SupabaseClient<CmsDatabase>;