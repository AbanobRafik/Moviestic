import { ReactNode } from "react";
import { Navigate } from "react-router";

interface ProtectedRoutes {
  isAllowed: boolean;
  redicrectPath: string;
  chilrdren: ReactNode;
  data: unknown;
}

const ProtectedRoutes = ({
  isAllowed,
  redicrectPath,
  chilrdren,
  data,
}: ProtectedRoutes) => {
  if (!isAllowed) {
    return <Navigate to={redicrectPath} replace state={data} />;
  } else {
    return <>{chilrdren}</>;
  }
};

export default ProtectedRoutes;
