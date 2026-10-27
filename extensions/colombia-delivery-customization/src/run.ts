// @ts-check

/**
 * @typedef {Object} Operation
 * @property {Object} [hide]
 * @property {string} hide.deliveryOptionHandle
 * @property {Object} [rename]
 * @property {string} rename.deliveryOptionHandle
 * @property {string} rename.title
 */

/**
 * Función de Personalización de Tarifas de Envío para Colombia
 * Permite renombrar u ocultar métodos según la zona DANE o códigos remotos.
 * Compatible 100% con Shopify Markets.
 *
 * @param {any} input
 * @returns {{ operations: Operation[] }}
 */
export function run(input) {
  const operations = [];

  const daneCode = input.cart?.attribute?.value;
  const deliveryGroups = input.cart?.deliveryGroups || [];

  for (const group of deliveryGroups) {
    const address = group.deliveryAddress;
    if (!address || address.countryCode !== "CO") continue;

    for (const option of group.deliveryOptions) {
      // Si la dirección es de un trayecto especial (San Andrés, Amazonas, etc.)
      const isSpecialZone =
        address.provinceCode === "SAP" || // San Andrés
        address.provinceCode === "AMA" || // Amazonas
        address.provinceCode === "GUA" || // Guainía / Guaviare
        (daneCode && (daneCode.startsWith("88") || daneCode.startsWith("91")));

      if (isSpecialZone && option.title.toLowerCase().includes("mismo día")) {
        // Ocultar envíos inmediatos en zonas remotas
        operations.push({
          hide: {
            deliveryOptionHandle: option.handle,
          },
        });
      }
    }
  }

  return { operations };
}
