import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";

export default function App() {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = "Ocurrió un error inesperado al cargar la aplicación.";
  let errorDetails = "";

  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} ${error.statusText}`;
    errorDetails = typeof error.data === "string" ? error.data : JSON.stringify(error.data);
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorDetails = error.stack || "";
  }

  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Error - Ciudades Colombia</title>
        <Meta />
        <Links />
      </head>
      <body style={{ fontFamily: "system-ui, -apple-system, sans-serif", padding: "2rem", color: "#202223", backgroundColor: "#f6f6f7" }}>
        <div style={{ maxWidth: "700px", margin: "2rem auto", border: "1px solid #dcdfe3", borderRadius: "8px", padding: "2rem", background: "#ffffff", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
          <h2 style={{ color: "#ba1a1a", marginTop: 0, fontSize: "20px" }}>Error en la aplicación</h2>
          <p style={{ fontSize: "14px", color: "#616161", marginBottom: "1rem" }}>
            El servidor encontró un inconveniente al procesar la solicitud:
          </p>
          <div style={{ background: "#fef1f1", color: "#ba1a1a", padding: "0.75rem 1rem", borderRadius: "6px", fontSize: "14px", fontWeight: 600, border: "1px solid #fed2d2" }}>
            {errorMessage}
          </div>
          {errorDetails && (
            <pre style={{
              background: "#202223",
              color: "#f6f6f7",
              padding: "1rem",
              borderRadius: "6px",
              overflow: "auto",
              fontSize: "12px",
              marginTop: "1rem",
              maxHeight: "260px"
            }}>
              {errorDetails}
            </pre>
          )}
        </div>
        <Scripts />
      </body>
    </html>
  );
}

