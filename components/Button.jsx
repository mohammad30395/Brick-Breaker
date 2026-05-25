import Link from "next/link";

const variants = {
  primary: "border-teal-300/40 bg-teal-300 text-slate-950 hover:bg-teal-200 focus:ring-teal-200/40",
  secondary: "border-white/10 bg-white/10 text-white hover:bg-white/15 focus:ring-white/20",
  danger: "border-rose-300/40 bg-rose-500/20 text-rose-100 hover:bg-rose-500/30 focus:ring-rose-300/30",
  ghost: "border-transparent bg-transparent text-slate-200 hover:bg-white/10 focus:ring-white/20",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
