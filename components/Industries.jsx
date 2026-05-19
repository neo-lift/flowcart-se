import markup from "./html/Industries.html?raw";

export default function Industries() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
