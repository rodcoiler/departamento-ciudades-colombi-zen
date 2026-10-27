// @ts-check

/**
 * @typedef {Object} Operation
 * @property {Object} [hide]
 * @property {string} hide.paymentMethodId
 */

/**
 * Función de Personalización de Métodos de Pago para Colombia
 * Oculta el método "Pago Contra Entrega" (COD) si el destino no cuenta con cobertura.
 *
 * @param {any} input
 * @returns {{ operations: Operation[] }}
 */
export function run(input) {
  const operations = [];

  const codPaymentMethod = input.paymentMethods.find((method) =>
    method.name.toLowerCase().includes("contra entrega") ||
    method.name.toLowerCase().includes("contraentrega") ||
    method.name.toLowerCase().includes("cash on delivery") ||
    method.name.toLowerCase().includes("cod")
  );

  if (!codPaymentMethod) {
    return { operations: [] };
  }

  const daneCode = input.cart?.attribute?.value;
  const deliveryGroups = input.cart?.deliveryGroups || [];

  for (const group of deliveryGroups) {
    const address = group.deliveryAddress;
    if (!address || address.countryCode !== "CO") continue;

    // Departamentos sin recaudo / alto riesgo de devolución
    const isExcludedDepartment =
      address.provinceCode === "SAP" || // San Andrés y Providencia
      address.provinceCode === "AMA" || // Amazonas
      address.provinceCode === "VAU" || // Vaupés
      address.provinceCode === "VIC" || // Vichada
      address.provinceCode === "GUA" || // Guainía
      (daneCode &&
        (daneCode.startsWith("88") ||
          daneCode.startsWith("91") ||
          daneCode.startsWith("97") ||
          daneCode.startsWith("99") ||
          daneCode.startsWith("94")));

    if (isExcludedDepartment) {
      operations.push({
        hide: {
          paymentMethodId: codPaymentMethod.id,
        },
      });
    }
  }

  return { operations };
}
