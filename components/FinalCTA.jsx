import markup from "./html/FinalCta.html?raw";

export default function FinalCTA() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
