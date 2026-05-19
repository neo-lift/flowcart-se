import markup from "./html/HowItWorks.html?raw";

export default function HowItWorks() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
