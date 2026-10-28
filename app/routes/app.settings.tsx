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
  Checkbox,
  Button,
  Banner,
  Divider,
  TextField,
  CalloutCard,
  Badge,
  Box,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  let settings = await prisma.appSettings.findUnique({
    where: { shop },
  });

  if (!settings) {
    settings = await prisma.appSettings.create({
      data: { shop },
    });
  }

  return { shop, settings };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;
  const formData = await request.formData();

  const isActive = formData.get("isActive") === "true";
  const enableBarrios = formData.get("enableBarrios") === "true";
  const enableValidation = formData.get("enableValidation") === "true";
  const enableDeliveryFilter = formData.get("enableDeliveryFilter") === "true";
  const enablePaymentFilter = formData.get("enablePaymentFilter") === "true";

  try {
    const updated = await prisma.appSettings.upsert({
      where: { shop },
      update: {
        isActive,
        enableBarrios,
        enableValidation,
        enableDeliveryFilter,
        enablePaymentFilter,
      },
      create: {
        shop,
        isActive,
        enableBarrios,
        enableValidation,
        enableDeliveryFilter,
        enablePaymentFilter,
      },
    });

    return { success: true, message: "Configuración guardada exitosamente." };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error al guardar",
    };
  }
};

export default function Settings() {
  const { settings } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSaving = navigation.state === "submitting";

  const [isActive, setIsActive] = useState(settings.isActive);
  const [enableBarrios, setEnableBarrios] = useState(settings.enableBarrios);
  const [enableValidation, setEnableValidation] = useState(settings.enableValidation);
  const [enableDeliveryFilter, setEnableDeliveryFilter] = useState(settings.enableDeliveryFilter);
  const [enablePaymentFilter, setEnablePaymentFilter] = useState(settings.enablePaymentFilter);

  return (
    <Page
      title="Configuración de la App"
      backAction={{ content: "Inicio", url: "/" }}
      subtitle="Personaliza las reglas de normalización DANE y validación para tu tienda"
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

        <Layout>
          <Layout.AnnotatedSection
            title="Estado General"
            description="Activa o desactiva la aplicación y el selector de departamentos en tu tienda."
          >
            <Card>
              <BlockStack gap="400">
                <Checkbox
                  label="Activar Selector de Departamentos y Ciudades de Colombia"
                  helpText="Muestra el selector interactivo en el carrito y página de producto para capturar el código DANE oficial."
                  checked={isActive}
                  onChange={(val) => setIsActive(val)}
                />

                <Divider />

                <InlineStack align="space-between">
                  <Text as="span" variant="bodyMd">Estado actual en Storefront:</Text>
                  <Badge tone={isActive ? "success" : "attention"}>
                    {isActive ? "Activo en tienda" : "Desactivado"}
                  </Badge>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.AnnotatedSection>

          <Layout.AnnotatedSection
            title="Nivel de Detalle Territorial"
            description="Configura si deseas solicitar el barrio o comuna para ciudades principales."
          >
            <Card>
              <BlockStack gap="400">
                <Checkbox
                  label="Habilitar Selector de Barrios y Comunas"
                  helpText="Para Bogotá (Localidades), Medellín (Comunas), Cali, Barranquilla, Bucaramanga y Cartagena, solicita al cliente su barrio específico."
                  checked={enableBarrios}
                  onChange={(val) => setEnableBarrios(val)}
                  disabled={!isActive}
                />
                <Text as="p" variant="bodySm" tone="subdued">
                  El barrio se guarda como atributo del pedido (<code>cart.attributes["Barrio"]</code>) facilitando la entrega a transportadoras como Coordinadora, Servientrega e Inter Rapidísimo.
                </Text>
              </BlockStack>
            </Card>
          </Layout.AnnotatedSection>

          <Layout.AnnotatedSection
            title="Validación y Shopify Functions"
            description="Reglas nativas de validación y control de opciones de envío/pago (Checkout Extensibility)."
          >
            <Card>
              <BlockStack gap="400">
                <Checkbox
                  label="Validación DANE en Checkout (Cart Validation Function)"
                  helpText="Impide finalizar el pedido si la combinación de Departamento y Municipio no existe en la base de datos oficial del DANE."
                  checked={enableValidation}
                  onChange={(val) => setEnableValidation(val)}
                  disabled={!isActive}
                />

                <Divider />

                <Checkbox
                  label="Filtrado de Tarifas de Envío (Delivery Customization)"
                  helpText="Oculta o renombra tarifas de envío que no aplican para la zona DANE destino (urbano vs regional vs trayecto especial)."
                  checked={enableDeliveryFilter}
                  onChange={(val) => setEnableDeliveryFilter(val)}
                  disabled={!isActive}
                />

                <Divider />

                <Checkbox
                  label="Filtrado de Métodos de Pago (Payment Customization)"
                  helpText="Oculta el método Pago Contra Entrega (COD) si el municipio de destino no cuenta con cobertura de recaudo."
                  checked={enablePaymentFilter}
                  onChange={(val) => setEnablePaymentFilter(val)}
                  disabled={!isActive}
                />
              </BlockStack>
            </Card>
          </Layout.AnnotatedSection>

          <Layout.AnnotatedSection
            title="Integración en el Tema"
            description="Instrucciones para incrustar el selector visual en las plantillas de tu tienda."
          >
            <CalloutCard
              title="Añadir App Block en el Editor de Temas"
              illustration="https://cdn.shopify.com/s/files/1/0262/4071/2764/files/emptystate-files.png"
              primaryAction={{
                content: "Ir al Editor de Temas",
                url: `https://${settings.shop}/admin/themes/current/editor?context=apps`,
                external: true,
              }}
            >
              <p>
                Ve al Editor de Temas de Shopify en la sección de <strong>Carrito</strong> o <strong>Producto</strong>, pulsa en <em>"Agregar Bloque"</em> de Apps y selecciona <strong>Selector Colombia (DANE)</strong>.
              </p>
            </CalloutCard>
          </Layout.AnnotatedSection>
        </Layout>

        <Form method="post">
          <input type="hidden" name="isActive" value={String(isActive)} />
          <input type="hidden" name="enableBarrios" value={String(enableBarrios)} />
          <input type="hidden" name="enableValidation" value={String(enableValidation)} />
          <input type="hidden" name="enableDeliveryFilter" value={String(enableDeliveryFilter)} />
          <input type="hidden" name="enablePaymentFilter" value={String(enablePaymentFilter)} />

          <InlineStack align="end">
            <Button submit variant="primary" loading={isSaving}>
              Guardar Cambios
            </Button>
          </InlineStack>
        </Form>
      </BlockStack>
    </Page>
  );
}
