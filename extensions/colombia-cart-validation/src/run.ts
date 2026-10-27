// @ts-check

/**
 * @typedef {Object} FunctionRunResult
 * @property {Array<{message: string, target: string}>} errors
 */

/**
 * Función de Validación en Checkout para Colombia (DANE DIVIPOLA)
 * Verifica que las órdenes con destino en Colombia tengan una ciudad y código válidos.
 *
 * @param {any} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const errors = [];

  const deliveryGroups = input.cart?.deliveryGroups || [];
  for (const group of deliveryGroups) {
    const address = group.deliveryAddress;
    if (!address) continue;

    // Solo validar si el país es Colombia (CO)
    if (address.countryCode === "CO") {
      if (!address.city || address.city.trim().length === 0) {
        errors.push({
          message: "Debes ingresar una ciudad o municipio válido de Colombia.",
          target: "cart.deliveryGroups[0].deliveryAddress.city",
        });
      }

      if (!address.provinceCode && !address.province) {
        errors.push({
          message: "Debes seleccionar un departamento oficial de Colombia.",
          target: "cart.deliveryGroups[0].deliveryAddress.province",
        });
      }
    }
  }

  return { errors };
}
