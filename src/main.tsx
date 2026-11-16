import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { DesignSystem } from "./app/components/DesignSystem.tsx";
import "./styles/index.css";

const isDesignSystemRoute =
  window.location.pathname.replace(/\/+$/, "") === "/design-system";

if (isDesignSystemRoute) {
  let robotsMeta = document.querySelector<HTMLMetaElement>(
    'meta[name="robots"]'
  );
  if (!robotsMeta) {
    robotsMeta = document.createElement("meta");
    robotsMeta.name = "robots";
    document.head.appendChild(robotsMeta);
  }
  robotsMeta.content = "noindex, nofollow";
  document.title = "tempo — v2.0 Design System & Case Study";
}

createRoot(document.getElementById("root")!).render(
  isDesignSystemRoute ? <DesignSystem /> : <App />
);
