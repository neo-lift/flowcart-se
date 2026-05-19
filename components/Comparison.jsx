import markup from "./html/Comparison.html?raw";

export default function Comparison() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
