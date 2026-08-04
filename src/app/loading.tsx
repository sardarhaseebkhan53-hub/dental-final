export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-alt">
      <div className="text-center">
        <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center animate-pulse">
          <svg
            className="h-8 w-8 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
            <circle cx="12" cy="9" r="2" />
          </svg>
        </div>
        <div className="h-1 w-32 bg-surface-muted rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-primary rounded-full animate-shimmer"
            style={{ width: "60%" }}
          />
        </div>
      </div>
    </div>
  );
}
