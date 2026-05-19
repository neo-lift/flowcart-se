export default function Container({ narrow = false, className = "", children }) {
  const classes = ["container", narrow ? "container--narrow" : "", className]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}
