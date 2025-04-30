import { cn } from "@/lib/utils";

export const Footer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  return (
    <footer>
      <div
        className={cn(
          "container text-sm text-muted-foreground py-4 flex justify-center gap-x-1",
          className
        )}
      >
        <span>
          {" "}
          © {new Date().getFullYear()} All rights reserved by Logoflowy
        </span>
      </div>
    </footer>
  );
};
