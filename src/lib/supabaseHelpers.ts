import { supabase } from "./supabase";

export const saveUserToDB = async (user: any) => {
  const { id, email, user_metadata } = user;
  const name = user_metadata?.full_name || "";

  // Check if user already exists
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("user_id", id)
    .single();

  if (!data) {
    // Insert user
    const { error: insertError } = await supabase.from("users").insert([
      {
        user_id: id,
        email,
        name,
      },
    ]);

    if (insertError) {
      console.error("Error inserting user:", insertError.message);
    }
  }
};

export const saveUserRoleToDB = async (user: any) => {
  const { id } = user;

  // Check if user already exists
  const { data, error } = await supabase
    .from("user_roles")
    .select("id")
    .eq("user_id", id)
    .single();

  if (!data) {
    // Insert user
    const { error: insertError } = await supabase.from("user_roles").insert([
      {
        user_id: id,
        role: "user",
      },
    ]);

    if (insertError) {
      console.error("Error inserting user:", insertError.message);
    }
  }
};
