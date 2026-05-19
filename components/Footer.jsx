import markup from "./html/Footer.html?raw";

export default function Footer() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
