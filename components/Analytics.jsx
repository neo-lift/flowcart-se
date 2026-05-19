import markup from "./html/Analytics.html?raw";

export default function Analytics() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
