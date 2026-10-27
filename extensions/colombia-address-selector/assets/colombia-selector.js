/**
 * Selector Interactivo de Departamentos, Ciudades y Barrios de Colombia
 * Sincroniza en tiempo real con Shopify Cart Attributes (DANE DIVIPOLA).
 */

(function () {
  // Lista compacta de los 33 departamentos para carga instantánea offline
  const DEPARTMENTS = [
    { id: "05", name: "Antioquia" },
    { id: "08", name: "Atlántico" },
    { id: "11", name: "Bogotá D.C." },
    { id: "13", name: "Bolívar" },
    { id: "15", name: "Boyacá" },
    { id: "17", name: "Caldas" },
    { id: "18", name: "Caquetá" },
    { id: "19", name: "Cauca" },
    { id: "20", name: "Cesar" },
    { id: "23", name: "Córdoba" },
    { id: "25", name: "Cundinamarca" },
    { id: "27", name: "Chocó" },
    { id: "41", name: "Huila" },
    { id: "44", name: "La Guajira" },
    { id: "47", name: "Magdalena" },
    { id: "50", name: "Meta" },
    { id: "52", name: "Nariño" },
    { id: "54", name: "Norte de Santander" },
    { id: "63", name: "Quindío" },
    { id: "66", name: "Risaralda" },
    { id: "68", name: "Santander" },
    { id: "70", name: "Sucre" },
    { id: "73", name: "Tolima" },
    { id: "76", name: "Valle del Cauca" },
    { id: "81", name: "Arauca" },
    { id: "85", name: "Casanare" },
    { id: "86", name: "Putumayo" },
    { id: "88", name: "San Andrés y Providencia" },
    { id: "91", name: "Amazonas" },
    { id: "94", name: "Guainía" },
    { id: "95", name: "Guaviare" },
    { id: "97", name: "Vaupés" },
    { id: "99", name: "Vichada" },
  ];

  function initZenColombiaSelector() {
    const containers = document.querySelectorAll(".zen-colombia-selector-container");

    containers.forEach((container) => {
      const blockId = container.dataset.blockId;
      const appUrl = container.dataset.appUrl;
      const enableBarrios = container.dataset.enableBarrios === "true";
      const isRequired = container.dataset.required === "true";

      const deptSelect = document.getElementById(`zen-department-select-${blockId}`);
      const citySelect = document.getElementById(`zen-city-select-${blockId}`);
      const barrioGroup = document.getElementById(`zen-barrio-group-${blockId}`);
      const barrioSelect = document.getElementById(`zen-barrio-select-${blockId}`);
      const barrioInput = document.getElementById(`zen-barrio-input-${blockId}`);
      const daneBadge = document.getElementById(`zen-dane-badge-${blockId}`);
      const badgeText = document.getElementById(`zen-badge-text-${blockId}`);
      const feedback = document.getElementById(`zen-feedback-${blockId}`);

      if (!deptSelect || !citySelect) return;

      // 1. Poblar departamentos
      deptSelect.innerHTML = '<option value="">Selecciona tu departamento...</option>';
      DEPARTMENTS.forEach((dept) => {
        const opt = document.createElement("option");
        opt.value = dept.id;
        opt.textContent = `${dept.name}`;
        deptSelect.appendChild(opt);
      });

      // 2. Al cambiar departamento: Cargar municipios
      deptSelect.addEventListener("change", async function () {
        const deptId = this.value;
        const selectedDept = DEPARTMENTS.find((d) => d.id === deptId);

        citySelect.innerHTML = '<option value="">Cargando municipios...</option>';
        citySelect.disabled = true;
        if (barrioGroup) barrioGroup.style.display = "none";
        if (daneBadge) daneBadge.style.display = "none";

        if (!deptId) {
          citySelect.innerHTML = '<option value="">Primero elige un departamento...</option>';
          return;
        }

        try {
          const res = await fetch(`${appUrl}/api/locations?type=cities&departmentId=${deptId}`);
          const json = await res.json();

          if (json.success && json.data) {
            citySelect.innerHTML = '<option value="">Selecciona tu municipio...</option>';
            json.data.forEach((city) => {
              const opt = document.createElement("option");
              opt.value = city.id;
              opt.textContent = city.name;
              opt.dataset.cityName = city.name;
              citySelect.appendChild(opt);
            });
            citySelect.disabled = false;
          }
        } catch (err) {
          console.error("Error al cargar municipios:", err);
          citySelect.innerHTML = '<option value="">Error al cargar municipios</option>';
        }
      });

      // 3. Al cambiar municipio: Cargar barrios y sincronizar con carrito
      citySelect.addEventListener("change", async function () {
        const cityId = this.value;
        const selectedOption = this.options[this.selectedIndex];
        const cityName = selectedOption?.dataset.cityName || "";
        const deptId = deptSelect.value;
        const deptName = deptSelect.options[deptSelect.selectedIndex]?.textContent || "";

        if (!cityId) {
          if (daneBadge) daneBadge.style.display = "none";
          if (barrioGroup) barrioGroup.style.display = "none";
          return;
        }

        // Mostrar Badge con código oficial DANE
        if (daneBadge && badgeText) {
          badgeText.textContent = `Código DANE verificado: ${cityId} (${cityName}, ${deptName})`;
          daneBadge.style.display = "inline-flex";
        }

        // Si barrios está habilitado, consultar si hay lista oficial
        if (enableBarrios && barrioGroup && barrioSelect) {
          try {
            const res = await fetch(`${appUrl}/api/locations?type=neighborhoods&cityId=${cityId}`);
            const json = await res.json();

            if (json.success && json.data && json.data.length > 0) {
              barrioSelect.innerHTML = '<option value="">Selecciona tu barrio / comuna...</option>';
              json.data.forEach((b) => {
                const opt = document.createElement("option");
                opt.value = b.name;
                opt.textContent = b.zone ? `${b.name} (${b.zone})` : b.name;
                barrioSelect.appendChild(opt);
              });
              barrioGroup.style.display = "block";
              barrioSelect.style.display = "block";
              if (barrioInput) barrioInput.style.display = "none";
            } else {
              // Si no hay lista predefinida, permitir escribir el barrio
              barrioGroup.style.display = "block";
              barrioSelect.style.display = "none";
              if (barrioInput) {
                barrioInput.style.display = "block";
                barrioInput.value = "";
              }
            }
          } catch (e) {
            console.error("Error al cargar barrios:", e);
          }
        }

        // Sincronizar atributos con el Carrito de Shopify
        await updateCartAttributes({
          Departamento: deptName,
          Codigo_Departamento_DANE: deptId,
          Ciudad: cityName,
          Codigo_DANE: cityId,
          Barrio: "",
        });
      });

      // 4. Al cambiar o escribir barrio: Sincronizar
      if (barrioSelect) {
        barrioSelect.addEventListener("change", function () {
          updateCartAttributes({ Barrio: this.value });
        });
      }

      if (barrioInput) {
        barrioInput.addEventListener("blur", function () {
          updateCartAttributes({ Barrio: this.value });
        });
      }

      // 5. Prevenir checkout si está marcado como requerido y no completó
      if (isRequired) {
        const checkoutButtons = document.querySelectorAll(
          'button[name="checkout"], input[name="checkout"], a[href="/checkout"], .cart__checkout-button'
        );

        checkoutButtons.forEach((btn) => {
          btn.addEventListener("click", function (e) {
            if (!deptSelect.value || !citySelect.value) {
              e.preventDefault();
              if (feedback) {
                feedback.className = "zen-feedback-msg error";
                feedback.textContent = "Por favor selecciona tu departamento y ciudad antes de continuar al pago.";
                feedback.style.display = "block";
              }
              deptSelect.focus();
            }
          });
        });
      }
    });
  }

  // Actualizar atributos de carrito en Shopify
  async function updateCartAttributes(attributes) {
    try {
      const response = await fetch("/cart/update.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          attributes: attributes,
        }),
      });

      if (!response.ok) {
        console.warn("No se pudo sincronizar atributos con /cart/update.js");
      }
    } catch (err) {
      console.error("Error al sincronizar atributos de carrito:", err);
    }
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initZenColombiaSelector);
  } else {
    initZenColombiaSelector();
  }
})();
