import { ImageResponse } from "next/og";

export const alt = "Revanio — Old software, made modern";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const sq = (bg: string) => ({ width: 40, height: 40, borderRadius: 8, background: bg });
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "space-between", background: "#0b0917", padding: "76px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ display: "flex", flexWrap: "wrap", width: 88, height: 88, gap: 8 }}>
            <div style={sq("#ece9f6")} />
            <div style={sq("#a78bfa")} />
            <div style={sq("#ece9f6")} />
            <div style={sq("#ece9f6")} />
          </div>
          <div style={{ fontSize: 50, color: "#ece9f6", fontWeight: 700, letterSpacing: "-2px" }}>Revanio</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, color: "#ece9f6", lineHeight: 1.02, letterSpacing: "-4px" }}>Old software,</div>
          <div style={{ fontSize: 92, color: "#a78bfa", lineHeight: 1.02, letterSpacing: "-4px" }}>made modern.</div>
        </div>

        <div style={{ fontSize: 30, color: "#9c97b2", letterSpacing: "-0.5px" }}>
          Free 48-hour audit · Zero downtime · revanio.com
        </div>
      </div>
    ),
    { ...size }
  );
}
