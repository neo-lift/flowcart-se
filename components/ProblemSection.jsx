import markup from "./html/ProblemSection.html?raw";

export default function ProblemSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
