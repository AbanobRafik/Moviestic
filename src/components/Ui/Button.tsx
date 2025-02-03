import { ReactNode } from "react";
import { Loader } from "lucide-react";
import clsx from "clsx";

interface Button {
  children: ReactNode;
  className: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button = ({ className, isLoading, children, type, ...rest }: Button) => {
  return (
    <button
      type={type}
      className={clsx(
        `flex items-center justify-center gap-2 px-2 py-3 w-full text-white`,
        {
          "cursor-not-allowed": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...rest}
    >
      {children}
      {isLoading ? (
        <Loader className="size-5 text-white font-bold animate-spin" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
