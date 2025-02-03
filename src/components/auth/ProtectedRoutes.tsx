import { ReactNode } from "react";
import { Navigate } from "react-router";

interface ProtectedRoutesProps {
  isAllowed: boolean;
  redirectPath: string;
  children: ReactNode;
  data?: unknown;
}

const ProtectedRoutes = ({
  isAllowed,
  redirectPath,
  children,
  data,
}: ProtectedRoutesProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace state={data} />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoutes;
