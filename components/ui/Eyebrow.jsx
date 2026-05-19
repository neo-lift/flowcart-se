export default function Eyebrow({ children, dark = false }) {
  return (
    <span className={`eyebrow${dark ? " eyebrow--dark" : ""}`}>
      <span className="eyebrow__icon" aria-hidden="true">
        ✦
      </span>
      {children}
    </span>
  );
}
