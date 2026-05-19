import markup from "./html/ValueProposition.html?raw";

export default function ValueProposition() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
