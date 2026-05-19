import markup from "./html/UseCases.html?raw";

export default function UseCases() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
