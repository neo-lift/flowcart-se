import markup from "./html/TopAnnouncementBar.html?raw";

export default function TopBar() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
