// Modelo de datos unificado para consistencia across todas las vistas

// Tipos de producto posibles
export type TipoProducto = "Propano SC" | "Propano" | "Mezcla" | "Butano" | "Competencia";

// Formatos de cilindro posibles
export type FormatoCilindro = "5k" | "11k" | "15k" | "45k" | "GH";

export interface ProductoMateriaPrima {
  nombre: TipoProducto;
  porcentaje: number; // del total de materia prima del subsistema
  toneladas?: number; // calculado dinámicamente
}

export interface FormatoDetalle {
  cilindros: number;
  masa: number;
  conteoFisico: number;
  progMasa: number;
  competencia?: number; // cantidad de cilindros de competencia en este formato
}

export interface SubsystemData {
  id: string;
  name: string;
  materiaPrima: {
    toneladas: number;
    ocupacion: number;
    capacidad: number;
    estado: "activo" | "inactivo";
    productos: ProductoMateriaPrima[]; // Incluye competencia
  };
  cilindros: {
    total: number;
    llenos: number;
    vacios: number;
    mantencion: number;
    competencia: number;
    operativos: number;
    eficiencia: number;
    porFormato: Record<FormatoCilindro, FormatoDetalle>;
  };
  masa: {
    totalMasa: number;
    masaOperativa: number;
    masaDisponible: number;
    masaMantenimiento: number;
    densidadPromedio: number;
    flujo: {
      entrada: number;
      salida: number;
      neto: number;
    };
  };
  sonSubsistemas: Array<{
    name: string;
    total: number;
    llenos: number;
    vacios: number;
    otros: number;
    masa: number;
  }>;
}

// Ejemplo de datos (puedes expandir para todos los subsistemas)
export const UNIFIED_DATA: SubsystemData[] = [
  {
    id: "maipu",
    name: "SS Maipu",
    materiaPrima: {
      toneladas: 1157,
      ocupacion: 48,
      capacidad: 2410,
      estado: "activo",
      productos: [
        { nombre: "Propano SC", porcentaje: 0.40 },
        { nombre: "Propano", porcentaje: 0.25 },
        { nombre: "Mezcla", porcentaje: 0.20 },
        { nombre: "Butano", porcentaje: 0.10 },
        { nombre: "Competencia", porcentaje: 0.05 },
      ],
    },
    cilindros: {
      total: 187094,
      llenos: 86666,
      vacios: 16788,
      mantencion: 35640,
      competencia: 48000,
      operativos: 151454,
      eficiencia: 80.9,
      porFormato: {
        "5k": { cilindros: 45000, masa: 22.5, conteoFisico: 3773, progMasa: 1550, competencia: 5000 },
        "11k": { cilindros: 35000, masa: 38.5, conteoFisico: 3500, progMasa: 2500, competencia: 8000 },
        "15k": { cilindros: 48000, masa: 72.0, conteoFisico: 7300, progMasa: 6400, competencia: 12000 },
        "45k": { cilindros: 32000, masa: 144.0, conteoFisico: 1307, progMasa: 1400, competencia: 18000 },
        "GH": { cilindros: 27094, masa: 24.3, conteoFisico: 530, progMasa: 650, competencia: 6000 },
      },
    },
    masa: {
      totalMasa: 88.4,
      masaOperativa: 69.2,
      masaDisponible: 12.8,
      masaMantenimiento: 6.4,
      densidadPromedio: 10.2,
      flujo: {
        entrada: 8.4,
        salida: 6.8,
        neto: 1.6,
      },
    },
    sonSubsistemas: [
      { name: "SS1 Despacho", total: 58296, llenos: 28710, vacios: 4374, otros: 25212, masa: 32.8 },
      { name: "SS2 Bodega", total: 23454, llenos: 19428, vacios: 2026, otros: 2000, masa: 29.4 },
      { name: "SS3 Patio", total: 57206, llenos: 0, vacios: 3100, otros: 54106, masa: 26.2 },
    ],
  },
  {
    id: "mejillones",
    name: "SS Mejillones",
    materiaPrima: {
      toneladas: 204,
      ocupacion: 84,
      capacidad: 243,
      estado: "activo",
      productos: [
        { nombre: "Propano SC", porcentaje: 0.48 },
        { nombre: "Propano", porcentaje: 0.30 },
        { nombre: "Mezcla", porcentaje: 0.16 },
        { nombre: "Butano", porcentaje: 0.06 },
      ],
    },
    cilindros: {
      total: 35743,
      llenos: 16788,
      vacios: 8955,
      mantencion: 5000,
      competencia: 5000,
      operativos: 30743,
      eficiencia: 86.0,
      porFormato: {
        "5k": { cilindros: 8000, masa: 4.0, conteoFisico: 3773, progMasa: 1550, competencia: 5000 },
        "11k": { cilindros: 7000, masa: 7.7, conteoFisico: 3500, progMasa: 2500, competencia: 8000 },
        "15k": { cilindros: 10000, masa: 15.0, conteoFisico: 5400, progMasa: 5100, competencia: 10000 },
        "45k": { cilindros: 6000, masa: 27.0, conteoFisico: 1345, progMasa: 1400, competencia: 10000 },
        "GH": { cilindros: 4743, masa: 4.3, conteoFisico: 530, progMasa: 650, competencia: 5000 },
      },
    },
    masa: {
      totalMasa: 35.7,
      masaOperativa: 28.2,
      masaDisponible: 5.1,
      masaMantenimiento: 2.4,
      densidadPromedio: 10.0,
      flujo: {
        entrada: 3.2,
        salida: 2.8,
        neto: 0.4,
      },
    },
    sonSubsistemas: [
      { name: "SS1 Norte", total: 15000, llenos: 8000, vacios: 3500, otros: 3500, masa: 15.2 },
      { name: "SS2 Sur", total: 20743, llenos: 8788, vacios: 5455, otros: 6500, masa: 20.5 },
    ],
  },
  {
    id: "belloto",
    name: "SS Belloto",
    materiaPrima: {
      toneladas: 157,
      ocupacion: 44,
      capacidad: 357,
      estado: "activo",
      productos: [
        { nombre: "Propano SC", porcentaje: 0.48 },
        { nombre: "Propano", porcentaje: 0.30 },
        { nombre: "Mezcla", porcentaje: 0.16 },
        { nombre: "Butano", porcentaje: 0.06 },
      ],
    },
    cilindros: {
      total: 28500,
      llenos: 12000,
      vacios: 8000,
      mantencion: 4500,
      competencia: 4000,
      operativos: 24000,
      eficiencia: 84.2,
      porFormato: {
        "5k": { cilindros: 6000, masa: 3.0, conteoFisico: 3773, progMasa: 1550, competencia: 5000 },
        "11k": { cilindros: 5500, masa: 6.1, conteoFisico: 3500, progMasa: 2500, competencia: 8000 },
        "15k": { cilindros: 8000, masa: 12.0, conteoFisico: 6400, progMasa: 6100, competencia: 10000 },
        "45k": { cilindros: 5000, masa: 22.5, conteoFisico: 1340, progMasa: 1400, competencia: 10000 },
        "GH": { cilindros: 4000, masa: 3.6, conteoFisico: 530, progMasa: 650, competencia: 5000 },
      },
    },
    masa: {
      totalMasa: 28.5,
      masaOperativa: 22.1,
      masaDisponible: 4.2,
      masaMantenimiento: 2.2,
      densidadPromedio: 10.0,
      flujo: {
        entrada: 2.1,
        salida: 1.8,
        neto: 0.3,
      },
    },
    sonSubsistemas: [
      { name: "SS1 Central", total: 15000, llenos: 6500, vacios: 4000, otros: 4500, masa: 15.1 },
      { name: "SS2 Anexo", total: 13500, llenos: 5500, vacios: 4000, otros: 4000, masa: 13.4 },
    ],
  },
  {
    id: "talca",
    name: "SS Talca",
    materiaPrima: {
      toneladas: 0,
      ocupacion: 0,
      capacidad: 500,
      estado: "inactivo",
      productos: [],
    },
    cilindros: {
      total: 0,
      llenos: 0,
      vacios: 0,
      mantencion: 0,
      competencia: 0,
      operativos: 0,
      eficiencia: 0,
      porFormato: {},
    },
    masa: {
      totalMasa: 0,
      masaOperativa: 0,
      masaDisponible: 0,
      masaMantenimiento: 0,
      densidadPromedio: 0,
      flujo: { entrada: 0, salida: 0, neto: 0 },
    },
    sonSubsistemas: [],
  },
  {
    id: "biobio",
    name: "SS Biobio",
    materiaPrima: {
      toneladas: 445,
      ocupacion: 56,
      capacidad: 795,
      estado: "activo",
      productos: [
        { nombre: "Propano SC", porcentaje: 0.48 },
        { nombre: "Propano", porcentaje: 0.30 },
        { nombre: "Mezcla", porcentaje: 0.16 },
        { nombre: "Butano", porcentaje: 0.06 },
      ],
    },
    cilindros: {
      total: 42000,
      llenos: 18500,
      vacios: 12000,
      mantencion: 6500,
      competencia: 5000,
      operativos: 36000,
      eficiencia: 85.7,
      porFormato: {
        "5k": { cilindros: 9000, masa: 4.5, conteoFisico: 3773, progMasa: 1550, competencia: 5000 },
        "11k": { cilindros: 8000, masa: 8.8, conteoFisico: 3500, progMasa: 2500, competencia: 8000 },
        "15k": { cilindros: 12000, masa: 18.0, conteoFisico: 6400, progMasa: 6100, competencia: 10000 },
        "45k": { cilindros: 8000, masa: 36.0, conteoFisico: 1340, progMasa: 1400, competencia: 10000 },
        "GH": { cilindros: 5000, masa: 4.5, conteoFisico: 530, progMasa: 650, competencia: 5000 },
      },
    },
    masa: {
      totalMasa: 42.0,
      masaOperativa: 33.2,
      masaDisponible: 6.1,
      masaMantenimiento: 2.7,
      densidadPromedio: 10.0,
      flujo: {
        entrada: 3.8,
        salida: 3.2,
        neto: 0.6,
      },
    },
    sonSubsistemas: [
      { name: "SS1 Principal", total: 25000, llenos: 11000, vacios: 7000, otros: 7000, masa: 25.2 },
      { name: "SS2 Secundario", total: 17000, llenos: 7500, vacios: 5000, otros: 4500, masa: 16.8 },
    ],
  },
  {
    id: "osorno",
    name: "SS Osorno",
    materiaPrima: {
      toneladas: 0,
      ocupacion: 0,
      capacidad: 300,
      estado: "inactivo",
      productos: [],
    },
    cilindros: {
      total: 0,
      llenos: 0,
      vacios: 0,
      mantencion: 0,
      competencia: 0,
      operativos: 0,
      eficiencia: 0,
      porFormato: {},
    },
    masa: {
      totalMasa: 0,
      masaOperativa: 0,
      masaDisponible: 0,
      masaMantenimiento: 0,
      densidadPromedio: 0,
      flujo: { entrada: 0, salida: 0, neto: 0 },
    },
    sonSubsistemas: [],
  },
  {
    id: "coyhaique",
    name: "SS Coyhaique",
    materiaPrima: {
      toneladas: 0,
      ocupacion: 0,
      capacidad: 200,
      estado: "inactivo",
      productos: [],
    },
    cilindros: {
      total: 0,
      llenos: 0,
      vacios: 0,
      mantencion: 0,
      competencia: 0,
      operativos: 0,
      eficiencia: 0,
      porFormato: {},
    },
    masa: {
      totalMasa: 0,
      masaOperativa: 0,
      masaDisponible: 0,
      masaMantenimiento: 0,
      densidadPromedio: 0,
      flujo: { entrada: 0, salida: 0, neto: 0 },
    },
    sonSubsistemas: [],
  },
]

// Función para calcular toneladas por producto en cada subsistema
export function calcularToneladasPorProducto(sub: SubsystemData): ProductoMateriaPrima[] {
  return sub.materiaPrima.productos.map(p => ({
    ...p,
    toneladas: Math.round(sub.materiaPrima.toneladas * p.porcentaje)
  }));
}

// Función para calcular totales nacionales de productos (incluyendo competencia)
export function calculateNationalProducts(): ProductoMateriaPrima[] {
  const productos: TipoProducto[] = ["Propano SC", "Propano", "Mezcla", "Butano", "Competencia"];
  const totalToneladas = UNIFIED_DATA.reduce((acc, s) => acc + s.materiaPrima.toneladas, 0);
  return productos.map(nombre => {
    const toneladas = UNIFIED_DATA.reduce(
      (acc, s) => acc + (s.materiaPrima.toneladas * (s.materiaPrima.productos.find(p => p.nombre === nombre)?.porcentaje || 0)),
      0
    );
    return {
      nombre,
      porcentaje: totalToneladas > 0 ? toneladas / totalToneladas : 0,
      toneladas,
    };
  });
}

// Función para calcular totales nacionales de cilindros por formato (incluyendo competencia)
export function calculateNationalCylindersByFormat() {
  const formatos: FormatoCilindro[] = ["5k", "11k", "15k", "45k", "GH"];
  return formatos.map(formato => {
    const cilindros = UNIFIED_DATA.reduce((acc, s) => acc + (s.cilindros.porFormato[formato]?.cilindros || 0), 0);
    const competencia = UNIFIED_DATA.reduce((acc, s) => acc + (s.cilindros.porFormato[formato]?.competencia || 0), 0);
    return { formato, cilindros, competencia };
  });
}

// Función para calcular totales nacionales generales
export function calculateNationalTotals() {
  return UNIFIED_DATA.reduce(
    (acc, s) => {
      acc.materiaPrima.toneladas += s.materiaPrima.toneladas;
      acc.materiaPrima.capacidad += s.materiaPrima.capacidad;
      acc.cilindros.total += s.cilindros.total;
      acc.cilindros.llenos += s.cilindros.llenos;
      acc.cilindros.vacios += s.cilindros.vacios;
      acc.cilindros.mantencion += s.cilindros.mantencion;
      acc.cilindros.competencia += s.cilindros.competencia;
      acc.cilindros.operativos += s.cilindros.operativos;
      acc.masa.totalMasa += s.masa.totalMasa;
      acc.masa.masaOperativa += s.masa.masaOperativa;
      acc.masa.masaDisponible += s.masa.masaDisponible;
      acc.masa.masaMantenimiento += s.masa.masaMantenimiento;
      return acc;
    },
    {
      materiaPrima: { toneladas: 0, capacidad: 0 },
      cilindros: { total: 0, llenos: 0, vacios: 0, mantencion: 0, competencia: 0, operativos: 0 },
      masa: { totalMasa: 0, masaOperativa: 0, masaDisponible: 0, masaMantenimiento: 0 },
    }
  );
}

// Datos adicionales para storytelling maestro
export const MASTER_INSIGHTS = {
  // Stock Inicial (SAP) vs SGP para accuracy
  stockComparison: {
    stockInicial: {
      llenos: 66200,
      vacios: 32800,
      mantencion: 18200,
      competencia: 13800,
      total: 131000,
    },
    stockSGP: {
      llenos: UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.llenos, 0),
      vacios: UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.vacios, 0),
      mantencion: UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.mantencion, 0),
      competencia: UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.competencia, 0),
      total: UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.total, 0),
    },
    differences: {
      llenos: UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.llenos, 0) - 66200,
      vacios: UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.vacios, 0) - 32800,
      mantencion: UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.mantencion, 0) - 18200,
      competencia: UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.competencia, 0) - 13800,
      total: UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.total, 0) - 131000,
    },
    accuracyRate: Math.round(((131000 - Math.abs(UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.total, 0) - 131000)) / 131000) * 100 * 10) / 10,
  },
  
  // Distribución por tamaños para storytelling
  cilindrosBySize: {
    "5kg": { 
      cantidad: UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.llenos, 0), 
      porcentaje: Math.round((UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.llenos, 0) / UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.total, 0)) * 100), 
      capacidadDisponible: UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.capacidad, 0),
      ocupacion: Math.round((UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.llenos, 0) / UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.capacidad, 0)) * 100)
    },
    "11kg": { 
      cantidad: UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.llenos, 0), 
      porcentaje: Math.round((UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.llenos, 0) / UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.total, 0)) * 100), 
      capacidadDisponible: UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.capacidad, 0),
      ocupacion: Math.round((UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.llenos, 0) / UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.capacidad, 0)) * 100)
    },
    "15kg": { 
      cantidad: UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.llenos, 0), 
      porcentaje: Math.round((UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.llenos, 0) / UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.total, 0)) * 100), 
      capacidadDisponible: UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.capacidad, 0),
      ocupacion: Math.round((UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.llenos, 0) / UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.capacidad, 0)) * 100)
    },
    "45kg": { 
      cantidad: UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.llenos, 0), 
      porcentaje: Math.round((UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.llenos, 0) / UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.total, 0)) * 100), 
      capacidadDisponible: UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.capacidad, 0),
      ocupacion: Math.round((UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.llenos, 0) / UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.capacidad, 0)) * 100)
    },
    "GH": { 
      cantidad: UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.llenos, 0), 
      porcentaje: Math.round((UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.llenos, 0) / UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.total, 0)) * 100), 
      capacidadDisponible: UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.capacidad, 0),
      ocupacion: Math.round((UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.llenos, 0) / UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.capacidad, 0)) * 100)
    },
  },
  
  // KPIs críticos para performance
  criticalKPIs: {
    eficienciaMeta: 95,
    gapEficiencia: 95 - UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.operativos, 0) / UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.total, 0),
    subsistemaCritico: UNIFIED_DATA.filter(s => s.materiaPrima.estado === "inactivo").length,
    cilindrosMantencionPct: Math.round((UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.mantencion, 0) / UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.total, 0)) * 100 * 10) / 10,
    capacidadDisponible: UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.capacidad, 0) - UNIFIED_DATA.reduce((acc, s) => acc + s.cilindros.total, 0),
  }
}
