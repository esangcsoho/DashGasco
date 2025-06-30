"use client"

import { useState } from "react"
import Image from "next/image"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TremorCard } from "./ui/tremor-card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function EnhancedCilindrosDashboard() {
  // Datos exactos según la imagen de referencia cilindros.png
  const operationalMetrics = {
    cilindrosOperativos: { value: 8850, unit: "Cil" },
    requerimientoOptimo: { value: 8500, unit: "Cil" },
    diferencia: { value: 350, unit: "Cil", percentage: 4.1 }
  }

  const resumenCilindros = {
    masaTotal: { value: 7258, unit: "cil" },
      breakdown: {
      llenos: { value: 3228, percentage: 44.4, unit: "cil" },
      vacios: { value: 1871, percentage: 25.8, unit: "cil" },
      mantencion: { value: 918, percentage: 12.6, unit: "cil" },
      competencia: { value: 733, percentage: 10.1, unit: "cil" },
      otros: { value: 508, percentage: 7.0, unit: "cil" }
    }
  }

  const diferenciaOperativa = [
    { formato: "5K", diferencia_llenos: 0, diferencia_vacios: 0, diferencia_total: 0 },
    { formato: "11K", diferencia_llenos: 0, diferencia_vacios: 0, diferencia_total: 0 },
    { formato: "15K", diferencia_llenos: -500, diferencia_vacios: -25, diferencia_total: -525 },
    { formato: "45K", diferencia_llenos: -1038, diferencia_vacios: -45, diferencia_total: -1083 },
    { formato: "GH", diferencia_llenos: -836, diferencia_vacios: -80, diferencia_total: -916 }
  ]

  const stockInicialSubsistemas = [
    { nombre: "1 Despacho", llenos: 1000, vacios: 850, mantencion: 450, competencia: 380, total: 2680 },
    { nombre: "2 Bodega", llenos: 900, vacios: 750, mantencion: 420, competencia: 330, total: 2400 },
    { nombre: "3 Patio", llenos: 1200, vacios: 800, mantencion: 480, competencia: 450, total: 2930 },
    { nombre: "4 Almacén", llenos: 850, vacios: 600, mantencion: 380, competencia: 320, total: 2150 },
    { nombre: "5 Recepción", llenos: 750, vacios: 550, mantencion: 350, competencia: 280, total: 1930 },
    { nombre: "6 Distribución", llenos: 1100, vacios: 750, mantencion: 420, competencia: 380, total: 2650 },
    { nombre: "7 Mantenimiento", llenos: 950, vacios: 700, mantencion: 480, competencia: 350, total: 2480 }
  ]

  const desgloseMantencionCompetencia = {
    mantencion: [
      { formato: "5K", sistemas: 0, clientes: 0, terceros: 0, total: 0 },
      { formato: "11K", sistemas: 0, clientes: 0, terceros: 0, total: 0 },
      { formato: "15K", sistemas: 0, clientes: 0, terceros: 0, total: 0 },
      { formato: "45K", sistemas: 0, clientes: 0, terceros: 0, total: 0 },
      { formato: "GH", sistemas: 0, clientes: 0, terceros: 0, total: 0 }
    ],
    competencia: [
      { formato: "5K", sistemas: 0, clientes: 0, terceros: 0, total: 0 },
      { formato: "11K", sistemas: 0, clientes: 0, terceros: 0, total: 0 },
      { formato: "15K", sistemas: 0, clientes: 0, terceros: 0, total: 0 },
      { formato: "45K", sistemas: 0, clientes: 0, terceros: 0, total: 0 },
      { formato: "GH", sistemas: 0, clientes: 0, terceros: 0, total: 0 }
    ]
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

        {/* Título principal */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-800">Análisis de Cilindros Operativos</h1>
              </div>

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

                  <div className="flex justify-between items-center p-3 bg-gray-100 rounded">
                      <div>
                      <div className="font-medium">Otros</div>
                      <div className="text-sm text-gray-600">{resumenCilindros.breakdown.otros.percentage}%</div>
                              </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-600">{resumenCilindros.breakdown.otros.value.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{resumenCilindros.breakdown.otros.unit}</div>
                                </div>
                                </div>
                              </div>
              </CardContent>
            </TremorCard>

            {/* Diferencia Operativa */}
            <TremorCard>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Diferencia Operativa</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-100">
                      <TableHead className="text-center font-bold">Formato</TableHead>
                      <TableHead className="text-center font-bold">Diferencia Llenos</TableHead>
                      <TableHead className="text-center font-bold">Diferencia Vacíos</TableHead>
                      <TableHead className="text-center font-bold">Diferencia Total Cilindros</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {diferenciaOperativa.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-center font-medium">{item.formato}</TableCell>
                        <TableCell className={`text-center font-bold ${item.diferencia_llenos === 0 ? 'text-gray-600' : item.diferencia_llenos > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.diferencia_llenos === 0 ? '0' : (item.diferencia_llenos > 0 ? '+' : '') + item.diferencia_llenos}
                        </TableCell>
                        <TableCell className={`text-center font-bold ${item.diferencia_vacios === 0 ? 'text-gray-600' : item.diferencia_vacios > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.diferencia_vacios === 0 ? '0' : (item.diferencia_vacios > 0 ? '+' : '') + item.diferencia_vacios}
                        </TableCell>
                        <TableCell className={`text-center font-bold ${item.diferencia_total === 0 ? 'text-gray-600' : item.diferencia_total > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.diferencia_total === 0 ? '0' : (item.diferencia_total > 0 ? '+' : '') + item.diferencia_total}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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

        {/* Sección inferior con 2 tablas: Desglose Mantencion y Desglose Competencia */}
        <div className="mt-8 grid grid-cols-2 gap-8">
          {/* Desglose Mantencion */}
          <TremorCard>
            <CardHeader>
              <CardTitle className="text-lg font-bold">Desglose Mantencion</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-orange-100">
                    <TableHead className="text-center font-bold">Formato</TableHead>
                    <TableHead className="text-center font-bold">Sistemas</TableHead>
                    <TableHead className="text-center font-bold">Clientes</TableHead>
                    <TableHead className="text-center font-bold">Terceros</TableHead>
                    <TableHead className="text-center font-bold">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {desgloseMantencionCompetencia.mantencion.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-center font-medium">{item.formato}</TableCell>
                      <TableCell className="text-center">{item.sistemas}</TableCell>
                      <TableCell className="text-center">{item.clientes}</TableCell>
                      <TableCell className="text-center">{item.terceros}</TableCell>
                      <TableCell className="text-center font-bold">{item.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </TremorCard>

          {/* Desglose Competencia */}
          <TremorCard>
            <CardHeader>
              <CardTitle className="text-lg font-bold">Desglose Competencia</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-purple-100">
                    <TableHead className="text-center font-bold">Formato</TableHead>
                    <TableHead className="text-center font-bold">Sistemas</TableHead>
                    <TableHead className="text-center font-bold">Clientes</TableHead>
                    <TableHead className="text-center font-bold">Terceros</TableHead>
                    <TableHead className="text-center font-bold">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {desgloseMantencionCompetencia.competencia.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-center font-medium">{item.formato}</TableCell>
                      <TableCell className="text-center">{item.sistemas}</TableCell>
                      <TableCell className="text-center">{item.clientes}</TableCell>
                      <TableCell className="text-center">{item.terceros}</TableCell>
                      <TableCell className="text-center font-bold">{item.total}</TableCell>
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
