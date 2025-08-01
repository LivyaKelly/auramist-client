import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function withAuth(Component, allowedRoles = []) {
  return function ProtectedComponent(props) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
      async function verifyRole() {
        try {
          const res = await fetch(`${API_URL}/api/protected`, {
            credentials: "include",
          });

          if (!res.ok) {
            router.push("/login");
            return;
          }

          const user = await res.json();
          if (allowedRoles.includes(user.role)) {
            setIsAuthorized(true);
          } else {
            router.push("/login");
          }
        } catch (error) {
          router.push("/login");
        } finally {
          setLoading(false);
        }
      }

      verifyRole();
    }, [router, API_URL]);

    if (loading) return <p>Carregando...</p>;
    if (!isAuthorized) return null;

    return <Component {...props} />;
  };
}
