"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, BarChart3 } from "lucide-react"
import { NATIONAL_TOTALS } from "@/lib/data-model"
import { DonutChart } from "@/components/ui/tremor-donut"
import Image from "next/image"

interface CilindrosSectionProps {
  showDetailTables: boolean
  setShowDetailTables: (show: boolean) => void
}

export function CilindrosSection({ showDetailTables, setShowDetailTables }: CilindrosSectionProps) {
  const totalCilindros = NATIONAL_TOTALS.cilindros.total
  const llenos = NATIONAL_TOTALS.cilindros.llenos
  const vacios = NATIONAL_TOTALS.cilindros.vacios
  const mantencion = NATIONAL_TOTALS.cilindros.mantencion
  const competencia = NATIONAL_TOTALS.cilindros.competencia

  const llenosPercent = ((llenos / totalCilindros) * 100).toFixed(1)
  const vaciosPercent = ((vacios / totalCilindros) * 100).toFixed(1)
  const mantencionPercent = ((mantencion / totalCilindros) * 100).toFixed(1)
  const competenciaPercent = ((competencia / totalCilindros) * 100).toFixed(1)

  const formatDonutData = (subsistema: any) => [
    { name: "Llenos", value: subsistema.llenos, color: "#3b82f6" },
    { name: "Vacíos", value: subsistema.vacios, color: "#10b981" },
    { name: "Mantención", value: subsistema.mantencion, color: "#f59e0b" },
    { name: "Competencia", value: subsistema.competencia, color: "#8b5cf6" }
  ]

  const subsystemsData = [
    { nombre: "SS Maipú", llenos: 24288, vacios: 14541, mantencion: 3950, competencia: 2887, total: 45666 },
    { nombre: "SS Mejillones", llenos: 16788, vacios: 8955, mantencion: 5000, competencia: 5000, total: 35743 },
    { nombre: "SS Belloto", llenos: 12000, vacios: 8000, mantencion: 4500, competencia: 4000, total: 28500 },
    { nombre: "SS Talca", llenos: 0, vacios: 0, mantencion: 0, competencia: 0, total: 0 },
    { nombre: "SS Biobio", llenos: 18500, vacios: 12000, mantencion: 6500, competencia: 5000, total: 42000 },
    { nombre: "SS Osorno", llenos: 0, vacios: 0, mantencion: 0, competencia: 0, total: 0 },
    { nombre: "SS Coyhaique", llenos: 0, vacios: 0, mantencion: 0, competencia: 0, total: 0 }
  ]

  const sgpVsSapData = [
    { tipo: "Llenos", sgp: llenos, sap: 64500, diferencia: llenos - 64500, porcentaje: (((llenos - 64500) / 64500) * 100).toFixed(1) },
    { tipo: "Vacíos", sgp: vacios, sap: 34200, diferencia: vacios - 34200, porcentaje: (((vacios - 34200) / 34200) * 100).toFixed(1) },
    { tipo: "Mantencion", sgp: mantencion, sap: 17800, diferencia: mantencion - 17800, porcentaje: (((mantencion - 17800) / 17800) * 100).toFixed(1) },
    { tipo: "Competencia", sgp: competencia, sap: 15200, diferencia: competencia - 15200, porcentaje: (((competencia - 15200) / 15200) * 100).toFixed(1) }
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gray-100 border-b border-gray-300 p-3">
        <div className="flex items-center gap-4">
          <Image src="/images/gasco-logo.png" alt="GASCO Logo" width={50} height={16} className="h-4 w-auto" />
          <h2 className="text-base font-semibold text-gray-700">Análisis de Cilindros Operativos</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">Resumen de Cilindros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6 p-4 bg-blue-50 rounded-lg border">
              <div className="text-sm text-gray-600 mb-2">Total Nacional</div>
              <div className="text-4xl font-bold text-blue-600">{(totalCilindros / 1000).toFixed(1)}k</div>
              <div className="text-sm text-blue-600">cilindros</div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-100 rounded">
                <div>
                  <div className="font-medium">Llenos</div>
                  <div className="text-sm text-gray-600">{llenosPercent}%</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{(llenos / 1000).toFixed(1)}k</div>
                  <div className="text-sm text-gray-500">cilindros</div>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-green-100 rounded">
                <div>
                  <div className="font-medium">Vacíos</div>
                  <div className="text-sm text-gray-600">{vaciosPercent}%</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{(vacios / 1000).toFixed(1)}k</div>
                  <div className="text-sm text-gray-500">cilindros</div>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-orange-100 rounded">
                <div>
                  <div className="font-medium">Mantención</div>
                  <div className="text-sm text-gray-600">{mantencionPercent}%</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-600">{(mantencion / 1000).toFixed(1)}k</div>
                  <div className="text-sm text-gray-500">cilindros</div>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-purple-100 rounded">
                <div>
                  <div className="font-medium">Competencia</div>
                  <div className="text-sm text-gray-600">{competenciaPercent}%</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{(competencia / 1000).toFixed(1)}k</div>
                  <div className="text-sm text-gray-500">cilindros</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">Diferencia stock SGP vs SAP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2 text-xs font-bold text-gray-600 border-b pb-2">
                <div>Tipo</div>
                <div className="text-center">SGP</div>
                <div className="text-center">SAP</div>
                <div className="text-center">Diferencia</div>
              </div>

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

              <div className="grid grid-cols-4 gap-2 items-center py-2 border-t-2 border-gray-300 bg-gray-50 rounded">
                <div className="font-bold">Total</div>
                <div className="text-center">
                  <div className="text-sm font-bold text-blue-600">{(totalCilindros / 1000).toFixed(1)}k</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-600">131.7k</div>
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

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Eye className="w-4 h-4 text-gray-600" />
            Stock Inicial Cilindros por Subsistemas
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              {subsystemsData.slice(0, 3).map((subsistema, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <div className="group relative bg-white rounded-xl border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl cursor-pointer overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b border-blue-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">{subsistema.nombre}</h3>
                            <div className="text-sm text-gray-600">Cilindros Operativos</div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-blue-600">
                              {subsistema.total > 0 ? (subsistema.total / 1000).toFixed(1) + 'k' : '0'}
                            </div>
                            <div className="text-xs text-blue-500">total</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-5">
                        {subsistema.total > 0 ? (
                          <>
                            <div className="flex gap-6 mb-6">
                              <div className="w-32 h-32 flex-shrink-0">
                                <DonutChart 
                                  data={formatDonutData(subsistema)}
                                  className="w-full h-full"
                                />
                              </div>

                              <div className="flex-1 space-y-4">
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-blue-600">Llenos</span>
                                    <span className="text-sm font-bold text-blue-700">{Math.round((subsistema.llenos / subsistema.total) * 100)}%</span>
                                  </div>
                                  <div className="w-full bg-blue-100 rounded-full h-3">
                                    <div 
                                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                                      style={{ width: `${(subsistema.llenos / subsistema.total) * 100}%` }}
                                    ></div>
                                  </div>
                                  <div className="text-xs text-gray-600 mt-1">{(subsistema.llenos / 1000).toFixed(1)}k cilindros</div>
                                </div>

                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-green-600">Vacíos</span>
                                    <span className="text-sm font-bold text-green-700">{Math.round((subsistema.vacios / subsistema.total) * 100)}%</span>
                                  </div>
                                  <div className="w-full bg-green-100 rounded-full h-3">
                                    <div 
                                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                                      style={{ width: `${(subsistema.vacios / subsistema.total) * 100}%` }}
                                    ></div>
                                  </div>
                                  <div className="text-xs text-gray-600 mt-1">{(subsistema.vacios / 1000).toFixed(1)}k cilindros</div>
                                </div>

                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-orange-600">Mantención</span>
                                    <span className="text-sm font-bold text-orange-700">{Math.round((subsistema.mantencion / subsistema.total) * 100)}%</span>
                                  </div>
                                  <div className="w-full bg-orange-100 rounded-full h-3">
                                    <div 
                                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500"
                                      style={{ width: `${(subsistema.mantencion / subsistema.total) * 100}%` }}
                                    ></div>
                                  </div>
                                  <div className="text-xs text-gray-600 mt-1">{(subsistema.mantencion / 1000).toFixed(1)}k cilindros</div>
                                </div>

                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-purple-600">Competencia</span>
                                    <span className="text-sm font-bold text-purple-700">{Math.round((subsistema.competencia / subsistema.total) * 100)}%</span>
                                  </div>
                                  <div className="w-full bg-purple-100 rounded-full h-3">
                                    <div 
                                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                                      style={{ width: `${(subsistema.competencia / subsistema.total) * 100}%` }}
                                    ></div>
                                  </div>
                                  <div className="text-xs text-gray-600 mt-1">{(subsistema.competencia / 1000).toFixed(1)}k cilindros</div>
                                </div>
                              </div>
                            </div>

                            <div className="text-center">
                              <div className="inline-flex items-center gap-2 text-sm text-white font-semibold bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105">
                                <Eye className="w-4 h-4" />
                                Ver Análisis Detallado
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-16">
                            <div className="text-6xl mb-4 opacity-50">⚪</div>
                            <div className="text-gray-500 text-lg font-medium mb-2">Subsistema Inactivo</div>
                            <div className="text-sm text-gray-400">No hay operaciones registradas</div>
                          </div>
                        )}
                      </div>

                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg"></div>
                      </div>
                    </div>
                  </DialogTrigger>
                  
                  {subsistema.total > 0 && (
                    <DialogContent className="max-w-5xl">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Análisis Detallado - {subsistema.nombre}</DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-6 max-h-[80vh] overflow-y-auto">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                            <h4 className="font-bold text-lg text-blue-800 mb-4">Información General</h4>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span>Total de Cilindros:</span>
                                <span className="font-bold text-blue-700">{subsistema.total.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Ocupación:</span>
                                <span className="font-bold text-green-600">{((subsistema.llenos / subsistema.total) * 100).toFixed(1)}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Capacidad Total:</span>
                                <span className="font-bold">{Math.round(subsistema.total * 1.2).toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Eficiencia:</span>
                                <span className="font-bold text-green-600">94.2%</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                            <h4 className="font-bold text-lg text-gray-800 mb-4">Distribución por Estado</h4>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                                  <span className="text-blue-700">Llenos:</span>
                                </div>
                                <span className="font-bold">{subsistema.llenos.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                                  <span className="text-green-700">Vacíos:</span>
                                </div>
                                <span className="font-bold">{subsistema.vacios.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                                  <span className="text-orange-700">Mantención:</span>
                                </div>
                                <span className="font-bold">{subsistema.mantencion.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                                  <span className="text-purple-700">Competencia:</span>
                                </div>
                                <span className="font-bold">{subsistema.competencia.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-center bg-white p-6 rounded-xl border border-gray-200">
                          <h4 className="font-bold text-lg mb-4">Distribución Visual</h4>
                          <div className="w-64 h-64 mx-auto mb-6">
                            <DonutChart 
                              data={formatDonutData(subsistema)}
                              className="w-full h-full"
                            />
                          </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                          <h4 className="font-bold text-lg mb-4">Distribución por Tamaño de Cilindro</h4>
                          <div className="grid grid-cols-5 gap-4">
                            <div className="text-center p-4 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                              <div className="text-sm text-gray-600 mb-2">5kg</div>
                              <div className="text-xl font-bold text-blue-700">{Math.round(subsistema.total * 0.45).toLocaleString()}</div>
                              <div className="text-sm text-blue-600 mt-1">45%</div>
                            </div>
                            <div className="text-center p-4 bg-gradient-to-b from-green-50 to-green-100 rounded-lg border border-green-200">
                              <div className="text-sm text-gray-600 mb-2">11kg</div>
                              <div className="text-xl font-bold text-green-700">{Math.round(subsistema.total * 0.25).toLocaleString()}</div>
                              <div className="text-sm text-green-600 mt-1">25%</div>
                            </div>
                            <div className="text-center p-4 bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
                              <div className="text-sm text-gray-600 mb-2">15kg</div>
                              <div className="text-xl font-bold text-yellow-700">{Math.round(subsistema.total * 0.15).toLocaleString()}</div>
                              <div className="text-sm text-yellow-600 mt-1">15%</div>
                            </div>
                            <div className="text-center p-4 bg-gradient-to-b from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                              <div className="text-sm text-gray-600 mb-2">45kg</div>
                              <div className="text-xl font-bold text-orange-700">{Math.round(subsistema.total * 0.10).toLocaleString()}</div>
                              <div className="text-sm text-orange-600 mt-1">10%</div>
                            </div>
                            <div className="text-center p-4 bg-gradient-to-b from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                              <div className="text-sm text-gray-600 mb-2">GH</div>
                              <div className="text-xl font-bold text-purple-700">{Math.round(subsistema.total * 0.05).toLocaleString()}</div>
                              <div className="text-sm text-purple-600 mt-1">5%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {subsystemsData.slice(3).map((subsistema, index) => (
                <div key={index + 3} className="group relative bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-lg cursor-pointer overflow-hidden">
                  <div className="bg-gray-50 p-3 border-b border-gray-200">
                    <h3 className="text-sm font-bold text-gray-800 text-center">{subsistema.nombre}</h3>
                  </div>

                  <div className="p-4">
                    {subsistema.total > 0 ? (
                      <>
                        <div className="text-center mb-4">
                          <div className="text-2xl font-bold text-blue-600">
                            {(subsistema.total / 1000).toFixed(1)}k
                          </div>
                          <div className="text-xs text-gray-500">cilindros</div>
                        </div>

                        <div className="w-20 h-20 mx-auto mb-4">
                          <DonutChart 
                            data={formatDonutData(subsistema)}
                            className="w-full h-full"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-1 text-xs">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-blue-600">{Math.round((subsistema.llenos / subsistema.total) * 100)}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-green-600">{Math.round((subsistema.vacios / subsistema.total) * 100)}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-orange-600">{Math.round((subsistema.mantencion / subsistema.total) * 100)}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-purple-600">{Math.round((subsistema.competencia / subsistema.total) * 100)}%</span>
                          </div>
                        </div>

                        <div className="text-center mt-3">
                          <div className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-medium">
                            Ver Detalle
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-2 opacity-30">⚪</div>
                        <div className="text-gray-400 text-sm font-medium">Subsistema</div>
                        <div className="text-gray-400 text-sm">Inactivo</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-bold mb-4">Resumen Ejecutivo por Clasificación</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm text-gray-600 mb-2">Llenos Operativos</div>
                <div className="text-3xl font-bold text-blue-600">{(llenos / 1000).toFixed(1)}k</div>
                <div className="text-xs text-blue-600 mb-2">{llenosPercent}% del total</div>
                <div className="text-xs text-gray-500">Disponible para despacho</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-sm text-gray-600 mb-2">Vacíos Retornados</div>
                <div className="text-3xl font-bold text-green-600">{(vacios / 1000).toFixed(1)}k</div>
                <div className="text-xs text-green-600 mb-2">{vaciosPercent}% del total</div>
                <div className="text-xs text-gray-500">Listo para llenado</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-sm text-gray-600 mb-2">En Mantención</div>
                <div className="text-3xl font-bold text-orange-600">{(mantencion / 1000).toFixed(1)}k</div>
                <div className="text-xs text-orange-600 mb-2">{mantencionPercent}% del total</div>
                <div className="text-xs text-gray-500">Fuera de operación</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-sm text-gray-600 mb-2">Competencia</div>
                <div className="text-3xl font-bold text-purple-600">{(competencia / 1000).toFixed(1)}k</div>
                <div className="text-xs text-purple-600 mb-2">{competenciaPercent}% del total</div>
                <div className="text-xs text-gray-500">Cilindros externos</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-bold mb-4">Análisis Detallado por Subsistema</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subsistema</TableHead>
                    <TableHead className="text-center">Total</TableHead>
                    <TableHead className="text-center">Llenos</TableHead>
                    <TableHead className="text-center">Vacíos</TableHead>
                    <TableHead className="text-center">Mantención</TableHead>
                    <TableHead className="text-center">Competencia</TableHead>
                    <TableHead className="text-center">Ocupación</TableHead>
                    <TableHead className="text-center">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subsystemsData.map((subsistema, index) => (
                    <TableRow key={index} className={subsistema.total === 0 ? "text-gray-400" : ""}>
                      <TableCell className="font-medium">{subsistema.nombre}</TableCell>
                      <TableCell className="text-center font-bold">
                        {subsistema.total > 0 ? (subsistema.total / 1000).toFixed(1) + 'k' : '0'}
                      </TableCell>
                      <TableCell className="text-center text-blue-600 font-semibold">
                        {subsistema.total > 0 ? (subsistema.llenos / 1000).toFixed(1) + 'k' : '0'}
                      </TableCell>
                      <TableCell className="text-center text-green-600 font-semibold">
                        {subsistema.total > 0 ? (subsistema.vacios / 1000).toFixed(1) + 'k' : '0'}
                      </TableCell>
                      <TableCell className="text-center text-orange-600 font-semibold">
                        {subsistema.total > 0 ? (subsistema.mantencion / 1000).toFixed(1) + 'k' : '0'}
                      </TableCell>
                      <TableCell className="text-center text-purple-600 font-semibold">
                        {subsistema.total > 0 ? (subsistema.competencia / 1000).toFixed(1) + 'k' : '0'}
                      </TableCell>
                      <TableCell className="text-center">
                        {subsistema.total > 0 ? (
                          <span className={`font-semibold ${
                            ((subsistema.llenos / subsistema.total) * 100) > 60 ? 'text-green-600' :
                            ((subsistema.llenos / subsistema.total) * 100) > 40 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {((subsistema.llenos / subsistema.total) * 100).toFixed(1)}%
                          </span>
                        ) : (
                          <span className="text-gray-400">0%</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {subsistema.total > 0 ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Activo
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                            Inactivo
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-gray-100 font-bold border-t-2">
                    <TableCell>TOTAL NACIONAL</TableCell>
                    <TableCell className="text-center text-blue-600">
                      {(totalCilindros / 1000).toFixed(1)}k
                    </TableCell>
                    <TableCell className="text-center text-blue-600">
                      {(llenos / 1000).toFixed(1)}k
                    </TableCell>
                    <TableCell className="text-center text-green-600">
                      {(vacios / 1000).toFixed(1)}k
                    </TableCell>
                    <TableCell className="text-center text-orange-600">
                      {(mantencion / 1000).toFixed(1)}k
                    </TableCell>
                    <TableCell className="text-center text-purple-600">
                      {(competencia / 1000).toFixed(1)}k
                    </TableCell>
                    <TableCell className="text-center text-green-600">
                      {llenosPercent}%
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Operativo
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {showDetailTables && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Análisis Detallado de Cilindros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Las tablas de análisis detallado se mostrarán aquí</p>
              <Button 
                onClick={() => setShowDetailTables(false)}
                variant="outline"
                className="mt-4"
              >
                Ocultar Tablas
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 