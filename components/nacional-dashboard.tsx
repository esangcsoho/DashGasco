"use client"

import React, { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Map, BarChart3, Activity, Gauge } from "lucide-react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { TremorToggle } from "./ui/tremor-toggle"
import { UNIFIED_DATA, calculateNationalTotals } from "@/lib/data-model"
import Image from "next/image"

// Importar las secciones modulares
import { MateriaSection } from "./sections/materia-section"
import { CilindrosSection } from "./sections/cilindros-section"
import { MasaSection } from "./sections/masa-section"

export function NacionalDashboard() {
  const [activeSection, setActiveSection] = useState<"overview" | "materia" | "cilindros" | "masa">("overview")
  const [expandedSubsystem, setExpandedSubsystem] = useState<string | null>(null)
  const [showOnlyActive, setShowOnlyActive] = useState(false)
  const [realTimeData, setRealTimeData] = useState(false)
  const [showDetailTables, setShowDetailTables] = useState(false)

  // Calcular los totales nacionales usando la función del data model
  const NATIONAL_TOTALS = useMemo(() => calculateNationalTotals(), []);

  // Datos nacionales consolidados
  const nationalOverview = useMemo(() => ({
    totalSubsistemas: UNIFIED_DATA.length,
    subsistemesActivos: UNIFIED_DATA.filter(s => s.materiaPrima.estado === "activo").length,
    totalCilindros: NATIONAL_TOTALS.cilindros.total,
    cilindrosOperativos: NATIONAL_TOTALS.cilindros.operativos,
    masaTotal: NATIONAL_TOTALS.masa.totalMasa,
    masaOperativa: NATIONAL_TOTALS.masa.masaOperativa,
    ocupacionPromedio: Math.round((NATIONAL_TOTALS.materiaPrima.toneladas / NATIONAL_TOTALS.materiaPrima.capacidad) * 100),
    eficienciaOperacional: Math.round((NATIONAL_TOTALS.cilindros.operativos / NATIONAL_TOTALS.cilindros.total) * 100),
  }), [NATIONAL_TOTALS])

  // Datos comparativos SGP vs SAP consolidados a nivel nacional
  const comparativoSGPvsSAP = useMemo(() => ({
    cilindros: {
      llenos: { sgp: 3228, sap: 3150, diferencia: 78, porcentaje: 2.5 },
      vacios: { sgp: 1871, sap: 1950, diferencia: -79, porcentaje: -4.1 },
      mantencion: { sgp: 918, sap: 875, diferencia: 43, porcentaje: 4.9 },
      competencia: { sgp: 733, sap: 780, diferencia: -47, porcentaje: -6.0 }
    },
    masaTotal: { sgp: 6750, sap: 6755, diferencia: -5, porcentaje: -0.1 },
    eficiencia: { sgp: 94.2, sap: 92.8, diferencia: 1.4, porcentaje: 1.5 },
    alertasCriticas: {
      diferenciasMayores5: 2,
      subsistemesDesalineados: 3,
      requierenAjuste: ["2 Bodega", "4 Almacén", "7 Mantenimiento"]
    }
  }), [])

  // Datos de masa por planta y formato
  const masaPorPlantaYFormato = useMemo(() => ({
    formatos: ["5K", "11K", "15K", "45K", "GH"],
    plantas: UNIFIED_DATA.map(subsistema => ({
      nombre: subsistema.name,
      categorias: {
        llenos: {
          "5K": { cilindros: 180, masa: 9.0 },
          "11K": { cilindros: 120, masa: 13.2 },
          "15K": { cilindros: 150, masa: 22.5 },
          "45K": { cilindros: 85, masa: 38.3 },
          "GH": { cilindros: 95, masa: 14.3 }
        },
        vacios: {
          "5K": { cilindros: 120, masa: 2.4 },
          "11K": { cilindros: 80, masa: 2.4 },
          "15K": { cilindros: 100, masa: 4.0 },
          "45K": { cilindros: 60, masa: 6.0 },
          "GH": { cilindros: 70, masa: 3.5 }
        },
        mantencion: {
          "5K": { cilindros: 25, masa: 0.5 },
          "11K": { cilindros: 15, masa: 0.45 },
          "15K": { cilindros: 20, masa: 0.8 },
          "45K": { cilindros: 12, masa: 1.2 },
          "GH": { cilindros: 18, masa: 0.9 }
        },
        competencia: {
          "5K": { cilindros: 15, masa: 0.3 },
          "11K": { cilindros: 10, masa: 0.3 },
          "15K": { cilindros: 12, masa: 0.48 },
          "45K": { cilindros: 8, masa: 0.8 },
          "GH": { cilindros: 12, masa: 0.6 }
        }
      }
    })),
    resumenNacional: {
      masaTotal: nationalOverview.masaTotal,
      masaOperativa: nationalOverview.masaOperativa,
      eficienciaMasa: Math.round((nationalOverview.masaOperativa / nationalOverview.masaTotal) * 100),
      distribucionPorCategoria: {
        llenos: { masa: 2847.5, porcentaje: 65.2 },
        vacios: { masa: 623.8, porcentaje: 14.3 },
        mantencion: { masa: 485.2, porcentaje: 11.1 },
        competencia: { masa: 410.3, porcentaje: 9.4 }
      }
    }
  }), [nationalOverview])

  // Datos filtrados para vista simplificada
  const filteredData = useMemo(() => {
    let filtered = [...UNIFIED_DATA]
    if (showOnlyActive) {
      filtered = filtered.filter((s) => s.materiaPrima.estado === "activo")
    }
    return filtered
  }, [showOnlyActive])

  const toggleSubsystem = (subsystemId: string) => {
    setExpandedSubsystem(expandedSubsystem === subsystemId ? null : subsystemId)
  }

  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return "green"
    if (value >= thresholds.warning) return "orange"
    return "red"
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 p-6">


        {/* Navegación principal con filtros */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
                <Button
              variant={activeSection === "overview" ? "default" : "outline"}
                  size="sm"
              onClick={() => setActiveSection("overview")}
                >
              <Map className="w-4 h-4 mr-2" />
              Overview SGP
                </Button>
            <ArrowRight className="w-4 h-4 text-gray-400" />
                <Button
              variant={activeSection === "cilindros" ? "default" : "outline"}
                  size="sm"
              onClick={() => setActiveSection("cilindros")}
                >
              <Activity className="w-4 h-4 mr-2" />
              Análisis Cilindros
                </Button>
            <ArrowRight className="w-4 h-4 text-gray-400" />
                <Button
              variant={activeSection === "masa" ? "default" : "outline"}
                  size="sm"
              onClick={() => setActiveSection("masa")}
                >
              <Gauge className="w-4 h-4 mr-2" />
              Gestión Masa
                </Button>
              </div>
          <div className="flex items-center gap-4">
                <TremorToggle
              label="Solo Activos"
              checked={showOnlyActive}
              onCheckedChange={(checked) => setShowOnlyActive(checked)}
                />
                <TremorToggle
              label="Tiempo Real"
              checked={realTimeData}
              onCheckedChange={(checked) => setRealTimeData(checked)}
            />
            {realTimeData && (
              <Badge variant="default" className="bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                En vivo
              </Badge>
            )}
              </div>
        </div>

        {/* Renderizado condicional de las secciones */}
                {activeSection === "overview" && (
          <MateriaSection 
            nationalOverview={nationalOverview}
            filteredData={filteredData}
            expandedSubsystem={expandedSubsystem}
            toggleSubsystem={toggleSubsystem}
            getStatusColor={getStatusColor}
          />
        )}

        {activeSection === "cilindros" && (
          <CilindrosSection
            showDetailTables={showDetailTables}
            setShowDetailTables={setShowDetailTables}
          />
        )}

        {activeSection === "masa" && (
          <MasaSection
            masaPorPlantaYFormato={masaPorPlantaYFormato}
          />
        )}
      </div>
    </TooltipProvider>
  )
}