import ArrowIcon from "./ArrowIcon";

const variants = {
  primary: "btn btn--primary",
  ghost: "btn btn--ghost",
  lime: "btn btn--lime",
};

const sizes = {
  sm: "btn--sm",
  lg: "btn--lg",
  default: "",
};

export default function Button({
  href = "#",
  variant = "primary",
  size = "default",
  full = false,
  showArrow = true,
  children,
  className = "",
  ...props
}) {
  const classes = [
    variants[variant] || variants.primary,
    sizes[size] || "",
    full ? "btn--full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a href={href} className={classes} {...props}>
      {children}
      {showArrow && <ArrowIcon size={size === "lg" ? 18 : 16} />}
    </a>
  );
}
