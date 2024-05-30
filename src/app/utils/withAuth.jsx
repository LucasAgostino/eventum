import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase	} from './supabase';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
      const checkSession = async () => {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
          router.push('/login'); // Redirige a la página de login si hay un error
        } else if (!session) {
          router.push('/login'); // Redirige a la página de login si no hay sesión
        } else {
          setUser(session.user);
          setLoading(false);
        }
      };

      checkSession();
    }, [router]);

    if (loading) {
      return <div>Loading...</div>; // Muestra un mensaje de carga mientras se verifica la sesión
    }

    return <WrappedComponent {...props} user={user} />;
  };
};

export default withAuth;