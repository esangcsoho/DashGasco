"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, ChevronRight, Eye } from "lucide-react"
import { calculateNationalTotals, UNIFIED_DATA } from "@/lib/data-model"
import Image from "next/image"

interface CilindrosSectionProps {
  showDetailTables: boolean
  setShowDetailTables: (show: boolean) => void
}

export function CilindrosSection({ showDetailTables, setShowDetailTables }: CilindrosSectionProps) {
  const NATIONAL_TOTALS = calculateNationalTotals();
  // Datos calculados desde NATIONAL_TOTALS
  const totalCilindros = NATIONAL_TOTALS.cilindros.total
  const llenos = NATIONAL_TOTALS.cilindros.llenos
  const vacios = NATIONAL_TOTALS.cilindros.vacios
  const mantencion = NATIONAL_TOTALS.cilindros.mantencion
  const competencia = NATIONAL_TOTALS.cilindros.competencia

  const llenosPercent = ((llenos / totalCilindros) * 100).toFixed(1)
  const vaciosPercent = ((vacios / totalCilindros) * 100).toFixed(1)
  const mantencionPercent = ((mantencion / totalCilindros) * 100).toFixed(1)
  const competenciaPercent = ((competencia / totalCilindros) * 100).toFixed(1)

  // Datos de subsistemas para el grid
  const subsystemsData = [
    { nombre: "SS Maipú", llenos: 24288, vacios: 14541, mantencion: 3950, competencia: 2887, total: 45666 },
    { nombre: "SS Mejillones", llenos: 16788, vacios: 8955, mantencion: 5000, competencia: 5000, total: 35743 },
    { nombre: "SS Belloto", llenos: 12000, vacios: 8000, mantencion: 4500, competencia: 4000, total: 28500 },
    { nombre: "SS Talca", llenos: 0, vacios: 0, mantencion: 0, competencia: 0, total: 0 },
    { nombre: "SS Biobio", llenos: 18500, vacios: 12000, mantencion: 6500, competencia: 5000, total: 42000 },
    { nombre: "SS Osorno", llenos: 0, vacios: 0, mantencion: 0, competencia: 0, total: 0 },
    { nombre: "SS Coyhaique", llenos: 0, vacios: 0, mantencion: 0, competencia: 0, total: 0 }
  ]

  // Datos para SGP vs SAP
  const sgpVsSapData = [
    { tipo: "Llenos", sgp: llenos, sap: 64500, diferencia: llenos - 64500, porcentaje: (((llenos - 64500) / 64500) * 100).toFixed(1) },
    { tipo: "Vacíos", sgp: vacios, sap: 34200, diferencia: vacios - 34200, porcentaje: (((vacios - 34200) / 34200) * 100).toFixed(1) },
    { tipo: "Mantencion", sgp: mantencion, sap: 17800, diferencia: mantencion - 17800, porcentaje: (((mantencion - 17800) / 17800) * 100).toFixed(1) },
    { tipo: "Competencia", sgp: competencia, sap: 15200, diferencia: competencia - 15200, porcentaje: (((competencia - 15200) / 15200) * 100).toFixed(1) }
  ]

  return (
    <div className="space-y-6">
      {/* Header específico para Cilindros - siguiendo @cilindros.png */}
      <div className="bg-gray-100 border-b border-gray-300 p-3">
        <div className="flex items-center gap-4">
          <Image src="/images/gasco-logo.png" alt="GASCO Logo" width={50} height={16} className="h-4 w-auto" />
          <h2 className="text-base font-semibold text-gray-700">Análisis de Cilindros Operativos</h2>
        </div>
      </div>

      {/* Layout principal: 2 columnas exacto a @cilindros.png */}
      <div className="grid grid-cols-2 gap-6">
        
        {/* Columna izquierda: Resumen de Cilindros */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">Resumen de Cilindros</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Total principal con formato idéntico */}
            <div className="text-center mb-6 p-4 bg-blue-50 rounded-lg border">
              <div className="text-sm text-gray-600 mb-2">Masa Total</div>
              <div className="text-4xl font-bold text-blue-600">{(totalCilindros / 1000).toFixed(1)}k</div>
              <div className="text-sm text-blue-600">cil</div>
            </div>

            {/* Breakdown exacto a la imagen */}
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-100 rounded">
                <div>
                  <div className="font-medium">Llenos</div>
                  <div className="text-sm text-gray-600">{llenosPercent}%</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{(llenos / 1000).toFixed(1)}k</div>
                  <div className="text-sm text-gray-500">cil</div>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-green-100 rounded">
                <div>
                  <div className="font-medium">Vacíos</div>
                  <div className="text-sm text-gray-600">{vaciosPercent}%</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{(vacios / 1000).toFixed(1)}k</div>
                  <div className="text-sm text-gray-500">cil</div>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-orange-100 rounded">
                <div>
                  <div className="font-medium">Mantencion</div>
                  <div className="text-sm text-gray-600">{mantencionPercent}%</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-600">{(mantencion / 1000).toFixed(1)}k</div>
                  <div className="text-sm text-gray-500">cil</div>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-purple-100 rounded">
                <div>
                  <div className="font-medium">Competencia</div>
                  <div className="text-sm text-gray-600">{competenciaPercent}%</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{(competencia / 1000).toFixed(1)}k</div>
                  <div className="text-sm text-gray-500">cil</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Columna derecha: Diferencia stock SGP vs SAP */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">Diferencia stock SGP vs SAP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Headers */}
              <div className="grid grid-cols-4 gap-2 text-xs font-bold text-gray-600 border-b pb-2">
                <div>Tipo</div>
                <div className="text-center">SGP</div>
                <div className="text-center">SAP</div>
                <div className="text-center">Diferencia</div>
              </div>

              {/* Datos SGP vs SAP */}
              {sgpVsSapData.map((item, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 items-center py-2 border-b border-gray-100">
                  <div className="font-medium text-sm">{item.tipo}</div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-600">{(item.sgp / 1000).toFixed(1)}k</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-600">{(item.sap / 1000).toFixed(1)}k</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-bold ${item.diferencia >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.diferencia >= 0 ? '+' : ''}{(item.diferencia / 1000).toFixed(1)}k
                    </div>
                    <div className={`text-xs ${item.diferencia >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {item.diferencia >= 0 ? '+' : ''}{item.porcentaje}%
                    </div>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="grid grid-cols-4 gap-2 items-center py-2 border-t-2 border-gray-300 bg-gray-50 rounded">
                <div className="font-bold">Total</div>
                <div className="text-center">
                  <div className="text-sm font-bold text-blue-600">{(totalCilindros / 1000).toFixed(1)}k</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-600">{(131.7).toFixed(1)}k</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-green-600">+6.8k</div>
                  <div className="text-xs text-green-500">+5.4%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Inicial Cilindros por Subsistemas - Grid 7 exacto */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold">Stock Inicial Cilindros por Subsistemas</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Ver Detalle
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Desglose Detallado por Subsistemas</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Desglose Mantencion */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">Desglose Mantencion</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subsistema</TableHead>
                          <TableHead className="text-center">Revisión</TableHead>
                          <TableHead className="text-center">Reparación</TableHead>
                          <TableHead className="text-center">Pintura</TableHead>
                          <TableHead className="text-center">Válvulas</TableHead>
                          <TableHead className="text-center">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subsystemsData.filter(s => s.total > 0).map((subsistema, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{subsistema.nombre}</TableCell>
                            <TableCell className="text-center">{Math.round(subsistema.mantencion * 0.3).toLocaleString()}</TableCell>
                            <TableCell className="text-center">{Math.round(subsistema.mantencion * 0.25).toLocaleString()}</TableCell>
                            <TableCell className="text-center">{Math.round(subsistema.mantencion * 0.25).toLocaleString()}</TableCell>
                            <TableCell className="text-center">{Math.round(subsistema.mantencion * 0.2).toLocaleString()}</TableCell>
                            <TableCell className="text-center font-bold">{subsistema.mantencion.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                        {/* Total horizontal */}
                        <TableRow className="bg-gray-100 font-bold border-t-2">
                          <TableCell>TOTAL</TableCell>
                          <TableCell className="text-center">{Math.round(mantencion * 0.3).toLocaleString()}</TableCell>
                          <TableCell className="text-center">{Math.round(mantencion * 0.25).toLocaleString()}</TableCell>
                          <TableCell className="text-center">{Math.round(mantencion * 0.25).toLocaleString()}</TableCell>
                          <TableCell className="text-center">{Math.round(mantencion * 0.2).toLocaleString()}</TableCell>
                          <TableCell className="text-center text-blue-600">{mantencion.toLocaleString()}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {/* Desglose Competencia */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">Desglose Competencia</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subsistema</TableHead>
                          <TableHead className="text-center">Lipigas</TableHead>
                          <TableHead className="text-center">Gasco</TableHead>
                          <TableHead className="text-center">Abastible</TableHead>
                          <TableHead className="text-center">Otros</TableHead>
                          <TableHead className="text-center">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subsystemsData.filter(s => s.total > 0).map((subsistema, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{subsistema.nombre}</TableCell>
                            <TableCell className="text-center">{Math.round(subsistema.competencia * 0.4).toLocaleString()}</TableCell>
                            <TableCell className="text-center">{Math.round(subsistema.competencia * 0.3).toLocaleString()}</TableCell>
                            <TableCell className="text-center">{Math.round(subsistema.competencia * 0.2).toLocaleString()}</TableCell>
                            <TableCell className="text-center">{Math.round(subsistema.competencia * 0.1).toLocaleString()}</TableCell>
                            <TableCell className="text-center font-bold">{subsistema.competencia.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                        {/* Total horizontal */}
                        <TableRow className="bg-gray-100 font-bold border-t-2">
                          <TableCell>TOTAL</TableCell>
                          <TableCell className="text-center">{Math.round(competencia * 0.4).toLocaleString()}</TableCell>
                          <TableCell className="text-center">{Math.round(competencia * 0.3).toLocaleString()}</TableCell>
                          <TableCell className="text-center">{Math.round(competencia * 0.2).toLocaleString()}</TableCell>
                          <TableCell className="text-center">{Math.round(competencia * 0.1).toLocaleString()}</TableCell>
                          <TableCell className="text-center text-purple-600">{competencia.toLocaleString()}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {/* Clasificación por Tamaño de Cilindros */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">Clasificación por Tamaño de Unidades</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subsistema</TableHead>
                          <TableHead className="text-center">5kg</TableHead>
                          <TableHead className="text-center">11kg</TableHead>
                          <TableHead className="text-center">15kg</TableHead>
                          <TableHead className="text-center">45kg</TableHead>
                          <TableHead className="text-center">GH</TableHead>
                          <TableHead className="text-center">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subsystemsData.filter(s => s.total > 0).map((subsistema, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{subsistema.nombre}</TableCell>
                            <TableCell className="text-center">{Math.round(subsistema.total * 0.45).toLocaleString()}</TableCell>
                            <TableCell className="text-center">{Math.round(subsistema.total * 0.25).toLocaleString()}</TableCell>
                            <TableCell className="text-center">{Math.round(subsistema.total * 0.15).toLocaleString()}</TableCell>
                            <TableCell className="text-center">{Math.round(subsistema.total * 0.10).toLocaleString()}</TableCell>
                            <TableCell className="text-center">{Math.round(subsistema.total * 0.05).toLocaleString()}</TableCell>
                            <TableCell className="text-center font-bold">{subsistema.total.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                        {/* Total horizontal */}
                        <TableRow className="bg-gray-100 font-bold border-t-2">
                          <TableCell>TOTAL</TableCell>
                          <TableCell className="text-center">{Math.round(totalCilindros * 0.45).toLocaleString()}</TableCell>
                          <TableCell className="text-center">{Math.round(totalCilindros * 0.25).toLocaleString()}</TableCell>
                          <TableCell className="text-center">{Math.round(totalCilindros * 0.15).toLocaleString()}</TableCell>
                          <TableCell className="text-center">{Math.round(totalCilindros * 0.10).toLocaleString()}</TableCell>
                          <TableCell className="text-center">{Math.round(totalCilindros * 0.05).toLocaleString()}</TableCell>
                          <TableCell className="text-center text-blue-600">{totalCilindros.toLocaleString()}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Grid de 7 subsistemas en formato 3+3+1 */}
          <div className="space-y-4">
            {/* Primera fila: 3 subsistemas */}
            <div className="grid grid-cols-3 gap-4">
              {subsystemsData.slice(0, 3).map((subsistema, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <div className="text-center p-4 border rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="text-lg font-bold mb-3">{subsistema.total > 0 ? (subsistema.total / 1000).toFixed(1) + 'k' : '0'} cil</div>
                      <div className="text-sm font-medium mb-2">{subsistema.nombre}</div>
                      
                      {subsistema.total > 0 ? (
                        <>
                          {/* Barra apilada */}
                          <div className="flex mb-2 h-6 rounded overflow-hidden">
                            <div 
                              className="bg-blue-500 flex items-center justify-center text-white text-xs font-bold"
                              style={{ width: `${(subsistema.llenos / subsistema.total) * 100}%` }}
                            >
                              {Math.round((subsistema.llenos / subsistema.total) * 100)}%
                            </div>
                            <div 
                              className="bg-green-500 flex items-center justify-center text-white text-xs font-bold"
                              style={{ width: `${(subsistema.vacios / subsistema.total) * 100}%` }}
                            >
                              {Math.round((subsistema.vacios / subsistema.total) * 100)}%
                            </div>
                            <div 
                              className="bg-orange-500 flex items-center justify-center text-white text-xs font-bold"
                              style={{ width: `${(subsistema.mantencion / subsistema.total) * 100}%` }}
                            >
                              {Math.round((subsistema.mantencion / subsistema.total) * 100)}%
                            </div>
                            <div 
                              className="bg-purple-500 flex items-center justify-center text-white text-xs font-bold"
                              style={{ width: `${(subsistema.competencia / subsistema.total) * 100}%` }}
                            >
                              {Math.round((subsistema.competencia / subsistema.total) * 100)}%
                            </div>
                          </div>

                          {/* Etiquetas */}
                          <div className="grid grid-cols-4 gap-1 text-xs">
                            <div className="text-blue-600 font-medium">Llenos</div>
                            <div className="text-green-600 font-medium">Vacíos</div>
                            <div className="text-orange-600 font-medium">Mant.</div>
                            <div className="text-purple-600 font-medium">Comp.</div>
                          </div>
                          <div className="text-xs text-gray-500 mt-2">Click para detalle</div>
                        </>
                      ) : (
                        <div className="text-gray-400 text-sm">Inactivo</div>
                      )}
                    </div>
                  </DialogTrigger>
                  
                  {subsistema.total > 0 && (
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Detalle Completo - {subsistema.nombre}</DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        {/* Resumen del Subsistema */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-blue-50 rounded">
                            <h4 className="font-bold mb-2">Información General</h4>
                            <div className="space-y-1 text-sm">
                              <div>Total: <span className="font-bold">{subsistema.total.toLocaleString()}</span> cilindros</div>
                              <div>Ocupación: <span className="font-bold text-green-600">{((subsistema.llenos / subsistema.total) * 100).toFixed(1)}%</span></div>
                              <div>Capacidad: <span className="font-bold">{Math.round(subsistema.total * 1.2).toLocaleString()}</span> cilindros</div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-gray-50 rounded">
                            <h4 className="font-bold mb-2">Distribución por Estado</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-blue-600">Llenos:</span>
                                <span className="font-bold">{subsistema.llenos.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-green-600">Vacíos:</span>
                                <span className="font-bold">{subsistema.vacios.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-orange-600">Mantencion:</span>
                                <span className="font-bold">{subsistema.mantencion.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-purple-600">Competencia:</span>
                                <span className="font-bold">{subsistema.competencia.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Desglose por Tamaño */}
                        <div>
                          <h4 className="font-bold mb-3">Distribución por Tamaño</h4>
                          <div className="grid grid-cols-5 gap-3">
                            <div className="text-center p-3 bg-blue-50 rounded">
                              <div className="text-xs text-gray-600">5kg</div>
                              <div className="font-bold">{Math.round(subsistema.total * 0.45).toLocaleString()}</div>
                              <div className="text-xs">45%</div>
                            </div>
                            <div className="text-center p-3 bg-green-50 rounded">
                              <div className="text-xs text-gray-600">11kg</div>
                              <div className="font-bold">{Math.round(subsistema.total * 0.25).toLocaleString()}</div>
                              <div className="text-xs">25%</div>
                            </div>
                            <div className="text-center p-3 bg-yellow-50 rounded">
                              <div className="text-xs text-gray-600">15kg</div>
                              <div className="font-bold">{Math.round(subsistema.total * 0.15).toLocaleString()}</div>
                              <div className="text-xs">15%</div>
                            </div>
                            <div className="text-center p-3 bg-orange-50 rounded">
                              <div className="text-xs text-gray-600">45kg</div>
                              <div className="font-bold">{Math.round(subsistema.total * 0.10).toLocaleString()}</div>
                              <div className="text-xs">10%</div>
                            </div>
                            <div className="text-center p-3 bg-purple-50 rounded">
                              <div className="text-xs text-gray-600">GH</div>
                              <div className="font-bold">{Math.round(subsistema.total * 0.05).toLocaleString()}</div>
                              <div className="text-xs">5%</div>
                            </div>
                          </div>
                        </div>

                        {/* Detalle de Mantencion */}
                        <div>
                          <h4 className="font-bold mb-3">Composición Mantencion</h4>
                          <div className="grid grid-cols-4 gap-3">
                            <div className="text-center p-2 bg-orange-50 rounded">
                              <div className="text-xs text-gray-600">Revisión</div>
                              <div className="font-bold">{Math.round(subsistema.mantencion * 0.3).toLocaleString()}</div>
                            </div>
                            <div className="text-center p-2 bg-orange-50 rounded">
                              <div className="text-xs text-gray-600">Reparación</div>
                              <div className="font-bold">{Math.round(subsistema.mantencion * 0.25).toLocaleString()}</div>
                            </div>
                            <div className="text-center p-2 bg-orange-50 rounded">
                              <div className="text-xs text-gray-600">Pintura</div>
                              <div className="font-bold">{Math.round(subsistema.mantencion * 0.25).toLocaleString()}</div>
                            </div>
                            <div className="text-center p-2 bg-orange-50 rounded">
                              <div className="text-xs text-gray-600">Válvulas</div>
                              <div className="font-bold">{Math.round(subsistema.mantencion * 0.2).toLocaleString()}</div>
                            </div>
                          </div>
                        </div>

                        {/* Detalle de Competencia */}
                        <div>
                          <h4 className="font-bold mb-3">Composición Competencia</h4>
                          <div className="grid grid-cols-4 gap-3">
                            <div className="text-center p-2 bg-purple-50 rounded">
                              <div className="text-xs text-gray-600">Lipigas</div>
                              <div className="font-bold">{Math.round(subsistema.competencia * 0.4).toLocaleString()}</div>
                              <div className="text-xs">40%</div>
                            </div>
                            <div className="text-center p-2 bg-purple-50 rounded">
                              <div className="text-xs text-gray-600">Gasco</div>
                              <div className="font-bold">{Math.round(subsistema.competencia * 0.3).toLocaleString()}</div>
                              <div className="text-xs">30%</div>
                            </div>
                            <div className="text-center p-2 bg-purple-50 rounded">
                              <div className="text-xs text-gray-600">Abastible</div>
                              <div className="font-bold">{Math.round(subsistema.competencia * 0.2).toLocaleString()}</div>
                              <div className="text-xs">20%</div>
                            </div>
                            <div className="text-center p-2 bg-purple-50 rounded">
                              <div className="text-xs text-gray-600">Otros</div>
                              <div className="font-bold">{Math.round(subsistema.competencia * 0.1).toLocaleString()}</div>
                              <div className="text-xs">10%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              ))}
            </div>

            {/* Segunda fila: 3 subsistemas */}
            <div className="grid grid-cols-3 gap-4">
              {subsystemsData.slice(3, 6).map((subsistema, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <div className="text-center p-4 border rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="text-lg font-bold mb-3">{subsistema.total > 0 ? (subsistema.total / 1000).toFixed(1) + 'k' : '0'} cil</div>
                      <div className="text-sm font-medium mb-2">{subsistema.nombre}</div>
                      
                      {subsistema.total > 0 ? (
                        <>
                          {/* Barra apilada */}
                          <div className="flex mb-2 h-6 rounded overflow-hidden">
                            <div 
                              className="bg-blue-500 flex items-center justify-center text-white text-xs font-bold"
                              style={{ width: `${(subsistema.llenos / subsistema.total) * 100}%` }}
                            >
                              {Math.round((subsistema.llenos / subsistema.total) * 100)}%
                            </div>
                            <div 
                              className="bg-green-500 flex items-center justify-center text-white text-xs font-bold"
                              style={{ width: `${(subsistema.vacios / subsistema.total) * 100}%` }}
                            >
                              {Math.round((subsistema.vacios / subsistema.total) * 100)}%
                            </div>
                            <div 
                              className="bg-orange-500 flex items-center justify-center text-white text-xs font-bold"
                              style={{ width: `${(subsistema.mantencion / subsistema.total) * 100}%` }}
                            >
                              {Math.round((subsistema.mantencion / subsistema.total) * 100)}%
                            </div>
                            <div 
                              className="bg-purple-500 flex items-center justify-center text-white text-xs font-bold"
                              style={{ width: `${(subsistema.competencia / subsistema.total) * 100}%` }}
                            >
                              {Math.round((subsistema.competencia / subsistema.total) * 100)}%
                            </div>
                          </div>

                          {/* Etiquetas */}
                          <div className="grid grid-cols-4 gap-1 text-xs">
                            <div className="text-blue-600 font-medium">Llenos</div>
                            <div className="text-green-600 font-medium">Vacíos</div>
                            <div className="text-orange-600 font-medium">Mant.</div>
                            <div className="text-purple-600 font-medium">Comp.</div>
                          </div>
                          <div className="text-xs text-gray-500 mt-2">Click para detalle</div>
                        </>
                      ) : (
                        <div className="text-gray-400 text-sm">Inactivo</div>
                      )}
                    </div>
                  </DialogTrigger>
                  
                  {subsistema.total > 0 && (
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Detalle Completo - {subsistema.nombre}</DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        {/* Resumen del Subsistema */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-blue-50 rounded">
                            <h4 className="font-bold mb-2">Información General</h4>
                            <div className="space-y-1 text-sm">
                              <div>Total: <span className="font-bold">{subsistema.total.toLocaleString()}</span> cilindros</div>
                              <div>Ocupación: <span className="font-bold text-green-600">{((subsistema.llenos / subsistema.total) * 100).toFixed(1)}%</span></div>
                              <div>Capacidad: <span className="font-bold">{Math.round(subsistema.total * 1.2).toLocaleString()}</span> cilindros</div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-gray-50 rounded">
                            <h4 className="font-bold mb-2">Distribución por Estado</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-blue-600">Llenos:</span>
                                <span className="font-bold">{subsistema.llenos.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-green-600">Vacíos:</span>
                                <span className="font-bold">{subsistema.vacios.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-orange-600">Mantencion:</span>
                                <span className="font-bold">{subsistema.mantencion.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-purple-600">Competencia:</span>
                                <span className="font-bold">{subsistema.competencia.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Desglose por Tamaño */}
                        <div>
                          <h4 className="font-bold mb-3">Distribución por Tamaño</h4>
                          <div className="grid grid-cols-5 gap-3">
                            <div className="text-center p-3 bg-blue-50 rounded">
                              <div className="text-xs text-gray-600">5kg</div>
                              <div className="font-bold">{Math.round(subsistema.total * 0.45).toLocaleString()}</div>
                              <div className="text-xs">45%</div>
                            </div>
                            <div className="text-center p-3 bg-green-50 rounded">
                              <div className="text-xs text-gray-600">11kg</div>
                              <div className="font-bold">{Math.round(subsistema.total * 0.25).toLocaleString()}</div>
                              <div className="text-xs">25%</div>
                            </div>
                            <div className="text-center p-3 bg-yellow-50 rounded">
                              <div className="text-xs text-gray-600">15kg</div>
                              <div className="font-bold">{Math.round(subsistema.total * 0.15).toLocaleString()}</div>
                              <div className="text-xs">15%</div>
                            </div>
                            <div className="text-center p-3 bg-orange-50 rounded">
                              <div className="text-xs text-gray-600">45kg</div>
                              <div className="font-bold">{Math.round(subsistema.total * 0.10).toLocaleString()}</div>
                              <div className="text-xs">10%</div>
                            </div>
                            <div className="text-center p-3 bg-purple-50 rounded">
                              <div className="text-xs text-gray-600">GH</div>
                              <div className="font-bold">{Math.round(subsistema.total * 0.05).toLocaleString()}</div>
                              <div className="text-xs">5%</div>
                            </div>
                          </div>
                        </div>

                        {/* Detalle de Mantencion */}
                        <div>
                          <h4 className="font-bold mb-3">Composición Mantencion</h4>
                          <div className="grid grid-cols-4 gap-3">
                            <div className="text-center p-2 bg-orange-50 rounded">
                              <div className="text-xs text-gray-600">Revisión</div>
                              <div className="font-bold">{Math.round(subsistema.mantencion * 0.3).toLocaleString()}</div>
                            </div>
                            <div className="text-center p-2 bg-orange-50 rounded">
                              <div className="text-xs text-gray-600">Reparación</div>
                              <div className="font-bold">{Math.round(subsistema.mantencion * 0.25).toLocaleString()}</div>
                            </div>
                            <div className="text-center p-2 bg-orange-50 rounded">
                              <div className="text-xs text-gray-600">Pintura</div>
                              <div className="font-bold">{Math.round(subsistema.mantencion * 0.25).toLocaleString()}</div>
                            </div>
                            <div className="text-center p-2 bg-orange-50 rounded">
                              <div className="text-xs text-gray-600">Válvulas</div>
                              <div className="font-bold">{Math.round(subsistema.mantencion * 0.2).toLocaleString()}</div>
                            </div>
                          </div>
                        </div>

                        {/* Detalle de Competencia */}
                        <div>
                          <h4 className="font-bold mb-3">Composición Competencia</h4>
                          <div className="grid grid-cols-4 gap-3">
                            <div className="text-center p-2 bg-purple-50 rounded">
                              <div className="text-xs text-gray-600">Lipigas</div>
                              <div className="font-bold">{Math.round(subsistema.competencia * 0.4).toLocaleString()}</div>
                              <div className="text-xs">40%</div>
                            </div>
                            <div className="text-center p-2 bg-purple-50 rounded">
                              <div className="text-xs text-gray-600">Gasco</div>
                              <div className="font-bold">{Math.round(subsistema.competencia * 0.3).toLocaleString()}</div>
                              <div className="text-xs">30%</div>
                            </div>
                            <div className="text-center p-2 bg-purple-50 rounded">
                              <div className="text-xs text-gray-600">Abastible</div>
                              <div className="font-bold">{Math.round(subsistema.competencia * 0.2).toLocaleString()}</div>
                              <div className="text-xs">20%</div>
                            </div>
                            <div className="text-center p-2 bg-purple-50 rounded">
                              <div className="text-xs text-gray-600">Otros</div>
                              <div className="font-bold">{Math.round(subsistema.competencia * 0.1).toLocaleString()}</div>
                              <div className="text-xs">10%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              ))}
            </div>

            {/* Tercera fila: 1 subsistema centrado */}
            <div className="flex justify-center">
              <div className="w-1/3">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="text-center p-4 border rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="text-lg font-bold mb-3">{subsystemsData.slice(6, 7)[0].total > 0 ? (subsystemsData.slice(6, 7)[0].total / 1000).toFixed(1) + 'k' : '0'} cil</div>
                      <div className="text-sm font-medium mb-2">{subsystemsData.slice(6, 7)[0].nombre}</div>
                      
                      {subsystemsData.slice(6, 7)[0].total > 0 ? (
                        <>
                          {/* Barra apilada */}
                          <div className="flex mb-2 h-6 rounded overflow-hidden">
                            <div 
                              className="bg-blue-500 flex items-center justify-center text-white text-xs font-bold"
                              style={{ width: `${(subsystemsData.slice(6, 7)[0].llenos / subsystemsData.slice(6, 7)[0].total) * 100}%` }}
                            >
                              {Math.round((subsystemsData.slice(6, 7)[0].llenos / subsystemsData.slice(6, 7)[0].total) * 100)}%
                            </div>
                            <div 
                              className="bg-green-500 flex items-center justify-center text-white text-xs font-bold"
                              style={{ width: `${(subsystemsData.slice(6, 7)[0].vacios / subsystemsData.slice(6, 7)[0].total) * 100}%` }}
                            >
                              {Math.round((subsystemsData.slice(6, 7)[0].vacios / subsystemsData.slice(6, 7)[0].total) * 100)}%
                            </div>
                            <div 
                              className="bg-orange-500 flex items-center justify-center text-white text-xs font-bold"
                              style={{ width: `${(subsystemsData.slice(6, 7)[0].mantencion / subsystemsData.slice(6, 7)[0].total) * 100}%` }}
                            >
                              {Math.round((subsystemsData.slice(6, 7)[0].mantencion / subsystemsData.slice(6, 7)[0].total) * 100)}%
                            </div>
                            <div 
                              className="bg-purple-500 flex items-center justify-center text-white text-xs font-bold"
                              style={{ width: `${(subsystemsData.slice(6, 7)[0].competencia / subsystemsData.slice(6, 7)[0].total) * 100}%` }}
                            >
                              {Math.round((subsystemsData.slice(6, 7)[0].competencia / subsystemsData.slice(6, 7)[0].total) * 100)}%
                            </div>
                          </div>

                          {/* Etiquetas */}
                          <div className="grid grid-cols-4 gap-1 text-xs">
                            <div className="text-blue-600 font-medium">Llenos</div>
                            <div className="text-green-600 font-medium">Vacíos</div>
                            <div className="text-orange-600 font-medium">Mant.</div>
                            <div className="text-purple-600 font-medium">Comp.</div>
                          </div>
                          <div className="text-xs text-gray-500 mt-2">Click para detalle</div>
                        </>
                      ) : (
                        <div className="text-gray-400 text-sm">Inactivo</div>
                      )}
                    </div>
                  </DialogTrigger>
                  
                  {subsystemsData.slice(6, 7)[0].total > 0 && (
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Detalle Completo - {subsystemsData.slice(6, 7)[0].nombre}</DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        {/* Resumen del Subsistema */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-blue-50 rounded">
                            <h4 className="font-bold mb-2">Información General</h4>
                            <div className="space-y-1 text-sm">
                              <div>Total: <span className="font-bold">{subsystemsData.slice(6, 7)[0].total.toLocaleString()}</span> cilindros</div>
                              <div>Ocupación: <span className="font-bold text-green-600">{((subsystemsData.slice(6, 7)[0].llenos / subsystemsData.slice(6, 7)[0].total) * 100).toFixed(1)}%</span></div>
                              <div>Capacidad: <span className="font-bold">{Math.round(subsystemsData.slice(6, 7)[0].total * 1.2).toLocaleString()}</span> cilindros</div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-gray-50 rounded">
                            <h4 className="font-bold mb-2">Distribución por Estado</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-blue-600">Llenos:</span>
                                <span className="font-bold">{subsystemsData.slice(6, 7)[0].llenos.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-green-600">Vacíos:</span>
                                <span className="font-bold">{subsystemsData.slice(6, 7)[0].vacios.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-orange-600">Mantencion:</span>
                                <span className="font-bold">{subsystemsData.slice(6, 7)[0].mantencion.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-purple-600">Competencia:</span>
                                <span className="font-bold">{subsystemsData.slice(6, 7)[0].competencia.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Desglose por Tamaño */}
                        <div>
                          <h4 className="font-bold mb-3">Distribución por Tamaño</h4>
                          <div className="grid grid-cols-5 gap-3">
                            <div className="text-center p-3 bg-blue-50 rounded">
                              <div className="text-xs text-gray-600">5kg</div>
                              <div className="font-bold">{Math.round(subsystemsData.slice(6, 7)[0].total * 0.45).toLocaleString()}</div>
                              <div className="text-xs">45%</div>
                            </div>
                            <div className="text-center p-3 bg-green-50 rounded">
                              <div className="text-xs text-gray-600">11kg</div>
                              <div className="font-bold">{Math.round(subsystemsData.slice(6, 7)[0].total * 0.25).toLocaleString()}</div>
                              <div className="text-xs">25%</div>
                            </div>
                            <div className="text-center p-3 bg-yellow-50 rounded">
                              <div className="text-xs text-gray-600">15kg</div>
                              <div className="font-bold">{Math.round(subsystemsData.slice(6, 7)[0].total * 0.15).toLocaleString()}</div>
                              <div className="text-xs">15%</div>
                            </div>
                            <div className="text-center p-3 bg-orange-50 rounded">
                              <div className="text-xs text-gray-600">45kg</div>
                              <div className="font-bold">{Math.round(subsystemsData.slice(6, 7)[0].total * 0.10).toLocaleString()}</div>
                              <div className="text-xs">10%</div>
                            </div>
                            <div className="text-center p-3 bg-purple-50 rounded">
                              <div className="text-xs text-gray-600">GH</div>
                              <div className="font-bold">{Math.round(subsystemsData.slice(6, 7)[0].total * 0.05).toLocaleString()}</div>
                              <div className="text-xs">5%</div>
                            </div>
                          </div>
                        </div>

                        {/* Detalle de Mantencion */}
                        <div>
                          <h4 className="font-bold mb-3">Composición Mantencion</h4>
                          <div className="grid grid-cols-4 gap-3">
                            <div className="text-center p-2 bg-orange-50 rounded">
                              <div className="text-xs text-gray-600">Revisión</div>
                              <div className="font-bold">{Math.round(subsystemsData.slice(6, 7)[0].mantencion * 0.3).toLocaleString()}</div>
                            </div>
                            <div className="text-center p-2 bg-orange-50 rounded">
                              <div className="text-xs text-gray-600">Reparación</div>
                              <div className="font-bold">{Math.round(subsystemsData.slice(6, 7)[0].mantencion * 0.25).toLocaleString()}</div>
                            </div>
                            <div className="text-center p-2 bg-orange-50 rounded">
                              <div className="text-xs text-gray-600">Pintura</div>
                              <div className="font-bold">{Math.round(subsystemsData.slice(6, 7)[0].mantencion * 0.25).toLocaleString()}</div>
                            </div>
                            <div className="text-center p-2 bg-orange-50 rounded">
                              <div className="text-xs text-gray-600">Válvulas</div>
                              <div className="font-bold">{Math.round(subsystemsData.slice(6, 7)[0].mantencion * 0.2).toLocaleString()}</div>
                            </div>
                          </div>
                        </div>

                        {/* Detalle de Competencia */}
                        <div>
                          <h4 className="font-bold mb-3">Composición Competencia</h4>
                          <div className="grid grid-cols-4 gap-3">
                            <div className="text-center p-2 bg-purple-50 rounded">
                              <div className="text-xs text-gray-600">Lipigas</div>
                              <div className="font-bold">{Math.round(subsystemsData.slice(6, 7)[0].competencia * 0.4).toLocaleString()}</div>
                              <div className="text-xs">40%</div>
                            </div>
                            <div className="text-center p-2 bg-purple-50 rounded">
                              <div className="text-xs text-gray-600">Gasco</div>
                              <div className="font-bold">{Math.round(subsystemsData.slice(6, 7)[0].competencia * 0.3).toLocaleString()}</div>
                              <div className="text-xs">30%</div>
                            </div>
                            <div className="text-center p-2 bg-purple-50 rounded">
                              <div className="text-xs text-gray-600">Abastible</div>
                              <div className="font-bold">{Math.round(subsystemsData.slice(6, 7)[0].competencia * 0.2).toLocaleString()}</div>
                              <div className="text-xs">20%</div>
                            </div>
                            <div className="text-center p-2 bg-purple-50 rounded">
                              <div className="text-xs text-gray-600">Otros</div>
                              <div className="font-bold">{Math.round(subsystemsData.slice(6, 7)[0].competencia * 0.1).toLocaleString()}</div>
                              <div className="text-xs">10%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              </div>
            </div>
          </div>

          {/* Resumen Por Clasificación */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-bold mb-4">Resumen Por Clasificación</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded border">
                <div className="text-sm text-gray-600">Llenos</div>
                <div className="text-2xl font-bold text-blue-600">{(llenos / 1000).toFixed(1)}k</div>
                <div className="text-xs text-blue-600">{llenosPercent}%</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded border">
                <div className="text-sm text-gray-600">Vacíos</div>
                <div className="text-2xl font-bold text-green-600">{(vacios / 1000).toFixed(1)}k</div>
                <div className="text-xs text-green-600">{vaciosPercent}%</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded border">
                <div className="text-sm text-gray-600">Mantencion</div>
                <div className="text-2xl font-bold text-orange-600">{(mantencion / 1000).toFixed(1)}k</div>
                <div className="text-xs text-orange-600">{mantencionPercent}%</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded border">
                <div className="text-sm text-gray-600">Competencia</div>
                <div className="text-2xl font-bold text-purple-600">{(competencia / 1000).toFixed(1)}k</div>
                <div className="text-xs text-purple-600">{competenciaPercent}%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}