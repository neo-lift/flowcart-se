import markup from "./html/FeaturesDarkSection.html?raw";

export default function Features() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
