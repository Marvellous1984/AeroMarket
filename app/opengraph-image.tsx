import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { TAGLINE } from "@/lib/config/brand";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Render per-request rather than at build time — avoids an @vercel/og
// asset-resolution bug hit during static prerendering in some environments.
export const dynamic = "force-dynamic";

const ORANGE = "#C85A28";

export default async function Image() {
  const [bold, regular] = await Promise.all([
    readFile(path.join(process.cwd(), "app/assets/Montserrat-Bold.ttf")),
    readFile(path.join(process.cwd(), "app/assets/Montserrat-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#182230",
          padding: "0 90px",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={{ color: ORANGE, fontSize: 76, fontFamily: "Montserrat", fontWeight: 700 }}>
            buy
          </span>

          {/* exchange arrows, built from plain boxes/borders */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
              margin: "0 20px",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: 40, height: 7, backgroundColor: ORANGE }} />
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "6px solid transparent",
                  borderBottom: "6px solid transparent",
                  borderLeft: `11px solid ${ORANGE}`,
                }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "6px solid transparent",
                  borderBottom: "6px solid transparent",
                  borderRight: `11px solid ${ORANGE}`,
                }}
              />
              <div style={{ width: 40, height: 7, backgroundColor: ORANGE }} />
            </div>
          </div>

          <span
            style={{
              color: ORANGE,
              fontSize: 76,
              fontFamily: "Montserrat",
              fontWeight: 700,
              marginRight: 16,
            }}
          >
            sell
          </span>
          <span style={{ color: "#ffffff", fontSize: 76, fontFamily: "Montserrat", fontWeight: 700 }}>
            aircraft
          </span>
          <span style={{ color: ORANGE, fontSize: 42, fontFamily: "Montserrat", fontWeight: 700 }}>
            .com
          </span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontFamily: "Montserrat",
            fontWeight: 400,
            fontSize: 32,
            color: "#c3cad2",
          }}
        >
          {TAGLINE}
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height,
      fonts: [
        { name: "Montserrat", data: bold, weight: 700, style: "normal" },
        { name: "Montserrat", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
