import markup from "./html/Pricing.html?raw";

export default function Pricing() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
