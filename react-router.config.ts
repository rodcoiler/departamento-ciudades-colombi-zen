import type { Config } from "@react-router/dev/config";

export default {
  allowedActionOrigins: [
    "admin.shopify.com",
    "*.admin.shopify.com",
    "*.myshopify.com",
    "**.myshopify.com",
    "departamentos-ciudades-colombia.codigozen.com",
    "localhost:*",
    "localhost",
  ],
} satisfies Config;
