import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/utils/api"; 

export default function withAuth(Component, allowedRoles = []) {
  return function ProtectedComponent(props) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      async function verifyRole() {
        try {
          const response = await api.get('/api/users/protected');
          const user = response.data;

          if (allowedRoles.includes(user.role)) {
            setIsAuthorized(true);
          } else {
            router.push("/login");
          }
        } catch (error) {
          console.error("Falha na verificação de autorização:", error);
          router.push("/login");
        } finally {
          setLoading(false);
        }
      }

      verifyRole();
    }, [router]); 

    if (loading) return <p>Carregando...</p>;
    if (!isAuthorized) return null; 

    return <Component {...props} />;
  };
}
