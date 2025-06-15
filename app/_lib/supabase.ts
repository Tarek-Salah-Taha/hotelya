import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://jcnxjvrwruueplpsmdse.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjbnhqdnJ3cnV1ZXBscHNtZHNlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODI2Nzg1NCwiZXhwIjoyMDYzODQzODU0fQ.2G0aqQgl40OtluDXjCHvTMMNOtpAY7RopMaaARhUBr4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
