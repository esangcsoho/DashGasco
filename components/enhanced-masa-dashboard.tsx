"use client"

import { useState } from "react"
import Image from "next/image"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TremorCard } from "./ui/tremor-card"
import { TremorToggle } from "./ui/tremor-toggle"
import { ChevronDown, ChevronRight, Info, Scale, TrendingUp, Activity } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function EnhancedMasaDashboard() {
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [showRealTime, setShowRealTime] = useState(false)

  // Datos exactos según la imagen de referencia
  const operationalMetrics = {
    cilindrosOperativos: { value: 8850, unit: "Cil" },
    requerimientoOptimo: { value: 8500, unit: "Cil" },
    diferencia: { value: 350, unit: "Cil", percentage: 4.1 }
  }

  const stockInicial = {
    masaTotal: { value: 8800, unit: "Cil" },
      breakdown: {
      llenos: [
        { value: 2300, unit: "Cil", masa: 23, masaUnit: "Ton" },
        { value: 2900, unit: "Cil", masa: 29, masaUnit: "Ton" }
      ],
      vacios: [
        { value: 1600, unit: "Cil", masa: 16, masaUnit: "Ton" },
        { value: 2000, unit: "Cil", masa: 20, masaUnit: "Ton" }
      ]
    }
  }

  const stockOnline = {
    masaTotal: { value: 9200, unit: "Cil" },
      breakdown: {
      llenos: [
        { value: 2400, unit: "Cil", masa: 24, masaUnit: "Ton" },
        { value: 3000, unit: "Cil", masa: 30, masaUnit: "Ton" }
      ],
      vacios: [
        { value: 1800, unit: "Cil", masa: 18, masaUnit: "Ton" },
        { value: 2000, unit: "Cil", masa: 20, masaUnit: "Ton" }
      ]
    }
  }

  const resumenOnlineSubsistemas = [
    { producto: "Llenos", inicial: 0, online: 12 },
    { producto: "Vacíos", inicial: 1136, online: 1136 },
    { producto: "Mantencion", inicial: 500, online: 1136 },
    { producto: "Competencia", inicial: 678, online: 2.41 }
  ]

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header con logo Gasco */}
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-4">
            <Image src="/images/gasco-logo.png" alt="GASCO Logo" width={80} height={26} className="h-6 w-auto" />
          </div>
        </div>

        {/* Título principal exacto */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-800">Resumen de Cilindros Operativos Respecto de Masa Optima</h1>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Cilindros operativos</div>
            <div className="text-4xl font-bold text-gray-800">{operationalMetrics.cilindrosOperativos.value.toLocaleString()}</div>
            <div className="text-sm text-gray-500">{operationalMetrics.cilindrosOperativos.unit}</div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Requerimiento de cilindros optimo</div>
            <div className="text-4xl font-bold text-gray-800">{operationalMetrics.requerimientoOptimo.value.toLocaleString()}</div>
            <div className="text-sm text-gray-500">{operationalMetrics.requerimientoOptimo.unit}</div>
              </div>
          
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Diferencia</div>
            <div className="flex items-center justify-center gap-4">
              <div>
                <div className="text-4xl font-bold text-blue-600">{operationalMetrics.diferencia.value}</div>
                <div className="text-sm text-gray-500">{operationalMetrics.diferencia.unit}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{operationalMetrics.diferencia.percentage}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stock Inicial y Stock Online */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Stock Inicial */}
          <TremorCard>
            <CardHeader>
              <CardTitle>Stock Inicial</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-sm text-gray-600">Masa Total</div>
                <div className="text-3xl font-bold text-gray-800">{stockInicial.masaTotal.value.toLocaleString()}</div>
                <div className="text-sm text-gray-500">{stockInicial.masaTotal.unit}</div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  {stockInicial.breakdown.llenos.map((item, index) => (
                    <div key={index} className="text-center p-4 bg-blue-100 rounded-lg">
                      <div className="text-xs text-gray-600 mb-1">Llenos</div>
                      <div className="text-2xl font-bold text-gray-800">{item.value.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{item.unit}</div>
                      <div className="text-lg font-bold text-blue-600 mt-2">{item.masa}</div>
                      <div className="text-xs text-blue-600">{item.masaUnit}</div>
              </div>
                  ))}
        </div>
                <div className="space-y-4">
                  {stockInicial.breakdown.vacios.map((item, index) => (
                    <div key={index} className="text-center p-4 bg-blue-100 rounded-lg">
                      <div className="text-xs text-gray-600 mb-1">Llenos</div>
                      <div className="text-2xl font-bold text-gray-800">{item.value.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{item.unit}</div>
                      <div className="text-lg font-bold text-blue-600 mt-2">{item.masa}</div>
                      <div className="text-xs text-blue-600">{item.masaUnit}</div>
              </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </TremorCard>

          {/* Resumen Online Total Por Subsistema */}
          <TremorCard>
            <CardHeader>
              <CardTitle>Resumen Online Total Por Subsistema</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-100">
                    <TableHead className="text-center">Productos</TableHead>
                    <TableHead className="text-center">Inicial</TableHead>
                    <TableHead className="text-center">Online</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resumenOnlineSubsistemas.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-center font-medium">{item.producto}</TableCell>
                      <TableCell className="text-center">{item.inicial}</TableCell>
                      <TableCell className="text-center">{item.online}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </TremorCard>
        </div>

        {/* Stock Online */}
        <div className="mb-8">
            <TremorCard>
              <CardHeader>
              <CardTitle>Stock Online</CardTitle>
              </CardHeader>
              <CardContent>
              <div className="text-center mb-6">
                <div className="text-sm text-gray-600">Masa Total</div>
                <div className="text-3xl font-bold text-gray-800">{stockOnline.masaTotal.value.toLocaleString()}</div>
                <div className="text-sm text-gray-500">{stockOnline.masaTotal.unit}</div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  {stockOnline.breakdown.llenos.map((item, index) => (
                    <div key={index} className="text-center p-4 bg-blue-100 rounded-lg">
                      <div className="text-xs text-gray-600 mb-1">Llenos</div>
                      <div className="text-2xl font-bold text-gray-800">{item.value.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{item.unit}</div>
                      <div className="text-lg font-bold text-blue-600 mt-2">{item.masa}</div>
                      <div className="text-xs text-blue-600">{item.masaUnit}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {stockOnline.breakdown.vacios.map((item, index) => (
                    <div key={index} className="text-center p-4 bg-blue-100 rounded-lg">
                      <div className="text-xs text-gray-600 mb-1">Llenos</div>
                      <div className="text-2xl font-bold text-gray-800">{item.value.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{item.unit}</div>
                      <div className="text-lg font-bold text-blue-600 mt-2">{item.masa}</div>
                      <div className="text-xs text-blue-600">{item.masaUnit}</div>
                    </div>
                  ))}
                </div>
                </div>
              </CardContent>
            </TremorCard>
          </div>
      </div>
    </TooltipProvider>
  )
}
