import { supabase } from "../../../backend/src/supabase-client";

export default function Settings() {
  const logOut = aysnc() => {
    await supabase.auth.signOut();
  };



  return (
    <main>
        <button onClick = {logOut}>Sign Out</button>
    </main>
  );
}