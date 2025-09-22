// supabase.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// 👇 Replace with your own project values from Supabase settings
const SUPABASE_URL = "https://yrsxneflvjehttaralyz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlyc3huZWZsdmplaHR0YXJhbHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0ODg3OTAsImV4cCI6MjA3NDA2NDc5MH0.pZusEI_4v3S38yghZ9YVQ6bxEtL9KODI6MMou8zxz90";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
