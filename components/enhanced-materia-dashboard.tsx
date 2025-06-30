"use client"

import { useState } from "react"
import Image from "next/image"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TremorCard, TremorMetric } from "./ui/tremor-card"
import { TremorToggle } from "./ui/tremor-toggle"
import { DonutChart } from "./ui/tremor-donut"
import { ChevronDown, ChevronRight, Info, Filter, Eye, BarChart3 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function EnhancedMateriaDashboard() {
  const [selectedSubsystem, setSelectedSubsystem] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [viewMode, setViewMode] = useState<"overview" | "breakdown" | "comparison">("overview")
  const [filters, setFilters] = useState({
    showEmpty: true,
    showMaintenance: true,
    showCompetition: true,
    realTimeData: false,
  })

  const cylinderData = [
    { type: "Llenos", value: 3228, percentage: 47.8, color: "#3b82f6", target: 3500 },
    { type: "Vacíos", value: 1871, percentage: 27.7, color: "#93c5fd", target: 2000 },
    { type: "Mantencion", value: 918, percentage: 13.6, color: "#06b6d4", target: 800 },
    { type: "Competencia", value: 733, percentage: 10.9, color: "#67e8f9", target: 700 },
  ]

  const subsystemsData = [
    {
      id: "despacho",
      name: "1 Despacho",
      total: 2850,
      breakdown: {
        llenos: { value: 1000, percentage: 35.1, trend: "up" },
        vacios: { value: 850, percentage: 29.8, trend: "stable" },
        mantencion: { value: 600, percentage: 21.1, trend: "down" },
        competencia: { value: 400, percentage: 14.0, trend: "up" },
      },
      efficiency: 87.5,
      alerts: 2,
    },
    {
      id: "bodega",
      name: "2 Bodega",
      total: 2750,
      breakdown: {
        llenos: { value: 900, percentage: 32.7, trend: "stable" },
        vacios: { value: 750, percentage: 27.3, trend: "up" },
        mantencion: { value: 650, percentage: 23.6, trend: "stable" },
        competencia: { value: 450, percentage: 16.4, trend: "down" },
      },
      efficiency: 92.1,
      alerts: 0,
    },
    {
      id: "patio",
      name: "3 Patio",
      total: 1658,
      breakdown: {
        llenos: { value: 950, percentage: 57.3, trend: "up" },
        vacios: { value: 708, percentage: 42.7, trend: "down" },
        mantencion: { value: 0, percentage: 0, trend: "stable" },
        competencia: { value: 0, percentage: 0, trend: "stable" },
      },
      efficiency: 95.2,
      alerts: 1,
    },
  ]

  const handleSubsystemClick = (subsystemId: string) => {
    setSelectedSubsystem(selectedSubsystem === subsystemId ? null : subsystemId)
  }

  const getFilteredData = () => {
    return cylinderData.filter((item) => {
      if (!filters.showEmpty && item.type === "Vacíos") return false
      if (!filters.showMaintenance && item.type === "Mantencion") return false
      if (!filters.showCompetition && item.type === "Competencia") return false
      return true
    })
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <span className="text-green-500">↗</span>
      case "down":
        return <span className="text-red-500">↘</span>
      default:
        return <span className="text-gray-500">→</span>
    }
  }

  // Datos exactos según la imagen de referencia materia.png
  const resumenCilindros = {
    masaTotal: { value: 6750, unit: "cil" },
    breakdown: {
      llenos: { value: 3228, percentage: 47.8, unit: "cil" },
      vacios: { value: 1871, percentage: 27.7, unit: "cil" },
      mantencion: { value: 918, percentage: 13.6, unit: "cil" },
      competencia: { value: 733, percentage: 10.9, unit: "cil" }
    }
  }

  const diferenciaStockSGPvsSAP = {
    llenos: { sgp: 1120, sap: 1050, diferencia: 70, porcentaje: 6.7 },
    vacios: { sgp: 975, sap: 1030, diferencia: -55, porcentaje: -5.3 }
  }

  const stockInicialSubsistemas = [
    { nombre: "1 Despacho", llenos: 1000, vacios: 850, mantencion: 450, competencia: 380, total: 2680 },
    { nombre: "2 Bodega", llenos: 900, vacios: 750, mantencion: 420, competencia: 330, total: 2400 },
    { nombre: "3 Patio", llenos: 1200, vacios: 800, mantencion: 480, competencia: 450, total: 2930 },
    { nombre: "4 Almacén", llenos: 850, vacios: 600, mantencion: 380, competencia: 320, total: 2150 },
    { nombre: "5 Recepción", llenos: 750, vacios: 550, mantencion: 350, competencia: 280, total: 1930 },
    { nombre: "6 Distribución", llenos: 1100, vacios: 750, mantencion: 420, competencia: 380, total: 2650 },
    { nombre: "7 Mantenimiento", llenos: 950, vacios: 700, mantencion: 480, competencia: 350, total: 2480 }
  ]

  const resumenClasificacionUnidades = [
    { clasificacion: "5K", inicial: 1800, inicial_porcentaje: 26.7, online: 1850, online_porcentaje: 27.4, diferencia: 50, total: 3650 },
    { clasificacion: "11K", inicial: 1200, inicial_porcentaje: 17.8, online: 1150, online_porcentaje: 17.0, diferencia: -50, total: 2350 },
    { clasificacion: "15K", inicial: 1500, inicial_porcentaje: 22.2, online: 1600, online_porcentaje: 23.7, diferencia: 100, total: 3100 },
    { clasificacion: "45K", inicial: 1250, inicial_porcentaje: 18.5, online: 1350, online_porcentaje: 20.0, diferencia: 100, total: 2600 },
    { clasificacion: "GH", inicial: 1000, inicial_porcentaje: 14.8, online: 800, online_porcentaje: 11.9, diferencia: -200, total: 1800 }
  ]

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="mb-6 bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src="/images/gasco-logo.png" alt="GASCO Logo" width={120} height={40} className="h-10 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-blue-900">GASCO - Dashboard Materia</h1>
                <p className="text-blue-700">Sistema de Gestión de Inventario de Cilindros</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-white">
                {filters.realTimeData ? "Tiempo Real" : "Datos Estáticos"}
              </Badge>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TremorCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Opciones de Vista
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Button
                  variant={viewMode === "overview" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("overview")}
                >
                  Resumen
                </Button>
                <Button
                  variant={viewMode === "breakdown" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("breakdown")}
                >
                  Desglose
                </Button>
                <Button
                  variant={viewMode === "comparison" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("comparison")}
                >
                  Comparación
                </Button>
              </div>
              <div className="space-y-3">
                <TremorToggle
                  label="Mostrar Detalles"
                  checked={showDetails}
                  onCheckedChange={setShowDetails}
                  description="Ver información detallada de cada subsistema"
                />
              </div>
            </CardContent>
          </TremorCard>

          <TremorCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtros de Datos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <TremorToggle
                  label="Cilindros Vacíos"
                  checked={filters.showEmpty}
                  onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, showEmpty: checked }))}
                />
                <TremorToggle
                  label="En Mantenimiento"
                  checked={filters.showMaintenance}
                  onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, showMaintenance: checked }))}
                />
                <TremorToggle
                  label="Competencia"
                  checked={filters.showCompetition}
                  onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, showCompetition: checked }))}
                />
                <TremorToggle
                  label="Datos en Tiempo Real"
                  checked={filters.realTimeData}
                  onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, realTimeData: checked }))}
                />
              </div>
            </CardContent>
          </TremorCard>
        </div>

        {/* Main Content */}
        {viewMode === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Resumen de Cilindros */}
            <TremorCard decoration="top" decorationColor="blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Resumen de Cilindros
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Distribución total de cilindros por estado</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-blue-600">7.258</div>
                  <div className="text-sm text-gray-500">Total de Cilindros</div>
                </div>
                <div className="space-y-3">
                  {getFilteredData().map((item, index) => (
                    <TremorMetric
                      key={index}
                      title={item.type}
                      value={item.value.toLocaleString()}
                      target={item.target}
                      change={{
                        value: Math.random() * 10 - 5,
                        type: Math.random() > 0.5 ? "increase" : "decrease",
                      }}
                      tooltip={`${item.percentage}% del total`}
                    />
                  ))}
                </div>
              </CardContent>
            </TremorCard>

            {/* Distribución Visual */}
            <TremorCard decoration="top" decorationColor="green-500">
              <CardHeader>
                <CardTitle>Distribución por Estado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <DonutChart
                    data={getFilteredData().map((item) => ({
                      name: item.type,
                      value: item.value,
                      color: item.color,
                    }))}
                  />
                </div>
                <div className="mt-4 space-y-2">
                  {getFilteredData().map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded`} style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm">{item.type}</span>
                      </div>
                      <span className="text-sm font-medium">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </TremorCard>

            {/* KPIs Operacionales */}
            <TremorCard decoration="top" decorationColor="purple-500">
              <CardHeader>
                <CardTitle>KPIs Operacionales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <TremorMetric
                    title="Eficiencia Global"
                    value="91.6%"
                    change={{ value: 2.3, type: "increase" }}
                    target={95}
                    tooltip="Porcentaje de cilindros operativos vs total"
                  />
                  <TremorMetric
                    title="Rotación Diaria"
                    value="847"
                    change={{ value: -1.2, type: "decrease" }}
                    tooltip="Cilindros procesados por día"
                  />
                  <TremorMetric
                    title="Tiempo Promedio Mantenimiento"
                    value="2.4 días"
                    change={{ value: -0.8, type: "decrease" }}
                    tooltip="MTTR - Mean Time To Repair"
                  />
                </div>
              </CardContent>
            </TremorCard>
          </div>
        )}

        {/* Subsystems Breakdown */}
        {(viewMode === "breakdown" || showDetails) && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Análisis por Subsistemas
            </h2>
            <div className="space-y-4">
              {subsystemsData.map((subsystem) => (
                <TremorCard key={subsystem.id} className="overflow-hidden">
                  <CardHeader
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleSubsystemClick(subsystem.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {selectedSubsystem === subsystem.id ? (
                          <ChevronDown className="w-5 h-5" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                        <CardTitle>{subsystem.name}</CardTitle>
                        <Badge variant={subsystem.alerts > 0 ? "destructive" : "secondary"}>
                          {subsystem.alerts} alertas
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold">{subsystem.total.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">Total Cilindros</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-green-600">{subsystem.efficiency}%</div>
                          <div className="text-sm text-gray-500">Eficiencia</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  {selectedSubsystem === subsystem.id && (
                    <CardContent className="border-t bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                        {Object.entries(subsystem.breakdown).map(([key, data]) => (
                          <div key={key} className="bg-white p-4 rounded-lg border">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium capitalize">{key}</span>
                              {getTrendIcon(data.trend)}
                            </div>
                            <div className="text-2xl font-bold">{data.value.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">{data.percentage}%</div>
                            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${data.percentage}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Detailed Actions */}
                      <div className="p-4 border-t">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Ver Historial
                          </Button>
                          <Button size="sm" variant="outline">
                            Generar Reporte
                          </Button>
                          <Button size="sm" variant="outline">
                            Configurar Alertas
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </TremorCard>
              ))}
            </div>
          </div>
        )}

        {/* Comparison View */}
        {viewMode === "comparison" && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Análisis Comparativo SGP vs SAP</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TremorCard>
                <CardHeader>
                  <CardTitle>Diferencias por Tipo</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo</TableHead>
                        <TableHead>SGP</TableHead>
                        <TableHead>SAP</TableHead>
                        <TableHead>Diferencia</TableHead>
                        <TableHead>%</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Llenos</TableCell>
                        <TableCell>1,120</TableCell>
                        <TableCell>1,050</TableCell>
                        <TableCell className="text-green-600">+70</TableCell>
                        <TableCell className="text-green-600">+6.7%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Vacíos</TableCell>
                        <TableCell>975</TableCell>
                        <TableCell>1,030</TableCell>
                        <TableCell className="text-red-600">-55</TableCell>
                        <TableCell className="text-red-600">-5.3%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </TremorCard>

              <TremorCard>
                <CardHeader>
                  <CardTitle>Alertas y Recomendaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="font-medium text-yellow-800">Discrepancia en Vacíos</div>
                      <div className="text-sm text-yellow-700">Diferencia de -55 cilindros requiere verificación</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="font-medium text-green-800">Exceso en Llenos</div>
                      <div className="text-sm text-green-700">+70 cilindros disponibles para distribución</div>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="font-medium text-blue-800">Recomendación</div>
                      <div className="text-sm text-blue-700">Realizar auditoría de inventario en subsistema 2</div>
                    </div>
                  </div>
                </CardContent>
              </TremorCard>
            </div>
          </div>
        )}

        {/* Layout principal con 2 columnas */}
        <div className="grid grid-cols-2 gap-8">
          {/* Columna izquierda */}
          <div className="space-y-8">
            {/* Resumen de Cilindros */}
            <TremorCard>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Resumen de Cilindros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-600">Masa Total</div>
                  <div className="text-4xl font-bold text-gray-800">{resumenCilindros.masaTotal.value.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">{resumenCilindros.masaTotal.unit}</div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-100 rounded">
                    <div>
                      <div className="font-medium">Llenos</div>
                      <div className="text-sm text-gray-600">{resumenCilindros.breakdown.llenos.percentage}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{resumenCilindros.breakdown.llenos.value.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{resumenCilindros.breakdown.llenos.unit}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-green-100 rounded">
                    <div>
                      <div className="font-medium">Vacíos</div>
                      <div className="text-sm text-gray-600">{resumenCilindros.breakdown.vacios.percentage}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{resumenCilindros.breakdown.vacios.value.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{resumenCilindros.breakdown.vacios.unit}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-orange-100 rounded">
                    <div>
                      <div className="font-medium">Mantencion</div>
                      <div className="text-sm text-gray-600">{resumenCilindros.breakdown.mantencion.percentage}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600">{resumenCilindros.breakdown.mantencion.value.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{resumenCilindros.breakdown.mantencion.unit}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-purple-100 rounded">
                    <div>
                      <div className="font-medium">Competencia</div>
                      <div className="text-sm text-gray-600">{resumenCilindros.breakdown.competencia.percentage}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">{resumenCilindros.breakdown.competencia.value.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{resumenCilindros.breakdown.competencia.unit}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </TremorCard>

            {/* Diferencia stock SGP vs SAP */}
            <TremorCard>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Diferencia stock SGP vs SAP</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div className="font-medium">Llenos</div>
                    <div className="flex gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold">{diferenciaStockSGPvsSAP.llenos.sgp}</div>
                        <div className="text-xs text-gray-500">SGP</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{diferenciaStockSGPvsSAP.llenos.sap}</div>
                        <div className="text-xs text-gray-500">SAP</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">{diferenciaStockSGPvsSAP.llenos.diferencia}</div>
                        <div className="text-xs text-green-600">{diferenciaStockSGPvsSAP.llenos.porcentaje}%</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 border rounded">
                    <div className="font-medium">Vacíos (Kg x Kg (+))</div>
                    <div className="flex gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold">{diferenciaStockSGPvsSAP.vacios.sgp}</div>
                        <div className="text-xs text-gray-500">SGP</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{diferenciaStockSGPvsSAP.vacios.sap}</div>
                        <div className="text-xs text-gray-500">SAP</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-red-600">{diferenciaStockSGPvsSAP.vacios.diferencia}</div>
                        <div className="text-xs text-red-600">{diferenciaStockSGPvsSAP.vacios.porcentaje}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </TremorCard>
          </div>

          {/* Columna derecha */}
          <div>
            {/* Stock Inicial Cilindros por Subsistemas */}
            <TremorCard>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Stock Inicial Cilindros por Subsistemas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {stockInicialSubsistemas.slice(0, 6).map((subsistema, index) => (
                    <div key={index} className="text-center p-4 border rounded-lg">
                      <div className="font-medium text-sm mb-2">{subsistema.nombre}</div>
                      <div className="text-2xl font-bold text-gray-800 mb-2">{subsistema.total.toLocaleString()}</div>
                      <div className="text-xs text-gray-500 mb-3">cil</div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-blue-100 p-2 rounded">
                          <div className="font-medium">Llenos</div>
                          <div className="font-bold text-blue-600">{subsistema.llenos}</div>
                        </div>
                        <div className="bg-green-100 p-2 rounded">
                          <div className="font-medium">Vacíos</div>
                          <div className="font-bold text-green-600">{subsistema.vacios}</div>
                        </div>
                        <div className="bg-orange-100 p-2 rounded">
                          <div className="font-medium">Mantención</div>
                          <div className="font-bold text-orange-600">{subsistema.mantencion}</div>
                        </div>
                        <div className="bg-purple-100 p-2 rounded">
                          <div className="font-medium">Competencia</div>
                          <div className="font-bold text-purple-600">{subsistema.competencia}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subsistema adicional en fila separada */}
                <div className="flex justify-center">
                  <div className="text-center p-4 border rounded-lg w-64">
                    <div className="font-medium text-sm mb-2">{stockInicialSubsistemas[6].nombre}</div>
                    <div className="text-2xl font-bold text-gray-800 mb-2">{stockInicialSubsistemas[6].total.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 mb-3">cil</div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-blue-100 p-2 rounded">
                        <div className="font-medium">Llenos</div>
                        <div className="font-bold text-blue-600">{stockInicialSubsistemas[6].llenos}</div>
                      </div>
                      <div className="bg-green-100 p-2 rounded">
                        <div className="font-medium">Vacíos</div>
                        <div className="font-bold text-green-600">{stockInicialSubsistemas[6].vacios}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </TremorCard>
          </div>
        </div>

        {/* Resumen Por Clasificación Unidades - Tabla completa en la parte inferior */}
        <div className="mt-8">
          <TremorCard>
            <CardHeader>
              <CardTitle className="text-lg font-bold">Resumen Por Clasificación Unidades</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-100">
                    <TableHead className="text-center font-bold">Clasificación</TableHead>
                    <TableHead className="text-center font-bold">Inicial</TableHead>
                    <TableHead className="text-center font-bold">%</TableHead>
                    <TableHead className="text-center font-bold">Online</TableHead>
                    <TableHead className="text-center font-bold">%</TableHead>
                    <TableHead className="text-center font-bold">Diferencia</TableHead>
                    <TableHead className="text-center font-bold">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resumenClasificacionUnidades.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-center font-medium">{item.clasificacion}</TableCell>
                      <TableCell className="text-center">{item.inicial.toLocaleString()}</TableCell>
                      <TableCell className="text-center">{item.inicial_porcentaje}%</TableCell>
                      <TableCell className="text-center">{item.online.toLocaleString()}</TableCell>
                      <TableCell className="text-center">{item.online_porcentaje}%</TableCell>
                      <TableCell className={`text-center font-bold ${item.diferencia >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.diferencia > 0 ? '+' : ''}{item.diferencia}
                      </TableCell>
                      <TableCell className="text-center font-bold">{item.total.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </TremorCard>
        </div>
      </div>
    </TooltipProvider>
  )
}
