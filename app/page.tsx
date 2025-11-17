// app/page.tsx (Updated)
import { redirect } from 'next/navigation';

// This is a Server Component, using the built-in redirect function.
export default function HomePage() {
    // If the user visits the root path ('/'), immediately redirect them to /login.
    // The rest of your app's logic (in /login, /signup, /dashboard) will handle the rendering.
    redirect('/login');
}