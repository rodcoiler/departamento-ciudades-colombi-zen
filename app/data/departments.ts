/**
 * Base de datos DANE - Departamentos de Colombia
 * Fuente: DANE - DIVIPOLA (División Político-Administrativa de Colombia)
 * 33 Departamentos con sus códigos oficiales
 */

export interface Department {
  id: string;       // Código DANE del departamento (2 dígitos, zero-padded)
  name: string;     // Nombre oficial del departamento
  capital: string;  // Capital del departamento
  capitalCode: string; // Código DANE de la capital
}

export const departments: Department[] = [
  { id: "05", name: "Antioquia", capital: "Medellín", capitalCode: "05001" },
  { id: "08", name: "Atlántico", capital: "Barranquilla", capitalCode: "08001" },
  { id: "11", name: "Bogotá D.C.", capital: "Bogotá D.C.", capitalCode: "11001" },
  { id: "13", name: "Bolívar", capital: "Cartagena de Indias", capitalCode: "13001" },
  { id: "15", name: "Boyacá", capital: "Tunja", capitalCode: "15001" },
  { id: "17", name: "Caldas", capital: "Manizales", capitalCode: "17001" },
  { id: "18", name: "Caquetá", capital: "Florencia", capitalCode: "18001" },
  { id: "19", name: "Cauca", capital: "Popayán", capitalCode: "19001" },
  { id: "20", name: "Cesar", capital: "Valledupar", capitalCode: "20001" },
  { id: "23", name: "Córdoba", capital: "Montería", capitalCode: "23001" },
  { id: "25", name: "Cundinamarca", capital: "Bogotá D.C.", capitalCode: "25001" },
  { id: "27", name: "Chocó", capital: "Quibdó", capitalCode: "27001" },
  { id: "41", name: "Huila", capital: "Neiva", capitalCode: "41001" },
  { id: "44", name: "La Guajira", capital: "Riohacha", capitalCode: "44001" },
  { id: "47", name: "Magdalena", capital: "Santa Marta", capitalCode: "47001" },
  { id: "50", name: "Meta", capital: "Villavicencio", capitalCode: "50001" },
  { id: "52", name: "Nariño", capital: "San Juan de Pasto", capitalCode: "52001" },
  { id: "54", name: "Norte de Santander", capital: "Cúcuta", capitalCode: "54001" },
  { id: "63", name: "Quindío", capital: "Armenia", capitalCode: "63001" },
  { id: "66", name: "Risaralda", capital: "Pereira", capitalCode: "66001" },
  { id: "68", name: "Santander", capital: "Bucaramanga", capitalCode: "68001" },
  { id: "70", name: "Sucre", capital: "Sincelejo", capitalCode: "70001" },
  { id: "73", name: "Tolima", capital: "Ibagué", capitalCode: "73001" },
  { id: "76", name: "Valle del Cauca", capital: "Santiago de Cali", capitalCode: "76001" },
  { id: "81", name: "Arauca", capital: "Arauca", capitalCode: "81001" },
  { id: "85", name: "Casanare", capital: "Yopal", capitalCode: "85001" },
  { id: "86", name: "Putumayo", capital: "Mocoa", capitalCode: "86001" },
  { id: "88", name: "San Andrés, Providencia y Santa Catalina", capital: "San Andrés", capitalCode: "88001" },
  { id: "91", name: "Amazonas", capital: "Leticia", capitalCode: "91001" },
  { id: "94", name: "Guainía", capital: "Inírida", capitalCode: "94001" },
  { id: "95", name: "Guaviare", capital: "San José del Guaviare", capitalCode: "95001" },
  { id: "97", name: "Vaupés", capital: "Mitú", capitalCode: "97001" },
  { id: "99", name: "Vichada", capital: "Puerto Carreño", capitalCode: "99001" },
];

/**
 * Obtener un departamento por su código DANE
 */
export function getDepartmentByCode(code: string): Department | undefined {
  return departments.find((d) => d.id === code);
}

/**
 * Obtener departamentos ordenados alfabéticamente
 */
export function getDepartmentsSorted(): Department[] {
  return [...departments].sort((a, b) => a.name.localeCompare(b.name, "es"));
}

export const DEPARTMENTS = departments;
export const getDepartmentById = getDepartmentByCode;
