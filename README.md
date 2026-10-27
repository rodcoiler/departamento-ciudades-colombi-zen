# 🇨🇴 Departamentos y Ciudades de Colombia para Shopify

Solución SaaS integral para la Shopify App Store que normaliza direcciones en Colombia usando los códigos oficiales **DANE - DIVIPOLA** (33 Departamentos, 1,122+ Municipios y Barrios para las principales capitales).

Diseñada especialmente para resolver la falta de selector en Shopify, compatible 100% con **Shopify Markets** y preparada para el reemplazo definitivo de la API "Entrega y Fletes" (Carrier Service API) que cerrará en **julio de 2027**.

---

## 🚀 Características Principales

1. **Base de Datos Oficial DANE (DIVIPOLA)**
   - 33 Departamentos de Colombia con sus códigos de 2 dígitos.
   - 1,122+ Municipios con sus códigos oficiales de 5 dígitos (DDMMM).
   - Barrios y Comunas para Bogotá, Medellín, Cali, Barranquilla, Cartagena y Bucaramanga.

2. **Theme App Extension (Pilar 1 - Compatible con todos los planes)**
   - Selector en cascada: *Departamento → Ciudad / Municipio → Barrio*.
   - Guarda automáticamente en `cart.attributes`:
     - `Departamento`
     - `Codigo_Departamento_DANE`
     - `Ciudad`
     - `Codigo_DANE`
     - `Barrio`
   - Integración nativa con temas Online Store 2.0 (Dawn, Debutify, Impulse, etc.).
   - Validación antes del checkout.

3. **Shopify Functions (Pilar 2 - Checkout Extensibility)**
   - **Cart Validation (`cart.validation.run`)**: Impide que el cliente ingrese municipios inexistentes o incongruentes con el departamento.
   - **Delivery Customization (`cart.delivery-options.transform.run`)**: Ajusta y filtra opciones de envío según el trayecto DANE (urbano, regional, trayecto especial).
   - **Payment Customization (`cart.payment-methods.transform.run`)**: Oculta el método "Pago Contra Entrega" (COD) en zonas sin cobertura de recaudo.

4. **Admin Dashboard (Shopify Polaris)**
   - Panel de control con métricas en tiempo real.
   - Explorador interactivo DANE con buscador en vivo.
   - Configuración de zonas de cobertura y transportadoras (Servientrega, Coordinadora, Envía, Inter Rapidísimo, TCC).
   - Reglas de cobertura para Pago Contra Entrega.

---

## 🛠️ Requisitos e Instalación

### Requisitos Previos
- Node.js >= 20.19 o >= 22.12
- Shopify CLI: `npm install -g @shopify/cli`
- Una cuenta en [Shopify Partners](https://partners.shopify.com/)

### Instalación Local
```bash
# Instalar dependencias
npm install

# Generar cliente de base de datos Prisma
npm run setup

# Iniciar servidor de desarrollo conectado a tu tienda de prueba
npm run dev
```

---

## 🚢 Despliegue en Servidor / VPS (CloudPanel / Node.js)

Dominio asignado: `https://departamentos-ciudades-colombia.codigozen.com`

1. Clonar el repositorio en el servidor:
   ```bash
   git clone https://github.com/rodcoiler/departamento-ciudades-colombi-zen.git
   cd departamento-ciudades-colombi-zen
   ```

2. Crear el archivo `.env`:
   ```bash
   cp .env.example .env
   # Editar con tus credenciales de Shopify Partner
   ```

3. Instalar y compilar:
   ```bash
   npm install
   npm run setup
   npm run build
   ```

4. Ejecutar con PM2 o el gestor de Node de CloudPanel:
   ```bash
   pm2 start npm --name "zen-colombia" -- run start
   ```

---

## 📦 Estructura del Proyecto

```
├── app/
│   ├── data/
│   │   ├── departments.ts      # 33 Departamentos DANE
│   │   ├── cities.ts           # 1,122+ Municipios DANE
│   │   └── neighborhoods.ts    # Barrios de Bogotá, Medellín, Cali, etc.
│   ├── routes/
│   │   ├── api.locations.ts    # Endpoint REST para el selector de la tienda
│   │   ├── app._index.tsx      # Dashboard principal Polaris
│   │   ├── app.settings.tsx    # Configuración de validaciones
│   │   ├── app.explorer.tsx    # Buscador interactivo DANE
│   │   └── app.zones.tsx       # Zonas de envío y reglas de pago COD
│   ├── db.server.ts            # Cliente SQLite Prisma
│   └── shopify.server.ts       # Autenticación OAuth con Shopify
├── extensions/
│   ├── colombia-address-selector/       # Theme App Extension (Liquid + JS)
│   ├── colombia-cart-validation/        # Shopify Function (Validación DANE)
│   ├── colombia-delivery-customization/ # Shopify Function (Filtro Envíos)
│   └── colombia-payment-customization/  # Shopify Function (Filtro COD)
├── prisma/
│   └── schema.prisma           # Esquema de base de datos
├── shopify.app.toml            # Configuración de la App Shopify
└── vite.config.ts
```

---

## 📄 Licencia
Propietario / Zen Studio. Todos los derechos reservados.
