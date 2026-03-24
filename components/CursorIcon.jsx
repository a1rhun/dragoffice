export default function CursorIcon({ size = 20, filled = false, className = '' }) {
  return (
    <svg
      width={size}
      height={Math.ceil(size * 1.15)}
      viewBox="0 0 100 115"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {filled ? (
        <path
          d="M20 8 L20 90 L40 68 L55 102 L67 96 L52 62 L78 62 Z"
          fill="currentColor"
          stroke="#fff"
          strokeWidth="6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M20 8 L20 90 L40 68 L55 102 L67 96 L52 62 L78 62 Z"
          fill="none"
          stroke="#000"
          strokeWidth="6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
