"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, GitCompare } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CircularProgress } from "../ui/tremor-progress"
import { UNIFIED_DATA, NATIONAL_TOTALS } from "@/lib/data-model"
import { ChartContainer } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import Image from "next/image"

interface MateriaSectionProps {
  nationalOverview: {
    ocupacionPromedio: number
  }
  comparativoSGPvsSAP: {
    cilindros: {
      [key: string]: {
        sgp: number
        sap: number
        diferencia: number
        porcentaje: number
      }
    }
    masaTotal: {
      sgp: number
      sap: number
      diferencia: number
      porcentaje: number
    }
  }
  filteredData: typeof UNIFIED_DATA
  getStatusColor: (value: number, thresholds: { good: number; warning: number }) => string
}

export function MateriaSection({ 
  nationalOverview, 
  comparativoSGPvsSAP, 
  filteredData, 
  getStatusColor 
}: MateriaSectionProps) {
  return (
    <div className="space-y-6">
      {/* Header específico para Materia Prima - siguiendo @materia.png */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <Image src="/images/gasco-logo.png" alt="GASCO Logo" width={100} height={32} className="h-8 w-auto brightness-0 invert" />
            <div className="border-l border-blue-300 pl-4">
              <h2 className="text-2xl font-bold">Resumen de Materia Prima</h2>
              <p className="text-blue-100">Total Gasco</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-200">Análisis nacional</div>
            <div className="text-lg font-semibold">Materia Prima Nacional</div>
          </div>
        </div>
      </div>

      {/* Resumen de ocupación nacional */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-2">Materia Prima SGP</div>
            <div className="text-3xl font-bold text-blue-600">2500</div>
            <div className="text-sm text-blue-600">ton</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-2">Materia Prima SAP</div>
            <div className="text-3xl font-bold text-gray-600">2200</div>
            <div className="text-sm text-gray-600">ton</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-2">Diferencia SGP vs SAP</div>
            <div className="text-3xl font-bold text-green-600">+13.64%</div>
            <div className="text-sm text-green-600">Porcentaje</div>
            <div className="text-xs text-gray-500 mt-1">Ocupación: 84%</div>
          </CardContent>
        </Card>
      </div>

      {/* Layout de 3 columnas: Análisis + Comparativo + Producto General */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna izquierda: Distribución de MP total por subsistemas */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución de MP total por subsistemas (Stock SGP)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {/* Subsistemas con gráficos circulares */}
              <div className="text-center">
                <h3 className="font-semibold text-sm mb-3">5. Maipú</h3>
                <CircularProgress value={78.7} size="md" color="blue" />
                <div className="mt-2 text-xs">
                  <div className="font-bold">1800 ton</div>
                  <div className="text-gray-500">Diferencia vs SAP: +8.55% • +138 ton</div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-sm mb-3">5. Bellavista</h3>
                <CircularProgress value={60.0} size="md" color="green" />
                <div className="mt-2 text-xs">
                  <div className="font-bold">1500 ton</div>
                  <div className="text-gray-500">Diferencia vs SAP: +4.17% • +60 ton</div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-sm mb-3">5. Maipú</h3>
                <CircularProgress value={80.0} size="md" color="blue" />
                <div className="mt-2 text-xs">
                  <div className="font-bold">2400 ton</div>
                  <div className="text-gray-500">Diferencia vs SAP: +4.35% • +100 ton</div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-sm mb-3">5. Coquimbo</h3>
                <CircularProgress value={70.0} size="md" color="orange" />
                <div className="mt-2 text-xs">
                  <div className="font-bold">2100 ton</div>
                  <div className="text-gray-500">Diferencia vs SAP: +6.00% • +120 ton</div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-sm mb-3">5. Buin</h3>
                <CircularProgress value={100.0} size="md" color="red" />
                <div className="mt-2 text-xs">
                  <div className="font-bold">3000 ton</div>
                  <div className="text-gray-500">Diferencia vs SAP: +13.33% • +355 ton</div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-sm mb-3">5. Buin</h3>
                <CircularProgress value={84.0} size="md" color="purple" />
                <div className="mt-2 text-xs">
                  <div className="font-bold">2750 ton</div>
                  <div className="text-gray-500">Diferencia vs SAP: +4.38% • +115 ton</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Columna central: Resumen por producto general (Stock SGP) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Resumen por producto general (Stock SGP)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Gráfico de barras */}
            <div className="h-48 mb-4">
              <ChartContainer
                config={{
                  ton: {
                    label: "Toneladas",
                    color: "#3b82f6",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        name: "Primavera GLP",
                        ton: 760,
                        porcentaje: "30.4%",
                        diferencia: "+47",
                        fill: "#3b82f6"
                      },
                      {
                        name: "Lipigas",
                        ton: 700,
                        porcentaje: "28%",
                        diferencia: "-5",
                        fill: "#06b6d4"
                      },
                      {
                        name: "Propano",
                        ton: 523,
                        porcentaje: "20.9%",
                        diferencia: "+35",
                        fill: "#8b5cf6"
                      },
                      {
                        name: "Mixto",
                        ton: 267,
                        porcentaje: "10.7%",
                        diferencia: "-25",
                        fill: "#ef4444"
                      },
                      {
                        name: "Butano",
                        ton: 250,
                        porcentaje: "10%",
                        diferencia: "+5",
                        fill: "#f59e0b"
                      }
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={11}
                    />
                    <YAxis fontSize={11} />
                    <Bar 
                      dataKey="ton" 
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            {/* Tabla de datos debajo del gráfico */}
            <Table className="text-xs">
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
                  <TableCell className="text-center">760</TableCell>
                  <TableCell className="text-center">713</TableCell>
                  <TableCell className="text-center text-green-600 font-bold">+47</TableCell>
                  <TableCell className="text-center">30.4%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Lipigas</TableCell>
                  <TableCell className="text-center">700</TableCell>
                  <TableCell className="text-center">705</TableCell>
                  <TableCell className="text-center text-red-600 font-bold">-5</TableCell>
                  <TableCell className="text-center">28.0%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Propano</TableCell>
                  <TableCell className="text-center">523</TableCell>
                  <TableCell className="text-center">488</TableCell>
                  <TableCell className="text-center text-green-600 font-bold">+35</TableCell>
                  <TableCell className="text-center">20.9%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Mixto</TableCell>
                  <TableCell className="text-center">267</TableCell>
                  <TableCell className="text-center">292</TableCell>
                  <TableCell className="text-center text-red-600 font-bold">-25</TableCell>
                  <TableCell className="text-center">10.7%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Butano</TableCell>
                  <TableCell className="text-center">250</TableCell>
                  <TableCell className="text-center">245</TableCell>
                  <TableCell className="text-center text-green-600 font-bold">+5</TableCell>
                  <TableCell className="text-center">10.0%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Columna derecha: Diferencia SGP vs SAP */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitCompare className="w-5 h-5" />
              Diferencia SGP vs SAP (Ton)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="text-sm">
              <TableHeader>
                <TableRow className="bg-gray-50">
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
                  <TableCell className="text-center">1200</TableCell>
                  <TableCell className="text-center">1140</TableCell>
                  <TableCell className="text-center text-green-600 font-bold">+60</TableCell>
                  <TableCell className="text-center">+5.26%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Propano</TableCell>
                  <TableCell className="text-center">823</TableCell>
                  <TableCell className="text-center">799</TableCell>
                  <TableCell className="text-center text-green-600 font-bold">+24</TableCell>
                  <TableCell className="text-center">+3.00%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Mixto</TableCell>
                  <TableCell className="text-center">302</TableCell>
                  <TableCell className="text-center">316</TableCell>
                  <TableCell className="text-center text-red-600 font-bold">-14</TableCell>
                  <TableCell className="text-center">-4.43%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Butano</TableCell>
                  <TableCell className="text-center">175</TableCell>
                  <TableCell className="text-center">168</TableCell>
                  <TableCell className="text-center text-green-600 font-bold">+7</TableCell>
                  <TableCell className="text-center">+4.17%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 