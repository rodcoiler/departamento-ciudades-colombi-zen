import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "react-router";
import { forwardRef } from "react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { AppProvider as PolarisAppProvider } from "@shopify/polaris";
import esTranslations from "@shopify/polaris/locales/es.json";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";

import { authenticate } from "../shopify.server";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
};

const PolarisLink = forwardRef<HTMLAnchorElement, any>(
  function PolarisLink({ children, url = "", external, ...rest }, ref) {
    if (external || url.startsWith("http://") || url.startsWith("https://")) {
      return (
        <a href={url} ref={ref} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link to={url} ref={ref} {...rest}>
        {children}
      </Link>
    );
  }
);

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();

  return (
    <AppProvider apiKey={apiKey}>
      <PolarisAppProvider i18n={esTranslations} linkComponent={PolarisLink}>
        <Outlet />
      </PolarisAppProvider>
    </AppProvider>
  );
}

// Shopify needs React Router to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  const error = useRouteError();
  try {
    return boundary.error(error);
  } catch {
    const message = isRouteErrorResponse(error)
      ? `${error.status} ${error.statusText}`
      : error instanceof Error
      ? error.message
      : "Error inesperado en la aplicación";

    return (
      <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
        <h2 style={{ color: "#ba1a1a", marginTop: 0 }}>Error en la aplicación</h2>
        <p>{message}</p>
      </div>
    );
  }
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
