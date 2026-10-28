import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import { useState } from "react";
import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Button,
  Banner,
  Divider,
  TextField,
  Select,
  Badge,
  DataTable,
  Box,
  EmptyState,
  Checkbox,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";
import { DEPARTMENTS } from "../data/departments";
import { CITIES } from "../data/cities";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  const deliveryZones = await prisma.deliveryZone.findMany({
    where: { shop },
    orderBy: { createdAt: "desc" },
  });

  const paymentZones = await prisma.paymentZone.findMany({
    where: { shop },
    orderBy: { createdAt: "desc" },
  });

  return {
    shop,
    deliveryZones,
    paymentZones,
    departments: DEPARTMENTS,
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;
  const formData = await request.formData();
  const intent = formData.get("intent");

  try {
    if (intent === "createDeliveryZone") {
      const name = formData.get("name") as string;
      const zoneType = formData.get("zoneType") as string;
      const departmentCode = (formData.get("departmentCode") as string) || null;
      const cityCode = (formData.get("cityCode") as string) || null;
      const estimatedDays = (formData.get("estimatedDays") as string) || "1 a 3 días hábiles";

      if (!name) {
        return { success: false, message: "El nombre de la zona es requerido." };
      }

      await prisma.deliveryZone.create({
        data: {
          shop,
          name,
          zoneType,
          departmentCode,
          cityCode,
          estimatedDays,
          isActive: true,
        },
      });

      return { success: true, message: "Zona de envío creada con éxito." };
    }

    if (intent === "deleteDeliveryZone") {
      const id = formData.get("id") as string;
      await prisma.deliveryZone.delete({ where: { id } });
      return { success: true, message: "Zona de envío eliminada." };
    }

    if (intent === "toggleCodPayment") {
      const departmentCode = formData.get("departmentCode") as string;
      const allowCashOnDelivery = formData.get("allowCashOnDelivery") === "true";

      const existing = await prisma.paymentZone.findFirst({
        where: { shop, departmentCode },
      });

      if (existing) {
        await prisma.paymentZone.update({
          where: { id: existing.id },
          data: { allowCashOnDelivery },
        });
      } else {
        await prisma.paymentZone.create({
          data: {
            shop,
            departmentCode,
            allowCashOnDelivery,
          },
        });
      }

      return { success: true, message: "Regla de Contra Entrega actualizada." };
    }

    return { success: false, message: "Acción no reconocida." };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error al procesar",
    };
  }
};

export default function Zones() {
  const { deliveryZones, paymentZones, departments } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Form states
  const [zoneName, setZoneName] = useState("");
  const [zoneType, setZoneType] = useState("urbano");
  const [selectedDept, setSelectedDept] = useState("");
  const [estimatedDays, setEstimatedDays] = useState("1 a 2 días hábiles");

  const deptOptions = [
    { label: "Todos los departamentos (Nacional)", value: "" },
    ...departments.map((d) => ({ label: `${d.name} (${d.id})`, value: d.id })),
  ];

  const zoneTypeOptions = [
    { label: "Urbano / Local (Misma ciudad/capital)", value: "urbano" },
    { label: "Regional (Mismo departamento)", value: "regional" },
    { label: "Nacional (Ciudades principales)", value: "nacional" },
    { label: "Trayecto Especial / Reexpedición", value: "especial" },
  ];

  const deliveryRows = deliveryZones.map((z) => {
    const dept = departments.find((d) => d.id === z.departmentCode);
    return [
      <Text as="span" fontWeight="bold" key={`name-${z.id}`}>{z.name}</Text>,
      <Badge
        tone={
          z.zoneType === "urbano"
            ? "success"
            : z.zoneType === "regional"
            ? "info"
            : z.zoneType === "especial"
            ? "warning"
            : "enabled"
        }
        key={`type-${z.id}`}
      >
        {z.zoneType.toUpperCase()}
      </Badge>,
      dept ? dept.name : "Nacional (Todos)",
      z.estimatedDays || "1-3 días",
      <Form method="post" key={`del-${z.id}`}>
        <input type="hidden" name="intent" value="deleteDeliveryZone" />
        <input type="hidden" name="id" value={z.id} />
        <Button submit tone="critical" variant="plain">
          Eliminar
        </Button>
      </Form>,
    ];
  });

  return (
    <Page
      title="Zonas de Envío y Pagos (Shopify Functions)"
      backAction={{ content: "Inicio", url: "/" }}
      subtitle="Filtra métodos de envío y Pago Contra Entrega según la ubicación DANE"
    >
      <BlockStack gap="500">
        {actionData?.success && (
          <Banner tone="success" title="Éxito">
            <p>{actionData.message}</p>
          </Banner>
        )}
        {actionData?.success === false && (
          <Banner tone="critical" title="Error">
            <p>{actionData.message}</p>
          </Banner>
        )}

        <Banner tone="info" title="Compatible con Shopify Markets">
          <p>
            Estas reglas alimentan las <strong>Shopify Functions</strong> de Delivery Customization y Payment Customization.
            A diferencia de la antigua API Carrier Service (que cerrará en julio de 2027), las Functions se ejecutan dentro de la infraestructura de Shopify sin latencia.
          </p>
        </Banner>

        <Layout>
          {/* Create delivery zone */}
          <Layout.Section variant="oneThird">
            <Card>
              <Form method="post">
                <input type="hidden" name="intent" value="createDeliveryZone" />
                <BlockStack gap="400">
                  <Text as="h2" variant="headingMd">
                    Nueva Zona de Envío
                  </Text>
                  <Divider />

                  <TextField
                    label="Nombre de la Zona"
                    name="name"
                    value={zoneName}
                    onChange={(val) => setZoneName(val)}
                    placeholder="Ej: Envíos Locales Bogotá, Costa Caribe..."
                    autoComplete="off"
                    requiredIndicator
                  />

                  <Select
                    label="Tipo de Trayecto DANE"
                    name="zoneType"
                    options={zoneTypeOptions}
                    value={zoneType}
                    onChange={(val) => setZoneType(val)}
                  />

                  <Select
                    label="Departamento Aplica"
                    name="departmentCode"
                    options={deptOptions}
                    value={selectedDept}
                    onChange={(val) => setSelectedDept(val)}
                  />

                  <TextField
                    label="Tiempo estimado de entrega"
                    name="estimatedDays"
                    value={estimatedDays}
                    onChange={(val) => setEstimatedDays(val)}
                    placeholder="Ej: Mismo día, 1 a 2 días hábiles..."
                    autoComplete="off"
                  />

                  <Button submit variant="primary" loading={isSubmitting}>
                    Crear Zona
                  </Button>
                </BlockStack>
              </Form>
            </Card>
          </Layout.Section>

          {/* Delivery zones list */}
          <Layout.Section variant="twoThirds">
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text as="h2" variant="headingMd">
                    Zonas Configuradas ({deliveryZones.length})
                  </Text>
                </InlineStack>
                <Divider />

                {deliveryZones.length > 0 ? (
                  <DataTable
                    columnContentTypes={["text", "text", "text", "text", "text"]}
                    headings={["Nombre", "Tipo", "Cobertura", "Tiempo Estimado", "Acción"]}
                    rows={deliveryRows}
                  />
                ) : (
                  <EmptyState
                    heading="No tienes zonas de envío configuradas"
                    image="https://cdn.shopify.com/s/files/1/0262/4071/2764/files/emptystate-files.png"
                  >
                    <p>Crea tu primera zona de envío para comenzar a personalizar tarifas por zona DANE.</p>
                  </EmptyState>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>

        {/* Payment / Cash on delivery configuration */}
        <Card>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">
              Cobertura de Pago Contra Entrega (COD)
            </Text>
            <Text as="p" variant="bodyMd" tone="subdued">
              Activa o restringe el pago contra entrega para departamentos específicos. Si un cliente selecciona un municipio en una zona sin cobertura, Shopify ocultará automáticamente el método de pago Contra Entrega.
            </Text>
            <Divider />

            <Layout>
              {departments.slice(0, 8).map((dept) => {
                const rule = paymentZones.find((p) => p.departmentCode === dept.id);
                const isCodAllowed = rule ? rule.allowCashOnDelivery : true;

                return (
                  <Layout.Section variant="oneThird" key={`dept-cod-${dept.id}`}>
                    <Box padding="300" borderWidth="0165" borderColor="border" borderRadius="200">
                      <BlockStack gap="200">
                        <InlineStack align="space-between">
                          <Text as="span" fontWeight="bold">{dept.name}</Text>
                          <Badge tone={isCodAllowed ? "success" : "critical"}>
                            {isCodAllowed ? "COD Activo" : "COD Restringido"}
                          </Badge>
                        </InlineStack>
                        <Form method="post">
                          <input type="hidden" name="intent" value="toggleCodPayment" />
                          <input type="hidden" name="departmentCode" value={dept.id} />
                          <input
                            type="hidden"
                            name="allowCashOnDelivery"
                            value={String(!isCodAllowed)}
                          />
                          <Button submit variant="plain" size="slim">
                            {isCodAllowed ? "Desactivar COD" : "Permitir COD"}
                          </Button>
                        </Form>
                      </BlockStack>
                    </Box>
                  </Layout.Section>
                );
              })}
            </Layout>
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}
