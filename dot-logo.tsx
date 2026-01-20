import React, { useMemo, useRef, useId } from "react";

// Dot-matrix logo that mimics the "Array" dotted aesthetic using an SVG text mask.
// Drop this component anywhere in your Next.js/React app.
// Props let you tweak density, dot size, spacing, and export the SVG as a file.

export type DotLogoProps = {
  text?: string; // default: "VishwaDev"
  width?: number; // pixel width of the SVG viewport
  height?: number; // pixel height of the SVG viewport
  dotRadius?: number; // radius of each dot (in px)
  gridGap?: number; // gap between dot centers (in px)
  margin?: number; // padding around text (in px)
  fontFamily?: string; // any installed/loaded font
  fontWeight?: number | string; // 700..900 recommended for bold/wide look
  letterSpacing?: number; // in em units (applied to text via SVG attribute)
  fillColor?: string; // color of dots
  bgColor?: string; // background color
  rounded?: boolean; // if true, slightly rounds the outer mask edges
};

const DEFAULTS: Required<Omit<DotLogoProps, "text" | "fontFamily" | "fontWeight" | "letterSpacing">> = {
  width: 1400,
  height: 360,
  dotRadius: 7,
  gridGap: 18,
  margin: 24,
  fillColor: "#F2F0E6", // warm off-white similar to the screenshot
  bgColor: "#0E0E0E",
  rounded: true,
};

export default function DotLogo({
  text = "VishwaDev",
  width = DEFAULTS.width,
  height = DEFAULTS.height,
  dotRadius = DEFAULTS.dotRadius,
  gridGap = DEFAULTS.gridGap,
  margin = DEFAULTS.margin,
  fontFamily = "Poppins, Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
  fontWeight = 900,
  letterSpacing = 0,
  fillColor = DEFAULTS.fillColor,
  bgColor = DEFAULTS.bgColor,
  rounded = DEFAULTS.rounded,
}: DotLogoProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Compute grid of dot centers to fully cover the viewport
  const grid = useMemo(() => {
    const dots: { x: number; y: number }[] = [];
    const startX = margin + dotRadius;
    const startY = margin + dotRadius;
    const endX = width - margin - dotRadius;
    const endY = height - margin - dotRadius;

    for (let y = startY; y <= endY; y += gridGap) {
      for (let x = startX; x <= endX; x += gridGap) {
        dots.push({ x, y });
      }
    }
    return dots;
  }, [width, height, margin, dotRadius, gridGap]);

  const downloadSVG = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgRef.current);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${text.replace(/\s+/g, "-").toLowerCase()}-dot-logo.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };


  // For accessibility, expose text via <title> and use stable IDs for hydration
  const reactId = useId();
  const titleId = `title-${reactId}`;
  const maskId = `mask-${reactId}`;

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full rounded-2xl shadow-xl p-4" style={{ background: bgColor }}>
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          role="img"
          aria-labelledby={titleId}
        >
          <title id={titleId}>{text}</title>

          {/* Background */}
          <rect x="0" y="0" width={width} height={height} fill={bgColor} rx={rounded ? 24 : 0} />

          {/* Mask that reveals dots only where text is drawn */}
          <mask id={maskId} maskUnits="userSpaceOnUse">
            {/* Mask starts fully transparent (black) */}
            <rect x="0" y="0" width={width} height={height} fill="black" />
            {/* Text becomes the white area that reveals the dots */}
            <text
              x="50%"
              y="53%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily={fontFamily}
              fontWeight={fontWeight as number | string}
              fontSize={Math.min(width, height) * 0.48}
              letterSpacing={`${letterSpacing}em`}
              fill="white"
            >
              {text}
            </text>
          </mask>

          {/* Dots grid, masked by the text */}
          <g mask={`url(#${maskId})`}>
            {grid.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={dotRadius} fill={fillColor} />
            ))}
          </g>
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={downloadSVG}
          className="px-4 py-2 rounded-2xl shadow bg-white/10 text-white hover:bg-white/20 transition"
        >
          Download SVG
        </button>
      </div>

      <div className="text-sm text-center text-neutral-400 max-w-2xl">
        <p>
          Tip: To get closer to the exact &ldquo;Array&rdquo; vibe, load a super-bold, wide, rounded font (e.g., a paid
          license of ITF Array, or a free alternative like Rubik Dots / DotGothic16) and pass its name via
          <code className="mx-1">fontFamily</code>. Tune <code className="mx-1">dotRadius</code> and <code className="mx-1">gridGap</code> for density.
        </p>
      </div>
    </div>
  );
}
