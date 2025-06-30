// Modelo de datos unificado para consistencia across todas las vistas
export interface SubsystemData {
  id: string
  name: string
  // Datos de Materia Prima
  materiaPrima: {
    toneladas: number
    ocupacion: number // %
    capacidad: number
    estado: "activo" | "inactivo"
  }
  // Datos de Cilindros
  cilindros: {
    total: number
    llenos: number
    vacios: number
    mantencion: number
    competencia: number
    operativos: number
    eficiencia: number // %
  }
  // Datos de Masa
  masa: {
    totalMasa: number // Toneladas
    masaOperativa: number
    masaDisponible: number
    masaMantenimiento: number
    densidadPromedio: number // kg/cilindro
    flujo: {
      entrada: number // Ton/día
      salida: number
      neto: number
    }
  }
  // Análisis por formato
  formatos: {
    "5k": { cilindros: number; masa: number; conteoFisico: number; progMasa: number }
    "11k": { cilindros: number; masa: number; conteoFisico: number; progMasa: number }
    "15k": { cilindros: number; masa: number; conteoFisico: number; progMasa: number }
    "45k": { cilindros: number; masa: number; conteoFisico: number; progMasa: number }
    GH: { cilindros: number; masa: number; conteoFisico: number; progMasa: number }
  }
  // Son Subsistemas
  sonSubsistemas: Array<{
    name: string
    total: number
    llenos: number
    vacios: number
    otros: number
    masa: number
  }>
}

// Datos maestros unificados
export const UNIFIED_DATA: SubsystemData[] = [
  {
    id: "maipu",
    name: "SS Maipu",
    materiaPrima: {
      toneladas: 1157,
      ocupacion: 48,
      capacidad: 2410,
      estado: "activo",
    },
    cilindros: {
      total: 187094,
      llenos: 86666,
      vacios: 16788,
      mantencion: 35640,
      competencia: 48000,
      operativos: 151454,
      eficiencia: 80.9,
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
    formatos: {
      "5k": { cilindros: 45000, masa: 22.5, conteoFisico: 3773, progMasa: 1550 },
      "11k": { cilindros: 35000, masa: 38.5, conteoFisico: 3500, progMasa: 2500 },
      "15k": { cilindros: 48000, masa: 72.0, conteoFisico: 7300, progMasa: 6400 },
      "45k": { cilindros: 32000, masa: 144.0, conteoFisico: 1307, progMasa: 1400 },
      GH: { cilindros: 27094, masa: 24.3, conteoFisico: 530, progMasa: 650 },
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
    },
    cilindros: {
      total: 35743,
      llenos: 16788,
      vacios: 8955,
      mantencion: 5000,
      competencia: 5000,
      operativos: 30743,
      eficiencia: 86.0,
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
    formatos: {
      "5k": { cilindros: 8000, masa: 4.0, conteoFisico: 3773, progMasa: 1550 },
      "11k": { cilindros: 7000, masa: 7.7, conteoFisico: 3500, progMasa: 2500 },
      "15k": { cilindros: 10000, masa: 15.0, conteoFisico: 5400, progMasa: 5100 },
      "45k": { cilindros: 6000, masa: 27.0, conteoFisico: 1345, progMasa: 1400 },
      GH: { cilindros: 4743, masa: 4.3, conteoFisico: 530, progMasa: 650 },
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
    },
    cilindros: {
      total: 28500,
      llenos: 12000,
      vacios: 8000,
      mantencion: 4500,
      competencia: 4000,
      operativos: 24000,
      eficiencia: 84.2,
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
    formatos: {
      "5k": { cilindros: 6000, masa: 3.0, conteoFisico: 3773, progMasa: 1550 },
      "11k": { cilindros: 5500, masa: 6.1, conteoFisico: 3500, progMasa: 2500 },
      "15k": { cilindros: 8000, masa: 12.0, conteoFisico: 6400, progMasa: 6100 },
      "45k": { cilindros: 5000, masa: 22.5, conteoFisico: 1340, progMasa: 1400 },
      GH: { cilindros: 4000, masa: 3.6, conteoFisico: 530, progMasa: 650 },
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
    },
    cilindros: {
      total: 0,
      llenos: 0,
      vacios: 0,
      mantencion: 0,
      competencia: 0,
      operativos: 0,
      eficiencia: 0,
    },
    masa: {
      totalMasa: 0,
      masaOperativa: 0,
      masaDisponible: 0,
      masaMantenimiento: 0,
      densidadPromedio: 0,
      flujo: { entrada: 0, salida: 0, neto: 0 },
    },
    formatos: {
      "5k": { cilindros: 0, masa: 0, conteoFisico: 0, progMasa: 0 },
      "11k": { cilindros: 0, masa: 0, conteoFisico: 0, progMasa: 0 },
      "15k": { cilindros: 0, masa: 0, conteoFisico: 0, progMasa: 0 },
      "45k": { cilindros: 0, masa: 0, conteoFisico: 0, progMasa: 0 },
      GH: { cilindros: 0, masa: 0, conteoFisico: 0, progMasa: 0 },
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
    },
    cilindros: {
      total: 42000,
      llenos: 18500,
      vacios: 12000,
      mantencion: 6500,
      competencia: 5000,
      operativos: 36000,
      eficiencia: 85.7,
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
    formatos: {
      "5k": { cilindros: 9000, masa: 4.5, conteoFisico: 3773, progMasa: 1550 },
      "11k": { cilindros: 8000, masa: 8.8, conteoFisico: 3500, progMasa: 2500 },
      "15k": { cilindros: 12000, masa: 18.0, conteoFisico: 6400, progMasa: 6100 },
      "45k": { cilindros: 8000, masa: 36.0, conteoFisico: 1340, progMasa: 1400 },
      GH: { cilindros: 5000, masa: 4.5, conteoFisico: 530, progMasa: 650 },
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
    },
    cilindros: {
      total: 0,
      llenos: 0,
      vacios: 0,
      mantencion: 0,
      competencia: 0,
      operativos: 0,
      eficiencia: 0,
    },
    masa: {
      totalMasa: 0,
      masaOperativa: 0,
      masaDisponible: 0,
      masaMantenimiento: 0,
      densidadPromedio: 0,
      flujo: { entrada: 0, salida: 0, neto: 0 },
    },
    formatos: {
      "5k": { cilindros: 0, masa: 0, conteoFisico: 0, progMasa: 0 },
      "11k": { cilindros: 0, masa: 0, conteoFisico: 0, progMasa: 0 },
      "15k": { cilindros: 0, masa: 0, conteoFisico: 0, progMasa: 0 },
      "45k": { cilindros: 0, masa: 0, conteoFisico: 0, progMasa: 0 },
      GH: { cilindros: 0, masa: 0, conteoFisico: 0, progMasa: 0 },
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
    },
    cilindros: {
      total: 0,
      llenos: 0,
      vacios: 0,
      mantencion: 0,
      competencia: 0,
      operativos: 0,
      eficiencia: 0,
    },
    masa: {
      totalMasa: 0,
      masaOperativa: 0,
      masaDisponible: 0,
      masaMantenimiento: 0,
      densidadPromedio: 0,
      flujo: { entrada: 0, salida: 0, neto: 0 },
    },
    formatos: {
      "5k": { cilindros: 0, masa: 0, conteoFisico: 0, progMasa: 0 },
      "11k": { cilindros: 0, masa: 0, conteoFisico: 0, progMasa: 0 },
      "15k": { cilindros: 0, masa: 0, conteoFisico: 0, progMasa: 0 },
      "45k": { cilindros: 0, masa: 0, conteoFisico: 0, progMasa: 0 },
      GH: { cilindros: 0, masa: 0, conteoFisico: 0, progMasa: 0 },
    },
    sonSubsistemas: [],
  },
]

// Funciones de cálculo para consistencia
export const calculateNationalTotals = () => {
  const totals = UNIFIED_DATA.reduce(
    (acc, subsystem) => ({
      materiaPrima: {
        toneladas: acc.materiaPrima.toneladas + subsystem.materiaPrima.toneladas,
        capacidad: acc.materiaPrima.capacidad + subsystem.materiaPrima.capacidad,
      },
      cilindros: {
        total: acc.cilindros.total + subsystem.cilindros.total,
        llenos: acc.cilindros.llenos + subsystem.cilindros.llenos,
        vacios: acc.cilindros.vacios + subsystem.cilindros.vacios,
        mantencion: acc.cilindros.mantencion + subsystem.cilindros.mantencion,
        competencia: acc.cilindros.competencia + subsystem.cilindros.competencia,
        operativos: acc.cilindros.operativos + subsystem.cilindros.operativos,
      },
      masa: {
        totalMasa: acc.masa.totalMasa + subsystem.masa.totalMasa,
        masaOperativa: acc.masa.masaOperativa + subsystem.masa.masaOperativa,
        masaDisponible: acc.masa.masaDisponible + subsystem.masa.masaDisponible,
        masaMantenimiento: acc.masa.masaMantenimiento + subsystem.masa.masaMantenimiento,
      },
    }),
    {
      materiaPrima: { toneladas: 0, capacidad: 0 },
      cilindros: { total: 0, llenos: 0, vacios: 0, mantencion: 0, competencia: 0, operativos: 0 },
      masa: { totalMasa: 0, masaOperativa: 0, masaDisponible: 0, masaMantenimiento: 0 },
    },
  )

  return {
    ...totals,
    ocupacionNacional: Math.round((totals.materiaPrima.toneladas / totals.materiaPrima.capacidad) * 100),
    eficienciaNacional: Math.round((totals.cilindros.operativos / totals.cilindros.total) * 100),
    eficienciaMasa: Math.round((totals.masa.masaOperativa / totals.masa.totalMasa) * 100),
  }
}

export const NATIONAL_TOTALS = calculateNationalTotals()
