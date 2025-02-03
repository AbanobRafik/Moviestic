import type { ReactNode } from "react";

interface ErrorMsgProps {
  children: ReactNode;
}
const ErrorMsg = ({ children }: ErrorMsgProps) => {
  return <p className="text-sm mt-1 text-center text-[var(--danger)] font-bold">{children}</p>;
};

export default ErrorMsg;