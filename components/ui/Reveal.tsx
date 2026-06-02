type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
};

export function Reveal({ children, className, as = "div" }: Props) {
  const Tag = as as React.ElementType;
  return <Tag className={className}>{children}</Tag>;
}
