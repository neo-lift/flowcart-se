import markup from "./html/SocialProof.html?raw";

export default function SocialProof() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
