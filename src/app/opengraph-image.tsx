import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#FAFAF9",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 56,
            height: 56,
            borderRadius: 12,
            backgroundColor: "#1F3A5F",
            color: "#FFFFFF",
            fontSize: 24,
            fontWeight: 700,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          FS
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: "#14151A",
            marginBottom: 16,
          }}
        >
          Fatima Shaikh
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#1F3A5F",
            marginBottom: 32,
          }}
        >
          Software Engineer — Backend, Data Engineering &amp; AI
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#5B5D66",
          }}
        >
          fatimashaikh.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
