import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: (
    <span style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 800 }}>
      <span style={{ display: "grid", placeItems: "center", width: 28, height: 28, borderRadius: 9, background: "#0f6b49", color: "white", fontSize: 13 }}>OS</span>
      OBAOL Supreme
    </span>
  ),
  // project: {
  //   link: "https://www.instagram.com/obaol_supreme/",
  // },
  // chat: {
  //   link: "https://discord.com",
  // },
  // docsRepositoryBase: "https://github.com/shuding/nextra-docs-template",
  footer: {
    text: "OBAOL Supreme · Department Operations Portal",
  },
  primaryHue: 155,
  useNextSeoProps() {
    return { titleTemplate: "%s · OBAOL Supreme" };
  },
};

export default config;
