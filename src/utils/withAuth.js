import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/utils/api"; // 1. Importar nossa instância do Axios

export default function withAuth(Component, allowedRoles = []) {
  return function ProtectedComponent(props) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // A constante API_URL não é mais necessária aqui

    useEffect(() => {
      async function verifyRole() {
        try {
          // 2. Usar api.get para verificar a autenticação e o papel do usuário
          // A rota '/api/protected' agora é '/api/users/protected'
          const response = await api.get('/api/users/protected');
          const user = response.data;

          // 3. A verificação de 'res.ok' não é necessária, pois o Axios trata erros no catch
          if (allowedRoles.includes(user.role)) {
            setIsAuthorized(true);
          } else {
            // Se o papel não for permitido, redireciona para o login
            router.push("/login");
          }
        } catch (error) {
          // O Axios joga para o catch se o token for inválido (erro 401/403) ou se houver erro de rede
          console.error("Falha na verificação de autorização:", error);
          router.push("/login");
        } finally {
          setLoading(false);
        }
      }

      verifyRole();
    }, [router]); // Removido API_URL das dependências

    if (loading) return <p>Carregando...</p>;
    if (!isAuthorized) return null; // Não renderiza nada enquanto redireciona

    return <Component {...props} />;
  };
}
