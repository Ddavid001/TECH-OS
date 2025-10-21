// supabase/functions/create-user/index.ts

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

// --- Esquema de validación para los datos de entrada ---
const userSchema = z.object({
  email: z.string().email({ message: "Correo electrónico inválido" }),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
  firstName: z.string().min(1, { message: "El nombre es obligatorio" }),
  lastName: z.string().min(1, { message: "El apellido es obligatorio" }),
  role: z.enum(["admin", "teacher", "student", "representative"]),
  institutionId: z.string().uuid().optional(),
});

// --- Configuración de CORS más segura ---
const allowedOrigin = Deno.env.get("FRONTEND_URL") || "*"; // Usar '*' solo para desarrollo

const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Manejar la solicitud pre-vuelo OPTIONS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // --- Validación de variables de entorno ---
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Missing Supabase environment variables.");
    }

    // Inicializa el cliente de Supabase con permisos de administrador
    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Obtiene los datos del nuevo usuario desde el frontend
    const body = await req.json();
    const validation = userSchema.safeParse(body);

    // --- Validación de datos con Zod ---
    if (!validation.success) {
      return new Response(JSON.stringify({ error: "Datos de entrada inválidos", details: validation.error.flatten() }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const { email, password, firstName, lastName, role, institutionId } = validation.data;

    // --- PASO 1: CREAR EL USUARIO EN EL SISTEMA DE AUTENTICACIÓN ---
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Habilitar confirmación por email
    });

    if (authError) {
      console.error("Error creando el usuario de autenticación:", authError);
      return new Response(JSON.stringify({ error: authError.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const newUserId = authData.user.id;

    // --- PASO 2: INSERTAR EL PERFIL EN LA TABLA `profiles` ---
    const { error: profileError } = await supabaseAdmin.from("profiles").insert({
      id: newUserId, // Usa el ID del usuario recién creado
      first_name: firstName,
      last_name: lastName,
      role: role,
      institution_id: institutionId,
      email: email,
    });

    if (profileError) {
      console.error("Error insertando el perfil:", profileError);
      // Si este paso falla, eliminamos el usuario de auth para no dejar datos inconsistentes
      await supabaseAdmin.auth.admin.deleteUser(newUserId);
      return new Response(JSON.stringify({ error: "No se pudo crear el perfil de usuario." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500, // Error del servidor, ya que la autenticación se creó pero el perfil no
      });
    }

    // Si todo fue exitoso, devuelve la respuesta
    return new Response(JSON.stringify({ user: authData.user }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error inesperado en la función create-user:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Error desconocido" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});