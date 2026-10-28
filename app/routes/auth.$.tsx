import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return null;
};

export default function Auth() {
  return null;
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};

export function ErrorBoundary() {
  const error = useRouteError();
  try {
    return boundary.error(error);
  } catch {
    return (
      <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
        <h2>Error de autenticación</h2>
        <p>{error instanceof Error ? error.message : "Error inesperado"}</p>
      </div>
    );
  }
}

