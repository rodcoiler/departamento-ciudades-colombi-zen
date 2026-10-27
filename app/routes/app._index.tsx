import type { LoaderFunctionArgs } from "react-router";
import { Form, useLoaderData } from "react-router";
import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Badge,
  Box,
  Divider,
  Banner,
  Icon,
  Button,
  InlineGrid,
  Thumbnail,
} from "@shopify/polaris";
import {
  LocationIcon,
  CheckCircleIcon,
  DeliveryIcon,
  PaymentIcon,
  SettingsIcon,
  GlobeIcon,
} from "@shopify/polaris-icons";

import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  // Get or create app settings
  let settings = await prisma.appSettings.findUnique({
    where: { shop },
  });

  if (!settings) {
    settings = await prisma.appSettings.create({
      data: { shop },
    });
  }

  // Count zones
  const deliveryZoneCount = await prisma.deliveryZone.count({
    where: { shop },
  });
  const paymentZoneCount = await prisma.paymentZone.count({
    where: { shop },
  });

  return {
    shop,
    settings,
    stats: {
      departamentos: 33,
      municipios: 1122,
      barriosCiudades: 6,
      deliveryZones: deliveryZoneCount,
      paymentZones: paymentZoneCount,
    },
  };
};

export default function Index() {
  const { shop, settings, stats } = useLoaderData<typeof loader>();

  return (
    <Page title="🇨🇴 Departamentos y Ciudades de Colombia">
      <BlockStack gap="500">
        {/* Welcome Banner */}
        <Banner
          title="¡Bienvenido a la solución de direcciones para Colombia!"
          tone="success"
        >
          <p>
            Esta app normaliza las direcciones de tus clientes usando los
            códigos DANE oficiales, reduciendo errores en envíos y generación
            de guías con transportadoras colombianas.
          </p>
        </Banner>

        {/* Stats Grid */}
        <InlineGrid columns={{ xs: 1, sm: 2, md: 4 }} gap="400">
          <Card>
            <BlockStack gap="200">
              <InlineStack align="space-between">
                <Text as="h3" variant="headingSm">
                  Departamentos
                </Text>
                <Icon source={GlobeIcon} tone="base" />
              </InlineStack>
              <Text as="p" variant="heading2xl" fontWeight="bold">
                {stats.departamentos}
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                Departamentos DANE oficiales
              </Text>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="200">
              <InlineStack align="space-between">
                <Text as="h3" variant="headingSm">
                  Municipios
                </Text>
                <Icon source={LocationIcon} tone="base" />
              </InlineStack>
              <Text as="p" variant="heading2xl" fontWeight="bold">
                {stats.municipios.toLocaleString()}
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                Ciudades y municipios con código DANE
              </Text>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="200">
              <InlineStack align="space-between">
                <Text as="h3" variant="headingSm">
                  Barrios
                </Text>
                <Icon source={LocationIcon} tone="base" />
              </InlineStack>
              <Text as="p" variant="heading2xl" fontWeight="bold">
                {stats.barriosCiudades}
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                Ciudades principales con barrios
              </Text>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="200">
              <InlineStack align="space-between">
                <Text as="h3" variant="headingSm">
                  Zonas de Envío
                </Text>
                <Icon source={DeliveryIcon} tone="base" />
              </InlineStack>
              <Text as="p" variant="heading2xl" fontWeight="bold">
                {stats.deliveryZones}
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                Zonas de envío configuradas
              </Text>
            </BlockStack>
          </Card>
        </InlineGrid>

        {/* Features Status */}
        <Layout>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">
                  Estado de los Pilares
                </Text>
                <Divider />

                {/* Pilar 1 */}
                <InlineStack align="space-between" blockAlign="center">
                  <InlineStack gap="300" blockAlign="center">
                    <Icon source={LocationIcon} tone="success" />
                    <BlockStack gap="050">
                      <Text as="h3" variant="headingSm">
                        Selector de Direcciones
                      </Text>
                      <Text as="p" variant="bodySm" tone="subdued">
                        Theme App Extension con selector cascada
                      </Text>
                    </BlockStack>
                  </InlineStack>
                  <Badge tone="success">Activo</Badge>
                </InlineStack>

                <Divider />

                {/* Pilar 2a */}
                <InlineStack align="space-between" blockAlign="center">
                  <InlineStack gap="300" blockAlign="center">
                    <Icon
                      source={CheckCircleIcon}
                      tone={settings.enableValidation ? "success" : "subdued"}
                    />
                    <BlockStack gap="050">
                      <Text as="h3" variant="headingSm">
                        Validación de Checkout
                      </Text>
                      <Text as="p" variant="bodySm" tone="subdued">
                        Verifica ciudad contra diccionario DANE
                      </Text>
                    </BlockStack>
                  </InlineStack>
                  <Badge
                    tone={settings.enableValidation ? "success" : "enabled"}
                  >
                    {settings.enableValidation ? "Activo" : "Inactivo"}
                  </Badge>
                </InlineStack>

                <Divider />

                {/* Pilar 2b */}
                <InlineStack align="space-between" blockAlign="center">
                  <InlineStack gap="300" blockAlign="center">
                    <Icon
                      source={DeliveryIcon}
                      tone={
                        settings.enableDeliveryFilter ? "success" : "subdued"
                      }
                    />
                    <BlockStack gap="050">
                      <Text as="h3" variant="headingSm">
                        Filtro de Envíos
                      </Text>
                      <Text as="p" variant="bodySm" tone="subdued">
                        Filtra opciones de envío por zona DANE
                      </Text>
                    </BlockStack>
                  </InlineStack>
                  <Badge
                    tone={settings.enableDeliveryFilter ? "success" : "enabled"}
                  >
                    {settings.enableDeliveryFilter ? "Activo" : "Inactivo"}
                  </Badge>
                </InlineStack>

                <Divider />

                {/* Pilar 2c */}
                <InlineStack align="space-between" blockAlign="center">
                  <InlineStack gap="300" blockAlign="center">
                    <Icon
                      source={PaymentIcon}
                      tone={
                        settings.enablePaymentFilter ? "success" : "subdued"
                      }
                    />
                    <BlockStack gap="050">
                      <Text as="h3" variant="headingSm">
                        Filtro de Pagos
                      </Text>
                      <Text as="p" variant="bodySm" tone="subdued">
                        Contra Entrega según cobertura
                      </Text>
                    </BlockStack>
                  </InlineStack>
                  <Badge
                    tone={settings.enablePaymentFilter ? "success" : "enabled"}
                  >
                    {settings.enablePaymentFilter ? "Activo" : "Inactivo"}
                  </Badge>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">
                  Acciones Rápidas
                </Text>
                <Divider />

                <BlockStack gap="300">
                  <Button
                    url="/app/settings"
                    icon={SettingsIcon}
                    fullWidth
                    variant="secondary"
                  >
                    Configuración de la App
                  </Button>
                  <Button
                    url="/app/zones"
                    icon={DeliveryIcon}
                    fullWidth
                    variant="secondary"
                  >
                    Gestionar Zonas de Envío
                  </Button>
                  <Button
                    url="/app/explorer"
                    icon={LocationIcon}
                    fullWidth
                    variant="secondary"
                  >
                    Explorar Base de Datos DANE
                  </Button>
                </BlockStack>
              </BlockStack>
            </Card>

            <Box paddingBlockStart="400">
              <Card>
                <BlockStack gap="300">
                  <Text as="h2" variant="headingMd">
                    Compatibilidad
                  </Text>
                  <Divider />
                  <InlineStack gap="200" wrap>
                    <Badge tone="info">Shopify Markets ✓</Badge>
                    <Badge tone="info">Checkout Extensibility ✓</Badge>
                    <Badge tone="info">Todos los planes ✓</Badge>
                  </InlineStack>
                  <Text as="p" variant="bodySm" tone="subdued">
                    Compatible con la depreciación de "Entrega y Fletes"
                    programada para julio 2027. Usa Delivery Customization
                    Functions en lugar de Carrier Service API.
                  </Text>
                </BlockStack>
              </Card>
            </Box>
          </Layout.Section>
        </Layout>

        {/* Info about the DANE data */}
        <Card>
          <BlockStack gap="300">
            <Text as="h2" variant="headingMd">
              Sobre los Datos DANE
            </Text>
            <Text as="p" variant="bodyMd">
              Esta app utiliza la División Político-Administrativa de Colombia
              (DIVIPOLA) del DANE. Los códigos municipales de 5 dígitos
              identifican de forma única cada municipio del país. Los primeros 2
              dígitos corresponden al departamento y los 3 siguientes al
              municipio dentro del departamento.
            </Text>
            <InlineStack gap="200">
              <Badge>Bogotá D.C. → 11001</Badge>
              <Badge>Medellín → 05001</Badge>
              <Badge>Cali → 76001</Badge>
              <Badge>Barranquilla → 08001</Badge>
              <Badge>Cartagena → 13001</Badge>
              <Badge>Bucaramanga → 68001</Badge>
            </InlineStack>
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}
