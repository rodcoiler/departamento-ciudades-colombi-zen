/**
 * Base de datos de Barrios / Comunas / Localidades para las principales ciudades de Colombia
 * Incluye Bogotá (por Localidades), Medellín (por Comunas), Cali (por Comunas),
 * Barranquilla (por Localidades), Cartagena (por Localidades) y Bucaramanga (por Comunas).
 */

export interface Neighborhood {
  id: string;
  name: string;
  cityId: string; // Código DANE del municipio
  zone?: string;  // Comuna o Localidad a la que pertenece
  postalCode?: string;
}

export const NEIGHBORHOODS: Neighborhood[] = [
  // ==========================================
  // BOGOTÁ D.C. (11001) - Localidades y Barrios Clave
  // ==========================================
  // Usaquén (01)
  { id: "11001-0101", name: "Santa Bárbara", cityId: "11001", zone: "Usaquén" },
  { id: "11001-0102", name: "Cedritos", cityId: "11001", zone: "Usaquén" },
  { id: "11001-0103", name: "Unicentro", cityId: "11001", zone: "Usaquén" },
  { id: "11001-0104", name: "San Patricio", cityId: "11001", zone: "Usaquén" },
  { id: "11001-0105", name: "Chicó Norte", cityId: "11001", zone: "Usaquén" },
  { id: "11001-0106", name: "Bella Suiza", cityId: "11001", zone: "Usaquén" },
  { id: "11001-0107", name: "Toberín", cityId: "11001", zone: "Usaquén" },
  { id: "11001-0108", name: "La Calleja", cityId: "11001", zone: "Usaquén" },
  { id: "11001-0109", name: "Verbenal", cityId: "11001", zone: "Usaquén" },
  { id: "11001-0110", name: "Usaquén Colonial", cityId: "11001", zone: "Usaquén" },

  // Chapinero (02)
  { id: "11001-0201", name: "Zona G / Rosales", cityId: "11001", zone: "Chapinero" },
  { id: "11001-0202", name: "Chicó Reservado", cityId: "11001", zone: "Chapinero" },
  { id: "11001-0203", name: "Chapinero Alto", cityId: "11001", zone: "Chapinero" },
  { id: "11001-0204", name: "Chapinero Central", cityId: "11001", zone: "Chapinero" },
  { id: "11001-0205", name: "Zona T / El Retiro", cityId: "11001", zone: "Chapinero" },
  { id: "11001-0206", name: "Antiguo Country", cityId: "11001", zone: "Chapinero" },
  { id: "11001-0207", name: "Pardo Rubio", cityId: "11001", zone: "Chapinero" },

  // Santa Fe & La Candelaria (03 & 17)
  { id: "11001-0301", name: "La Macarena", cityId: "11001", zone: "Santa Fe" },
  { id: "11001-0302", name: "Las Nieves", cityId: "11001", zone: "Santa Fe" },
  { id: "11001-1701", name: "La Candelaria Centro", cityId: "11001", zone: "La Candelaria" },

  // Suba (11)
  { id: "11001-1101", name: "Niza", cityId: "11001", zone: "Suba" },
  { id: "11001-1102", name: "Colina Campestre", cityId: "11001", zone: "Suba" },
  { id: "11001-1103", name: "Pasadena", cityId: "11001", zone: "Suba" },
  { id: "11001-1104", name: "Prado Veraniego", cityId: "11001", zone: "Suba" },
  { id: "11001-1105", name: "Suba Rincón", cityId: "11001", zone: "Suba" },
  { id: "11001-1106", name: "Pontevedra", cityId: "11001", zone: "Suba" },
  { id: "11001-1107", name: "San José de Bavaria", cityId: "11001", zone: "Suba" },
  { id: "11001-1108", name: "Lombardía / Tibabuyes", cityId: "11001", zone: "Suba" },

  // Engativá (10)
  { id: "11001-1001", name: "Normandía", cityId: "11001", zone: "Engativá" },
  { id: "11001-1002", name: "Quirigua", cityId: "11001", zone: "Engativá" },
  { id: "11001-1003", name: "Villas de Granada", cityId: "11001", zone: "Engativá" },
  { id: "11001-1004", name: "Álamos", cityId: "11001", zone: "Engativá" },
  { id: "11001-1005", name: "Garcés Navas", cityId: "11001", zone: "Engativá" },
  { id: "11001-1006", name: "Santa Helenita", cityId: "11001", zone: "Engativá" },

  // Fontibón (09)
  { id: "11001-0901", name: "Modelia", cityId: "11001", zone: "Fontibón" },
  { id: "11001-0902", name: "Salitre Occidental", cityId: "11001", zone: "Fontibón" },
  { id: "11001-0903", name: "Capellanía", cityId: "11001", zone: "Fontibón" },
  { id: "11001-0904", name: "Fontibón Centro", cityId: "11001", zone: "Fontibón" },
  { id: "11001-0905", name: "Zona Franca", cityId: "11001", zone: "Fontibón" },

  // Teusaquillo (13)
  { id: "11001-1301", name: "Salitre Oriental", cityId: "11001", zone: "Teusaquillo" },
  { id: "11001-1302", name: "Galerías", cityId: "11001", zone: "Teusaquillo" },
  { id: "11001-1303", name: "Palermo", cityId: "11001", zone: "Teusaquillo" },
  { id: "11001-1304", name: "La Soledad", cityId: "11001", zone: "Teusaquillo" },
  { id: "11001-1305", name: "Pablo VI", cityId: "11001", zone: "Teusaquillo" },
  { id: "11001-1306", name: "Ciudad Salitre", cityId: "11001", zone: "Teusaquillo" },

  // Barrios Unidos (12)
  { id: "11001-1201", name: "El Polo", cityId: "11001", zone: "Barrios Unidos" },
  { id: "11001-1202", name: "Castellana", cityId: "11001", zone: "Barrios Unidos" },
  { id: "11001-1203", name: "Los Alcázares", cityId: "11001", zone: "Barrios Unidos" },
  { id: "11001-1204", name: "Rionegro", cityId: "11001", zone: "Barrios Unidos" },

  // Kennedy (08)
  { id: "11001-0801", name: "Castilla", cityId: "11001", zone: "Kennedy" },
  { id: "11001-0802", name: "Marsella", cityId: "11001", zone: "Kennedy" },
  { id: "11001-0803", name: "Mandalay", cityId: "11001", zone: "Kennedy" },
  { id: "11001-0804", name: "Tintal", cityId: "11001", zone: "Kennedy" },
  { id: "11001-0805", name: "Kennedy Central", cityId: "11001", zone: "Kennedy" },
  { id: "11001-0806", name: "Américas Occidental", cityId: "11001", zone: "Kennedy" },

  // Puente Aranda & Antonio Nariño
  { id: "11001-1601", name: "Ciudad Montes", cityId: "11001", zone: "Puente Aranda" },
  { id: "11001-1602", name: "Salazar Gómez", cityId: "11001", zone: "Puente Aranda" },
  { id: "11001-1501", name: "Restrepo", cityId: "11001", zone: "Antonio Nariño" },

  // ==========================================
  // MEDELLÍN (05001) - Comunas y Barrios Clave
  // ==========================================
  // Comuna 14 - El Poblado
  { id: "05001-1401", name: "El Poblado - Castropol", cityId: "05001", zone: "El Poblado" },
  { id: "05001-1402", name: "El Poblado - Manila", cityId: "05001", zone: "El Poblado" },
  { id: "05001-1403", name: "El Poblado - Provenza", cityId: "05001", zone: "El Poblado" },
  { id: "05001-1404", name: "El Poblado - El Tesoro", cityId: "05001", zone: "El Poblado" },
  { id: "05001-1405", name: "El Poblado - Los Balsos", cityId: "05001", zone: "El Poblado" },
  { id: "05001-1406", name: "El Poblado - San Lucas", cityId: "05001", zone: "El Poblado" },
  { id: "05001-1407", name: "El Poblado - Astorga", cityId: "05001", zone: "El Poblado" },
  { id: "05001-1408", name: "El Poblado - Patio Bonito", cityId: "05001", zone: "El Poblado" },

  // Comuna 11 - Laureles / Estadio
  { id: "05001-1101", name: "Laureles", cityId: "05001", zone: "Laureles" },
  { id: "05001-1102", name: "Conquistadores", cityId: "05001", zone: "Laureles" },
  { id: "05001-1103", name: "Bolivariana", cityId: "05001", zone: "Laureles" },
  { id: "05001-1104", name: "Estadio", cityId: "05001", zone: "Laureles" },
  { id: "05001-1105", name: "Florida Nueva", cityId: "05001", zone: "Laureles" },
  { id: "05001-1106", name: "Carlos E. Restrepo", cityId: "05001", zone: "Laureles" },
  { id: "05001-1107", name: "San Joaquín", cityId: "05001", zone: "Laureles" },

  // Comuna 12 - La América
  { id: "05001-1201", name: "La Floresta", cityId: "05001", zone: "La América" },
  { id: "05001-1202", name: "Santa Mónica", cityId: "05001", zone: "La América" },
  { id: "05001-1203", name: "Calasanz", cityId: "05001", zone: "La América" },
  { id: "05001-1204", name: "Simón Bolívar", cityId: "05001", zone: "La América" },

  // Comuna 16 - Belén
  { id: "05001-1601", name: "Belén Rosales", cityId: "05001", zone: "Belén" },
  { id: "05001-1602", name: "Belén Fátima", cityId: "05001", zone: "Belén" },
  { id: "05001-1603", name: "Belén La Palma", cityId: "05001", zone: "Belén" },
  { id: "05001-1604", name: "Belén San Bernardo", cityId: "05001", zone: "Belén" },
  { id: "05001-1605", name: "Belén Los Alpes", cityId: "05001", zone: "Belén" },

  // Comuna 10 - La Candelaria (Centro)
  { id: "05001-1001", name: "Centro / Boston", cityId: "05001", zone: "Centro" },
  { id: "05001-1002", name: "Prado Centro", cityId: "05001", zone: "Centro" },
  { id: "05001-1003", name: "San Benito", cityId: "05001", zone: "Centro" },

  // Comuna 7 - Robledo
  { id: "05001-0701", name: "Robledo Palenque", cityId: "05001", zone: "Robledo" },
  { id: "05001-0702", name: "Pilarica", cityId: "05001", zone: "Robledo" },
  { id: "05001-0703", name: "Bosques de San Pablo", cityId: "05001", zone: "Robledo" },

  // Comuna 5 - Castilla
  { id: "05001-0501", name: "Castilla", cityId: "05001", zone: "Castilla" },
  { id: "05001-0502", name: "Alfonso López", cityId: "05001", zone: "Castilla" },

  // ==========================================
  // CALI (76001) - Comunas y Barrios Clave
  // ==========================================
  // Zona Norte / Comuna 2
  { id: "76001-0201", name: "Granada", cityId: "76001", zone: "Comuna 2 (Norte)" },
  { id: "76001-0202", name: "Santa Mónica", cityId: "76001", zone: "Comuna 2 (Norte)" },
  { id: "76001-0203", name: "Versalles", cityId: "76001", zone: "Comuna 2 (Norte)" },
  { id: "76001-0204", name: "San Vicente", cityId: "76001", zone: "Comuna 2 (Norte)" },
  { id: "76001-0205", name: "La Flora", cityId: "76001", zone: "Comuna 2 (Norte)" },
  { id: "76001-0206", name: "Chipichape / Vipasa", cityId: "76001", zone: "Comuna 2 (Norte)" },

  // Zona Oeste / Comuna 3 & 19
  { id: "76001-0301", name: "San Antonio", cityId: "76001", zone: "Comuna 3 (Oeste/Centro)" },
  { id: "76001-0302", name: "El Peñón", cityId: "76001", zone: "Comuna 3 (Oeste)" },
  { id: "76001-1901", name: "San Fernando", cityId: "76001", zone: "Comuna 19 (Sur/Centro)" },
  { id: "76001-1902", name: "Tequendama", cityId: "76001", zone: "Comuna 19" },
  { id: "76001-1903", name: "Miraflores", cityId: "76001", zone: "Comuna 19" },

  // Zona Sur / Comuna 17 & 22
  { id: "76001-1701", name: "El Limonar", cityId: "76001", zone: "Comuna 17 (Sur)" },
  { id: "76001-1702", name: "La Hacienda", cityId: "76001", zone: "Comuna 17 (Sur)" },
  { id: "76001-1703", name: "Capri", cityId: "76001", zone: "Comuna 17 (Sur)" },
  { id: "76001-1704", name: "Valle del Lili", cityId: "76001", zone: "Comuna 17 (Sur)" },
  { id: "76001-2201", name: "Ciudad Jardín", cityId: "76001", zone: "Comuna 22 (Sur)" },
  { id: "76001-2202", name: "Pance", cityId: "76001", zone: "Comuna 22 (Sur)" },

  // ==========================================
  // BARRANQUILLA (08001) - Localidades y Barrios Clave
  // ==========================================
  // Riomar (Norte)
  { id: "08001-0101", name: "Alto Prado", cityId: "08001", zone: "Riomar" },
  { id: "08001-0102", name: "El Golf", cityId: "08001", zone: "Riomar" },
  { id: "08001-0103", name: "Villa Country", cityId: "08001", zone: "Riomar" },
  { id: "08001-0104", name: "Riomar", cityId: "08001", zone: "Riomar" },
  { id: "08001-0105", name: "Buenavista", cityId: "08001", zone: "Riomar" },
  { id: "08001-0106", name: "Villa Santos", cityId: "08001", zone: "Riomar" },
  { id: "08001-0107", name: "Villa Carolina", cityId: "08001", zone: "Riomar" },

  // Norte - Centro Histórico
  { id: "08001-0201", name: "El Prado", cityId: "08001", zone: "Norte-Centro Histórico" },
  { id: "08001-0202", name: "Boston", cityId: "08001", zone: "Norte-Centro Histórico" },
  { id: "08001-0203", name: "Bellavista", cityId: "08001", zone: "Norte-Centro Histórico" },
  { id: "08001-0204", name: "Betania", cityId: "08001", zone: "Norte-Centro Histórico" },
  { id: "08001-0205", name: "Ciudad Jardín", cityId: "08001", zone: "Norte-Centro Histórico" },

  // ==========================================
  // CARTAGENA DE INDIAS (13001)
  // ==========================================
  { id: "13001-0101", name: "Bocagrande", cityId: "13001", zone: "Histórica y del Caribe" },
  { id: "13001-0102", name: "Castillogrande", cityId: "13001", zone: "Histórica y del Caribe" },
  { id: "13001-0103", name: "El Laguito", cityId: "13001", zone: "Histórica y del Caribe" },
  { id: "13001-0104", name: "Centro Histórico / Amurallada", cityId: "13001", zone: "Histórica y del Caribe" },
  { id: "13001-0105", name: "Getsemaní", cityId: "13001", zone: "Histórica y del Caribe" },
  { id: "13001-0106", name: "Manga", cityId: "13001", zone: "Histórica y del Caribe" },
  { id: "13001-0107", name: "Crespo", cityId: "13001", zone: "Histórica y del Caribe" },
  { id: "13001-0108", name: "Marbella", cityId: "13001", zone: "Histórica y del Caribe" },
  { id: "13001-0109", name: "Pie de la Popa", cityId: "13001", zone: "Histórica y del Caribe" },
  { id: "13001-0110", name: "Zona Norte / Manzanillo", cityId: "13001", zone: "De la Virgen y Turística" },

  // ==========================================
  // BUCARAMANGA (68001)
  // ==========================================
  { id: "68001-0101", name: "Cabecera del Llano", cityId: "68001", zone: "Comuna 12" },
  { id: "68001-0102", name: "Sotomayor", cityId: "68001", zone: "Comuna 12" },
  { id: "68001-0103", name: "Antiguo Campestre", cityId: "68001", zone: "Comuna 12" },
  { id: "68001-0104", name: "San Francisco", cityId: "68001", zone: "Comuna 3" },
  { id: "68001-0105", name: "La Concordia", cityId: "68001", zone: "Comuna 6" },
  { id: "68001-0106", name: "Provenza", cityId: "68001", zone: "Comuna 10" },
  { id: "68001-0107", name: "Diamante II", cityId: "68001", zone: "Comuna 10" },
  { id: "68001-0108", name: "Cañaveral (Área Metro)", cityId: "68001", zone: "Metropolitana" },
];

/**
 * Obtener todos los barrios de un municipio por su código DANE
 */
export function getNeighborhoodsByCity(cityId: string): Neighborhood[] {
  return NEIGHBORHOODS.filter((n) => n.cityId === cityId);
}

/**
 * Buscar barrios por texto y ciudad
 */
export function searchNeighborhoods(query: string, cityId?: string): Neighborhood[] {
  const normalized = query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return NEIGHBORHOODS.filter((n) => {
    if (cityId && n.cityId !== cityId) return false;
    const nameNorm = n.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const zoneNorm = (n.zone || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return nameNorm.includes(normalized) || zoneNorm.includes(normalized);
  });
}
