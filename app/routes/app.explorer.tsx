import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { useState, useMemo } from "react";
import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  InlineStack,
  TextField,
  Select,
  Badge,
  DataTable,
  Box,
  Divider,
  Banner,
  EmptyState,
  Pagination,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { DEPARTMENTS } from "../data/departments";
import { CITIES } from "../data/cities";
import { NEIGHBORHOODS } from "../data/neighborhoods";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return {
    departments: DEPARTMENTS,
    totalCities: CITIES.length,
    totalNeighborhoods: NEIGHBORHOODS.length,
  };
};

export default function Explorer() {
  const { departments, totalCities, totalNeighborhoods } = useLoaderData<typeof loader>();

  const [selectedDept, setSelectedDept] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 20;

  const departmentOptions = useMemo(() => {
    return [
      { label: "Todos los departamentos (33)", value: "ALL" },
      ...departments.map((d) => ({
        label: `${d.name} (${d.id})`,
        value: d.id,
      })),
    ];
  }, [departments]);

  const filteredCities = useMemo(() => {
    const q = searchQuery
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return CITIES.filter((city) => {
      if (selectedDept !== "ALL" && city.departmentId !== selectedDept) {
        return false;
      }
      if (!q) return true;

      const cityNameNorm = city.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const deptNameNorm = (city.departmentName || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      return (
        cityNameNorm.includes(q) ||
        deptNameNorm.includes(q) ||
        city.id.includes(q)
      );
    });
  }, [selectedDept, searchQuery]);

  const totalPages = Math.ceil(filteredCities.length / rowsPerPage) || 1;
  const paginatedCities = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredCities.slice(start, start + rowsPerPage);
  }, [filteredCities, currentPage]);

  const tableRows = paginatedCities.map((c) => {
    const deptObj = departments.find((d) => d.id === c.departmentId);
    const nCount = NEIGHBORHOODS.filter((n) => n.cityId === c.id).length;

    return [
      <Badge tone="info" key={`code-${c.id}`}>{c.id}</Badge>,
      <Text as="span" fontWeight="bold" key={`name-${c.id}`}>{c.name}</Text>,
      deptObj?.name || c.departmentId,
      <Badge key={`dept-${c.id}`}>{c.departmentId}</Badge>,
      nCount > 0 ? (
        <Badge tone="success" key={`nb-${c.id}`}>{`${nCount} barrios`}</Badge>
      ) : (
        <Text as="span" tone="subdued" key={`nb-${c.id}`}>General</Text>
      ),
    ];
  });

  return (
    <Page
      title="Explorador DANE Colombia"
      backAction={{ content: "Inicio", url: "/app" }}
      subtitle="Consulta oficial de 33 Departamentos, 1,122+ Municipios y Códigos DIVIPOLA"
    >
      <BlockStack gap="500">
        <Banner tone="info" title="División Político-Administrativa de Colombia (DIVIPOLA)">
          <p>
            Esta base de datos oficial garantiza que los pedidos coincidan con el formato requerido por transportadoras colombianas como <strong>Servientrega</strong>, <strong>Coordinadora</strong>, <strong>TCC</strong>, <strong>Envía</strong> e <strong>Inter Rapidísimo</strong>.
          </p>
        </Banner>

        <Card>
          <BlockStack gap="400">
            <InlineStack gap="400" align="space-between">
              <Box minWidth="260px">
                <Select
                  label="Filtrar por Departamento"
                  options={departmentOptions}
                  value={selectedDept}
                  onChange={(val) => {
                    setSelectedDept(val);
                    setCurrentPage(1);
                  }}
                />
              </Box>

              <Box minWidth="260px">
                <TextField
                  label="Buscar por Municipio o Código DANE"
                  value={searchQuery}
                  onChange={(val) => {
                    setSearchQuery(val);
                    setCurrentPage(1);
                  }}
                  autoComplete="off"
                  placeholder="Ej: Medellín, 05001, Cali, 11001..."
                  clearButton
                  onClearButtonClick={() => setSearchQuery("")}
                />
              </Box>
            </InlineStack>

            <Divider />

            <InlineStack align="space-between" blockAlign="center">
              <Text as="p" variant="bodyMd" tone="subdued">
                Mostrando {filteredCities.length} municipios encontrados
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                Página {currentPage} de {totalPages}
              </Text>
            </InlineStack>

            {paginatedCities.length > 0 ? (
              <DataTable
                columnContentTypes={["text", "text", "text", "text", "text"]}
                headings={[
                  "Código DANE",
                  "Municipio",
                  "Departamento",
                  "Cód. Depto",
                  "Barrios / Cobertura",
                ]}
                rows={tableRows}
              />
            ) : (
              <EmptyState
                heading="No se encontraron municipios"
                image="https://cdn.shopify.com/s/files/1/0262/4071/2764/files/emptystate-files.png"
              >
                <p>Intenta con otro término de búsqueda o selecciona otro departamento.</p>
              </EmptyState>
            )}

            {totalPages > 1 && (
              <Box paddingBlockStart="300">
                <InlineStack align="center">
                  <Pagination
                    hasPrevious={currentPage > 1}
                    onPrevious={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    hasNext={currentPage < totalPages}
                    onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  />
                </InlineStack>
              </Box>
            )}
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}
