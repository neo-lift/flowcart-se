import markup from "./html/Hero.html?raw";

export default function Hero() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
