import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "@/utils/supabase/server";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Controlla se l'utente è autenticato
  if ((user && request.nextUrl.pathname === "/") || request.url === "/") {
    // Controlla se la richiesta è già destinata a /dashboard
    if (request.nextUrl.pathname !== "/dashboard") {
      // Se l'utente è autenticato e non è già su /dashboard, fai il redirect a /dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Se l'utente non è autenticato o è già su /dashboard, lascia passare la richiesta
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
