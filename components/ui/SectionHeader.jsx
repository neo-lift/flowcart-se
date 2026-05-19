import Eyebrow from "./Eyebrow";

export default function SectionHeader({
  eyebrow,
  title,
  intro,
  center = false,
  dark = false,
  children,
}) {
  const headerClass = [
    "section__header",
    center ? "section__header--center" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const introClass = [
    "section__intro",
    dark ? "section__intro--light" : "",
    !center && intro ? "section__intro--left" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const titleClass = dark ? "h2 h2--light" : "h2";

  return (
    <div className={headerClass}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      {typeof title === "string" ? (
        <h2 className={titleClass} dangerouslySetInnerHTML={{ __html: title }} />
      ) : (
        <h2 className={titleClass}>{title}</h2>
      )}
      {intro && <p className={introClass}>{intro}</p>}
      {children}
    </div>
  );
}
