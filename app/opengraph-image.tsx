import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { TAGLINE } from "@/lib/config/brand";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Render per-request rather than at build time — avoids an @vercel/og
// asset-resolution bug hit during static prerendering in some environments.
export const dynamic = "force-dynamic";

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
          <span style={{ color: "#C85A28", fontSize: 76, fontFamily: "Montserrat", fontWeight: 700 }}>
            buy
          </span>
          <svg
            width="58"
            height="42"
            viewBox="0 0 22 16"
            fill="none"
            style={{ margin: "0 16px" }}
          >
            <path d="M1 5.5H19" stroke="#C85A28" strokeWidth="2.6" strokeLinecap="round" />
            <path
              d="M14.5 1L19 5.5L14.5 10"
              stroke="#C85A28"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M21 10.5H3" stroke="#C85A28" strokeWidth="2.6" strokeLinecap="round" />
            <path
              d="M7.5 15L3 10.5L7.5 6"
              stroke="#C85A28"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              color: "#C85A28",
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
          <span style={{ color: "#C85A28", fontSize: 42, fontFamily: "Montserrat", fontWeight: 700 }}>
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
