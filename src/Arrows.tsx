export function Arrows({ chars }: { chars: Array<string> }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 666 666"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.7 }}
      id="arrows"
      onTouchMove={(evt) => {
        document.body.focus()
        if (evt.touches[0].clientY < 300 && evt.touches[0].clientY > 100)
        console.log(evt.touches[0].clientX, evt.touches[0].clientY, evt.currentTarget.id)
      }}
      // onTouchStartCapture={console.log}
      // onTouchMoveCapture={console.log}
    >
      <path
        d="M396 0H270C256.745 0 246 10.7452 246 24V246L333 333L420 246V24C420 10.7452 409.255 0 396 0Z"
        fill="url(#paint0_linear_0_1)"
        filter={
          chars.includes("W")
            ? "brightness(0.5) drop-shadow(2px 4px 6px black)"
            : undefined
        }
        id="top"
      />
      <path
        d="M666 396L666 270C666 256.745 655.255 246 642 246L420 246L333 333L420 420L642 420C655.255 420 666 409.255 666 396Z"
        fill="url(#paint1_linear_0_1)"
        filter={
          chars.includes("D")
            ? "brightness(0.5) drop-shadow(2px 4px 6px black)"
            : undefined
        }
      />
      <path
        d="M396 666L270 666C256.745 666 246 655.255 246 642L246 420L333 333L420 420L420 642C420 655.255 409.255 666 396 666Z"
        fill="url(#paint2_linear_0_1)"
        filter={
          chars.includes("S")
            ? "brightness(0.5) drop-shadow(2px 4px 6px black)"
            : undefined
        }
      />
      <path
        d="M-3.27835e-05 396L-5.24537e-06 270C-2.34843e-06 256.745 10.7452 246 24 246L246 246L333 333L246 420L24 420C10.7451 420 -3.56805e-05 409.255 -3.27835e-05 396Z"
        fill="url(#paint3_linear_0_1)"
        filter={
          chars.includes("A")
            ? "brightness(0.5) drop-shadow(2px 4px 6px black)"
            : undefined
        }
      />
      <defs>
        <linearGradient
          id="paint0_linear_0_1"
          x1="333"
          y1="0"
          x2="333"
          y2="333"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#D9D9D9" />
          <stop offset="1" stop-color="#D9D9D9" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_0_1"
          x1="666"
          y1="333"
          x2="333"
          y2="333"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#D9D9D9" />
          <stop offset="1" stop-color="#D9D9D9" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_0_1"
          x1="333"
          y1="666"
          x2="333"
          y2="333"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#D9D9D9" />
          <stop offset="1" stop-color="#D9D9D9" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_0_1"
          x1="-1.90145e-05"
          y1="333"
          x2="333"
          y2="333"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#D9D9D9" />
          <stop offset="1" stop-color="#D9D9D9" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
