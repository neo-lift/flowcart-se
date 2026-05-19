import markup from "./html/WoocommerceIntegration.html?raw";

export default function WooCommerceIntegration() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
