import { type FallbackProps } from "react-error-boundary";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message || error.name;
  }

  if (typeof error === "string") {
    return error;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

export function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert" style={{ textWrap: "wrap", wordBreak: "break-word" }}>
      <p>Something went wrong:</p>
      <p style={{ color: "red" }}>{getErrorMessage(error)}</p>
      <button onClick={resetErrorBoundary}>Retry</button>
    </div>
  );
}
