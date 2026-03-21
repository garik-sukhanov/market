import { isRouteErrorResponse, useRouteError } from "react-router";

function getRouteErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message || error.name;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Unknown error";
}

export function RouteErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div role="alert" style={{ textWrap: "wrap", wordBreak: "break-word" }}>
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>
          {error.status} {error.statusText}
        </pre>
      </div>
    );
  }

  return (
    <div role="alert" style={{ textWrap: "wrap", wordBreak: "break-word" }}>
      <p>Something went wrong:</p>
      <p style={{ color: "red" }}>{getRouteErrorMessage(error)}</p>
    </div>
  );
}
