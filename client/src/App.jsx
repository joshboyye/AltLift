
function Icon({ name, size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name] || paths.dumbbell} />
    </svg>
  );
}

function Logo() {
  return (
    <span className="brand">
      <span className="brand-mark">
        <svg viewBox="0 0 30 30" aria-hidden="true">
          <path d="m5 23 9-18h5l-9 18zm10 0 6-12 5 12z" fill="currentColor" />
        </svg>
      </span>
      altlift<span className="brand-dot">.</span>
    </span>
  );
}


function ExerciseArt({ kind = "bench", large = false }) {
  const standing = ["squat", "press", "row"].includes(kind);
  return (
    <svg
      className={`exercise-art ${large ? "large" : ""}`}
      viewBox="0 0 240 150"
      fill="none"
      aria-hidden="true"
    >
      <ellipse
        cx="121"
        cy="129"
        rx="86"
        ry="8"
        fill="currentColor"
        opacity=".07"
      />
      <path d="M25 132h190" stroke="currentColor" opacity=".15" />
      {kind === "machine" || kind === "cable" ? (
        <g
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M54 125V27h116v98M54 37h116M142 40v48M83 108h47m-34 0v17"
            opacity=".4"
          />
          <circle cx="105" cy="54" r="10" fill="#d2e7ba" />
          <path d="m105 71-1 29 26 2 7 22m-33-45 21 7 18-19" />
          <path d="M136 62h16" strokeWidth="8" />
        </g>
      ) : standing ? (
        <g
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="120" cy="32" r="10" fill="#d2e7ba" />
          <path
            d={
              kind === "row"
                ? "m120 49-25 32 31 18-10 26m-21-44-7 43m23-65 34 27 5 24"
                : kind === "squat"
                  ? "m119 49-12 32 32 12-13 32m-19-44-20 19 9 25m23-72 28 13"
                  : "M120 49v40m0 0-18 36m18-36 19 36m-20-67-28-9V29m29 29 28-9V29"
            }
          />
          <path
            d={
              kind === "press"
                ? "M80 24h22m35 0h22"
                : kind === "row"
                  ? "M139 112h23"
                  : "M138 59h22"
            }
            strokeWidth="10"
          />
        </g>
      ) : (
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path
            d={
              kind === "floor" || kind === "pushup"
                ? "M56 121h127"
                : "M61 99h110m-98 1-8 27m94-27 8 27"
            }
            strokeWidth="7"
            opacity=".38"
          />
          <circle
            cx={kind === "pushup" ? 72 : 76}
            cy={kind === "pushup" ? 68 : 83}
            r="10"
            fill="#d2e7ba"
            strokeWidth="5"
          />
          <path
            d={
              kind === "pushup"
                ? "m88 74 63 21 29 29m-81-46-14 23-3 23"
                : "m91 89 53 1 23 19-3 17m-25-34 15 24 26 10M104 86l5-36m-1 15 27-15"
            }
            strokeWidth="7"
          />
          <path
            d={kind === "pushup" ? "M68 125h25m76 0h19" : "M98 43h20m8 0h20"}
            strokeWidth="10"
          />
          <path
            d={kind === "pushup" ? "" : "M101 36v14m14-14v14m14-14v14m14-14v14"}
            strokeWidth="4"
          />
        </g>
      )}
    </svg>
  );
}