import markup from "./html/Faq.html?raw";

export default function FAQ() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
