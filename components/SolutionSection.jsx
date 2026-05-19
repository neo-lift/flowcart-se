import markup from "./html/SolutionSection.html?raw";

export default function SolutionSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
