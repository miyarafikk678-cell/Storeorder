// supabase.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// 👇 Replace with your own project values from Supabase settings
const SUPABASE_URL = "https://YOUR-PROJECT-REF.supabase.co";
const SUPABASE_ANON_KEY = "YOUR-ANON-KEY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
