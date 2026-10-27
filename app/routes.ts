import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // App layout and its child views
  layout("routes/app.tsx", [
    index("routes/app._index.tsx"),
    route("settings", "routes/app.settings.tsx"),
    route("explorer", "routes/app.explorer.tsx"),
    route("zones", "routes/app.zones.tsx"),
  ]),

  // Auth catch-all
  route("auth/*", "routes/auth.$.tsx"),

  // Webhooks
  route("webhooks/app/uninstalled", "routes/webhooks.app.uninstalled.tsx"),

  // API endpoints
  route("api/locations", "routes/api.locations.ts"),
] satisfies RouteConfig;
