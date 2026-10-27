import type { LoaderFunctionArgs } from "react-router";
import { DEPARTMENTS, getDepartmentById } from "../data/departments";
import { CITIES, getCitiesByDepartment, searchCities, getCityById } from "../data/cities";
import { NEIGHBORHOODS, getNeighborhoodsByCity, searchNeighborhoods } from "../data/neighborhoods";

/**
 * Endpoint de API REST para consultar ubicaciones de Colombia
 * Soporta CORS para solicitudes desde el Theme App Extension / Storefront
 *
 * Parámetros soportados (GET):
 * - type: "departments" | "cities" | "neighborhoods" | "search" | "validate"
 * - departmentId: código DANE de departamento (2 dígitos)
 * - cityId: código DANE de municipio (5 dígitos)
 * - query: texto de búsqueda
 */
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const type = url.searchParams.get("type") || "departments";
  const departmentId = url.searchParams.get("departmentId");
  const cityId = url.searchParams.get("cityId");
  const query = url.searchParams.get("query") || "";

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "public, max-age=86400, s-maxage=604800", // Cache por 7 días
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let result: unknown = null;

    switch (type) {
      case "departments": {
        result = DEPARTMENTS;
        break;
      }

      case "cities": {
        if (departmentId) {
          result = getCitiesByDepartment(departmentId);
        } else {
          result = CITIES;
        }
        break;
      }

      case "neighborhoods": {
        if (cityId) {
          result = getNeighborhoodsByCity(cityId);
        } else {
          result = NEIGHBORHOODS;
        }
        break;
      }

      case "search": {
        if (!query.trim()) {
          result = [];
        } else {
          result = searchCities(query, departmentId || undefined);
        }
        break;
      }

      case "validate": {
        // Valida si un par departamento + ciudad es oficial DANE
        const targetCity = cityId ? getCityById(cityId) : null;
        const targetDept = departmentId ? getDepartmentById(departmentId) : null;

        const isValid = !!(
          targetCity &&
          (!departmentId || targetCity.departmentId === departmentId)
        );

        result = {
          valid: isValid,
          city: targetCity,
          department: targetDept || (targetCity ? getDepartmentById(targetCity.departmentId) : null),
        };
        break;
      }

      default:
        return new Response(
          JSON.stringify({ error: "Tipo de consulta inválido" }),
          { status: 400, headers: corsHeaders }
        );
    }

    return new Response(JSON.stringify({ success: true, data: result }), {
      headers: corsHeaders,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Error interno",
      }),
      { status: 500, headers: corsHeaders }
    );
  }
};
