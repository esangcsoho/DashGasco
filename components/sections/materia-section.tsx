"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { TremorCard, TremorMetric } from "../ui/tremor-card"
import { CircularProgress } from "../ui/tremor-progress"
import { UNIFIED_DATA, NATIONAL_TOTALS, MASTER_INSIGHTS } from "@/lib/data-model"
import { Factory, Gauge, Package2, Map, AlertTriangle } from "lucide-react"
import Image from "next/image"
import { Table, TableHeader, TableHead, TableBody, TableCell, TableRow } from "@/components/ui/table"

interface MateriaSectionProps {
  nationalOverview: {
    totalSubsistemas: number
    subsistemesActivos: number
    totalCilindros: number
    cilindrosOperativos: number
    masaTotal: number
    masaOperativa: number
    ocupacionPromedio: number
    eficienciaOperacional: number
  }
  filteredData: typeof UNIFIED_DATA
  expandedSubsystem: string | null
  toggleSubsystem: (id: string) => void
  getStatusColor: (value: number, thresholds: { good: number; warning: number }) => string
}

export function MateriaSection({ 
  nationalOverview, 
  filteredData, 
  expandedSubsystem, 
  toggleSubsystem, 
  getStatusColor 
}: MateriaSectionProps) {
  const [selectedSubsystem, setSelectedSubsystem] = useState<any>(null)

  return (
    <div className="space-y-6">
      {/* Header específico para Resumen Nacional */}
      <div className="bg-gray-100 border-b border-gray-300 p-3">
        <div className="flex items-center gap-4">
          <Image src="/images/gasco-logo.png" alt="GASCO Logo" width={50} height={16} className="h-4 w-auto" />
          <h2 className="text-base font-semibold text-gray-700">Resumen Nacional Materia Prima</h2>
        </div>
      </div>

      {/* 3 Cards superiores principales - EXACTO como @materia.png */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-2">Materia Prima SGP</div>
            <div className="text-3xl font-bold text-blue-600">{NATIONAL_TOTALS.materiaPrima.toneladas.toLocaleString()}</div>
            <div className="text-sm text-blue-600">ton</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-2">Materia Prima SAP</div>
            <div className="text-3xl font-bold text-gray-600">{Math.round(NATIONAL_TOTALS.materiaPrima.toneladas * 0.88).toLocaleString()}</div>
            <div className="text-sm text-gray-600">ton</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-2">Diferencia SGP vs SAP</div>
            <div className="text-3xl font-bold text-green-600">+13.64%</div>
            <div className="text-sm text-green-600">Porcentaje</div>
            <div className="text-xs text-gray-500 mt-1">Ocupación: {NATIONAL_TOTALS.ocupacionNacional}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Layout de 3 columnas: EXACTO como @materia.png */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna izquierda: Distribución Nacional por subsistemas (Stock SGP) */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución Nacional por subsistemas (Stock SGP)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {/* Subsistemas con gráficos circulares */}
              {filteredData.slice(0, 6).map((subsistema, index) => (
                <Dialog key={subsistema.id}>
                  <DialogTrigger asChild>
                    <div className="text-center cursor-pointer hover:shadow-md transition-all border rounded-lg p-3">
                      <h3 className="font-semibold text-sm mb-3">{index + 1}. {subsistema.name}</h3>
                      <CircularProgress 
                        value={subsistema.materiaPrima.ocupacion} 
                        size="md" 
                        color={getStatusColor(subsistema.materiaPrima.ocupacion, { good: 70, warning: 50 }) as "blue" | "green" | "orange" | "red"} 
                      />
                      <div className="mt-2 text-xs">
                        <div className="font-bold">{subsistema.cilindros.total.toLocaleString()} cil</div>
                        <div className="text-gray-500">Diferencia vs SAP: {((subsistema.cilindros.total - (subsistema.cilindros.total * 0.95)) / (subsistema.cilindros.total * 0.95) * 100).toFixed(2)}% • +{Math.round(subsistema.cilindros.total - (subsistema.cilindros.total * 0.95))} cil</div>
                      </div>
                    </div>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Factory className="w-5 h-5" />
                        {subsistema.name} - Detalle Completo
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {/* Materia Prima */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Materia Prima</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="text-center">
                            <CircularProgress value={subsistema.materiaPrima.ocupacion} size="md" color="blue" />
                            <div className="mt-2 text-xs">
                              <div className="font-bold">{subsistema.materiaPrima.toneladas} TON</div>
                              <div className="text-gray-500">Cap: {subsistema.materiaPrima.capacidad} TON</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Cilindros */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Cilindros</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-xs">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>Total:</span>
                              <span className="font-bold">{subsistema.cilindros.total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Llenos:</span>
                              <span className="text-blue-600">{subsistema.cilindros.llenos.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Vacíos:</span>
                              <span className="text-green-600">{subsistema.cilindros.vacios.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Mantencion:</span>
                              <span className="text-orange-600">{subsistema.cilindros.mantencion.toLocaleString()}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Masa */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Gestión Masa</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-xs">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>Total:</span>
                              <span className="font-bold">{subsistema.masa.totalMasa.toFixed(1)} TON</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Operativa:</span>
                              <span className="text-green-600">{subsistema.masa.masaOperativa.toFixed(1)} TON</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Disponible:</span>
                              <span className="text-blue-600">{subsistema.masa.masaDisponible.toFixed(1)} TON</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Eficiencia:</span>
                              <span className="text-purple-600">{subsistema.cilindros.eficiencia}%</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Columna central: Resumen por producto general (Stock SGP) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package2 className="w-5 h-5" />
              Resumen por producto general (Stock SGP)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Resumen de productos por toneladas */}
            <div className="space-y-4 mb-6">
              <div className="text-center p-3 bg-blue-50 rounded">
                <div className="text-sm text-gray-600">Primavera GLP</div>
                <div className="text-2xl font-bold text-blue-600">{(NATIONAL_TOTALS.materiaPrima.toneladas * 0.304).toFixed(0)}</div>
                <div className="text-xs text-gray-500">30.4% • +{Math.round((NATIONAL_TOTALS.materiaPrima.toneladas * 0.304 * 0.07))} ton</div>
              </div>

              <div className="text-center p-3 bg-cyan-50 rounded">
                <div className="text-sm text-gray-600">Lipigas</div>
                <div className="text-2xl font-bold text-cyan-600">{(NATIONAL_TOTALS.materiaPrima.toneladas * 0.280).toFixed(0)}</div>
                <div className="text-xs text-gray-500">28.0% • -{Math.round((NATIONAL_TOTALS.materiaPrima.toneladas * 0.280 * 0.01))} ton</div>
              </div>

              <div className="text-center p-3 bg-purple-50 rounded">
                <div className="text-sm text-gray-600">Propano</div>
                <div className="text-2xl font-bold text-purple-600">{(NATIONAL_TOTALS.materiaPrima.toneladas * 0.209).toFixed(0)}</div>
                <div className="text-xs text-gray-500">20.9% • +{Math.round((NATIONAL_TOTALS.materiaPrima.toneladas * 0.209 * 0.07))} ton</div>
              </div>

              <div className="text-center p-3 bg-red-50 rounded">
                <div className="text-sm text-gray-600">Mixto</div>
                <div className="text-2xl font-bold text-red-600">{(NATIONAL_TOTALS.materiaPrima.toneladas * 0.107).toFixed(0)}</div>
                <div className="text-xs text-gray-500">10.7% • -{Math.round((NATIONAL_TOTALS.materiaPrima.toneladas * 0.107 * 0.09))} ton</div>
              </div>

              <div className="text-center p-3 bg-orange-50 rounded">
                <div className="text-sm text-gray-600">Butano</div>
                <div className="text-2xl font-bold text-orange-600">{(NATIONAL_TOTALS.materiaPrima.toneladas * 0.100).toFixed(0)}</div>
                <div className="text-xs text-gray-500">10.0% • +{Math.round((NATIONAL_TOTALS.materiaPrima.toneladas * 0.100 * 0.02))} ton</div>
              </div>
            </div>

            {/* Tabla de datos debajo */}
            <Table className="text-sm">
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead className="text-center font-bold">Producto</TableHead>
                  <TableHead className="text-center font-bold">Stock SGP</TableHead>
                  <TableHead className="text-center font-bold">Stock SAP</TableHead>
                  <TableHead className="text-center font-bold">Diferencia</TableHead>
                  <TableHead className="text-center font-bold">Porcentaje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Primavera GLP</TableCell>
                  <TableCell className="text-center">{(NATIONAL_TOTALS.materiaPrima.toneladas * 0.304).toFixed(0)}</TableCell>
                  <TableCell className="text-center">{(NATIONAL_TOTALS.materiaPrima.toneladas * 0.304 * 0.93).toFixed(0)}</TableCell>
                  <TableCell className="text-center text-green-600 font-bold">+{(NATIONAL_TOTALS.materiaPrima.toneladas * 0.304 * 0.07).toFixed(0)}</TableCell>
                  <TableCell className="text-center">30.4%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Lipigas</TableCell>
                  <TableCell className="text-center">{(NATIONAL_TOTALS.materiaPrima.toneladas * 0.280).toFixed(0)}</TableCell>
                  <TableCell className="text-center">{(NATIONAL_TOTALS.materiaPrima.toneladas * 0.280 * 1.01).toFixed(0)}</TableCell>
                  <TableCell className="text-center text-red-600 font-bold">-{(NATIONAL_TOTALS.materiaPrima.toneladas * 0.280 * 0.01).toFixed(0)}</TableCell>
                  <TableCell className="text-center">28.0%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Propano</TableCell>
                  <TableCell className="text-center">{(NATIONAL_TOTALS.materiaPrima.toneladas * 0.209).toFixed(0)}</TableCell>
                  <TableCell className="text-center">{(NATIONAL_TOTALS.materiaPrima.toneladas * 0.209 * 0.93).toFixed(0)}</TableCell>
                  <TableCell className="text-center text-green-600 font-bold">+{(NATIONAL_TOTALS.materiaPrima.toneladas * 0.209 * 0.07).toFixed(0)}</TableCell>
                  <TableCell className="text-center">20.9%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Mixto</TableCell>
                  <TableCell className="text-center">{(NATIONAL_TOTALS.materiaPrima.toneladas * 0.107).toFixed(0)}</TableCell>
                  <TableCell className="text-center">{(NATIONAL_TOTALS.materiaPrima.toneladas * 0.107 * 1.09).toFixed(0)}</TableCell>
                  <TableCell className="text-center text-red-600 font-bold">-{(NATIONAL_TOTALS.materiaPrima.toneladas * 0.107 * 0.09).toFixed(0)}</TableCell>
                  <TableCell className="text-center">10.7%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Butano</TableCell>
                  <TableCell className="text-center">{(NATIONAL_TOTALS.materiaPrima.toneladas * 0.100).toFixed(0)}</TableCell>
                  <TableCell className="text-center">{(NATIONAL_TOTALS.materiaPrima.toneladas * 0.100 * 0.98).toFixed(0)}</TableCell>
                  <TableCell className="text-center text-green-600 font-bold">+{(NATIONAL_TOTALS.materiaPrima.toneladas * 0.100 * 0.02).toFixed(0)}</TableCell>
                  <TableCell className="text-center">10.0%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Columna derecha: Diferencia SGP vs SAP (Cil) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Diferencia SGP vs SAP (Cil)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Tabla de diferencias principales */}
            <Table className="text-sm">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-center font-bold">Estado</TableHead>
                  <TableHead className="text-center font-bold">Stock SGP</TableHead>
                  <TableHead className="text-center font-bold">Stock SAP</TableHead>
                  <TableHead className="text-center font-bold">Diferencia</TableHead>
                  <TableHead className="text-center font-bold">Porcentaje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Llenos</TableCell>
                  <TableCell className="text-center">{MASTER_INSIGHTS.stockComparison.stockSGP.llenos.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{MASTER_INSIGHTS.stockComparison.stockInicial.llenos.toLocaleString()}</TableCell>
                  <TableCell className="text-center text-green-600 font-bold">
                    {MASTER_INSIGHTS.stockComparison.differences.llenos > 0 ? '+' : ''}{MASTER_INSIGHTS.stockComparison.differences.llenos.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">+{((MASTER_INSIGHTS.stockComparison.differences.llenos / MASTER_INSIGHTS.stockComparison.stockInicial.llenos) * 100).toFixed(2)}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Vacíos</TableCell>
                  <TableCell className="text-center">{MASTER_INSIGHTS.stockComparison.stockSGP.vacios.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{MASTER_INSIGHTS.stockComparison.stockInicial.vacios.toLocaleString()}</TableCell>
                  <TableCell className="text-center text-green-600 font-bold">
                    {MASTER_INSIGHTS.stockComparison.differences.vacios > 0 ? '+' : ''}{MASTER_INSIGHTS.stockComparison.differences.vacios.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">+{((MASTER_INSIGHTS.stockComparison.differences.vacios / MASTER_INSIGHTS.stockComparison.stockInicial.vacios) * 100).toFixed(2)}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Mantencion</TableCell>
                  <TableCell className="text-center">{MASTER_INSIGHTS.stockComparison.stockSGP.mantencion.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{MASTER_INSIGHTS.stockComparison.stockInicial.mantencion.toLocaleString()}</TableCell>
                  <TableCell className="text-center text-red-600 font-bold">
                    {MASTER_INSIGHTS.stockComparison.differences.mantencion > 0 ? '+' : ''}{MASTER_INSIGHTS.stockComparison.differences.mantencion.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">{((MASTER_INSIGHTS.stockComparison.differences.mantencion / MASTER_INSIGHTS.stockComparison.stockInicial.mantencion) * 100).toFixed(2)}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Competencia</TableCell>
                  <TableCell className="text-center">{MASTER_INSIGHTS.stockComparison.stockSGP.competencia.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{MASTER_INSIGHTS.stockComparison.stockInicial.competencia.toLocaleString()}</TableCell>
                  <TableCell className="text-center text-green-600 font-bold">
                    {MASTER_INSIGHTS.stockComparison.differences.competencia > 0 ? '+' : ''}{MASTER_INSIGHTS.stockComparison.differences.competencia.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">+{((MASTER_INSIGHTS.stockComparison.differences.competencia / MASTER_INSIGHTS.stockComparison.stockInicial.competencia) * 100).toFixed(2)}%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}