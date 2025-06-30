"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, ChevronRight } from "lucide-react"
import Image from "next/image"

interface CilindrosSectionProps {
  showDetailTables: boolean
  setShowDetailTables: (show: boolean) => void
}

export function CilindrosSection({ showDetailTables, setShowDetailTables }: CilindrosSectionProps) {
  return (
    <div className="space-y-6">
      {/* Header específico para Cilindros - siguiendo @cilindros.png */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <Image src="/images/gasco-logo.png" alt="GASCO Logo" width={100} height={32} className="h-8 w-auto brightness-0 invert" />
            <div className="border-l border-orange-300 pl-4">
              <h2 className="text-2xl font-bold">Resumen de Cilindros</h2>
              <p className="text-orange-100">Diferencia stock SGP vs SAP</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-orange-200">Operación nacional</div>
            <div className="text-lg font-semibold">Análisis de Cilindros Operativos</div>
          </div>
        </div>
      </div>

      {/* Layout principal: 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Columna izquierda: Resumen de Cilindros */}
        <Card>
          <CardHeader>
            <CardTitle>Resumen de Cilindros</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Total principal */}
            <div className="text-center mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-2">Masa Total</div>
              <div className="text-4xl font-bold text-blue-600">6.750</div>
              <div className="text-sm text-blue-600">cil</div>
            </div>

            {/* Breakdown en cards */}
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-100 rounded">
                <div>
                  <div className="font-medium">Llenos</div>
                  <div className="text-sm text-gray-600">47.8%</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">3.228</div>
                  <div className="text-sm text-gray-500">cil</div>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-green-100 rounded">
                <div>
                  <div className="font-medium">Vacíos</div>
                  <div className="text-sm text-gray-600">27.7%</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">1.871</div>
                  <div className="text-sm text-gray-500">cil</div>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-orange-100 rounded">
                <div>
                  <div className="font-medium">Mantencion</div>
                  <div className="text-sm text-gray-600">13.6%</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-600">918</div>
                  <div className="text-sm text-gray-500">cil</div>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-purple-100 rounded">
                <div>
                  <div className="font-medium">Competencia</div>
                  <div className="text-sm text-gray-600">10.9%</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">733</div>
                  <div className="text-sm text-gray-500">cil</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Columna derecha: Diferencia Operativa */}
        <Card>
          <CardHeader>
            <CardTitle>Diferencia stock SGP vs SAP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Llenos */}
              <div className="grid grid-cols-4 gap-4 items-center">
                <div className="font-medium">Llenos</div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">1.120</div>
                  <div className="text-xs text-gray-500">SGP</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-600">1.050</div>
                  <div className="text-xs text-gray-500">SAP</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">70</div>
                  <div className="text-xs text-green-600">6.7%</div>
                </div>
              </div>

              {/* Vacíos (5K + 5K) */}
              <div className="grid grid-cols-4 gap-4 items-center">
                <div className="font-medium">Vacíos (5K + 5K)</div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">975</div>
                  <div className="text-xs text-gray-500">SGP</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-600">1.030</div>
                  <div className="text-xs text-gray-500">SAP</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-600">-55</div>
                  <div className="text-xs text-red-600">-5.3%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Inicial Cilindros por Subsistemas */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Stock Inicial Cilindros por Subsistemas</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowDetailTables(!showDetailTables)}
              className="flex items-center gap-2"
            >
              {showDetailTables ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              Ver Detalle
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Grid de subsistemas 3x3 */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {[
              { nombre: "1000", llenos: 465, vacios: 290, mantencion: 85, competencia: 160, total: 1000 },
              { nombre: "850", llenos: 410, vacios: 230, mantencion: 110, competencia: 100, total: 850 },
              { nombre: "1200", llenos: 580, vacios: 320, mantencion: 180, competencia: 120, total: 1200 },
              { nombre: "900", llenos: 420, vacios: 280, mantencion: 120, competencia: 80, total: 900 },
              { nombre: "750", llenos: 360, vacios: 210, mantencion: 130, competencia: 50, total: 750 },
              { nombre: "1100", llenos: 520, vacios: 310, mantencion: 170, competencia: 100, total: 1100 },
              { nombre: "950", llenos: 473, vacios: 281, mantencion: 123, competencia: 73, total: 950 }
            ].map((subsistema, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="text-lg font-bold mb-4">{subsistema.nombre} cil</div>
                
                {/* Mini barras apiladas */}
                <div className="flex mb-2 h-6">
                  <div 
                    className="bg-blue-500 flex items-center justify-center text-white text-xs font-bold"
                    style={{ width: `${(subsistema.llenos / subsistema.total) * 100}%` }}
                  >
                    {subsistema.llenos}
                  </div>
                  <div 
                    className="bg-green-500 flex items-center justify-center text-white text-xs font-bold"
                    style={{ width: `${(subsistema.vacios / subsistema.total) * 100}%` }}
                  >
                    {subsistema.vacios}
                  </div>
                  <div 
                    className="bg-orange-500 flex items-center justify-center text-white text-xs font-bold"
                    style={{ width: `${(subsistema.mantencion / subsistema.total) * 100}%` }}
                  >
                    {subsistema.mantencion}
                  </div>
                  <div 
                    className="bg-purple-500 flex items-center justify-center text-white text-xs font-bold"
                    style={{ width: `${(subsistema.competencia / subsistema.total) * 100}%` }}
                  >
                    {subsistema.competencia}
                  </div>
                </div>

                {/* Etiquetas */}
                <div className="grid grid-cols-4 gap-1 text-xs">
                  <div className="text-blue-600">Llenos</div>
                  <div className="text-green-600">Vacíos</div>
                  <div className="text-orange-600">Mant.</div>
                  <div className="text-purple-600">Comp.</div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen Por Clasificación */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Resumen Por Clasificación Unidades</h3>
            <Table className="text-sm">
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead className="text-center font-bold">Clasificación</TableHead>
                  <TableHead className="text-center font-bold">5K</TableHead>
                  <TableHead className="text-center font-bold">11K</TableHead>
                  <TableHead className="text-center font-bold">15K</TableHead>
                  <TableHead className="text-center font-bold">45K</TableHead>
                  <TableHead className="text-center font-bold">Mix Apropiado</TableHead>
                  <TableHead className="text-center font-bold">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Llenos</TableCell>
                  <TableCell className="text-center">16</TableCell>
                  <TableCell className="text-center">11</TableCell>
                  <TableCell className="text-center">8</TableCell>
                  <TableCell className="text-center">5</TableCell>
                  <TableCell className="text-center">60.0</TableCell>
                  <TableCell className="text-center font-bold">60.0</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Vacíos</TableCell>
                  <TableCell className="text-center">11.04</TableCell>
                  <TableCell className="text-center">9.33</TableCell>
                  <TableCell className="text-center">6.85</TableCell>
                  <TableCell className="text-center">4.39</TableCell>
                  <TableCell className="text-center">31.1</TableCell>
                  <TableCell className="text-center font-bold">25.8</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Mantencion</TableCell>
                  <TableCell className="text-center">13.01</TableCell>
                  <TableCell className="text-center">1.23</TableCell>
                  <TableCell className="text-center">6.2</TableCell>
                  <TableCell className="text-center">1.25</TableCell>
                  <TableCell className="text-center">1.8</TableCell>
                  <TableCell className="text-center font-bold">12.6</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Competencia</TableCell>
                  <TableCell className="text-center">2.01</TableCell>
                  <TableCell className="text-center">1.6</TableCell>
                  <TableCell className="text-center">0.5</TableCell>
                  <TableCell className="text-center">0.7</TableCell>
                  <TableCell className="text-center">3.6</TableCell>
                  <TableCell className="text-center font-bold">10.1</TableCell>
                </TableRow>
                <TableRow className="bg-gray-100 font-bold">
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-center font-bold">42.06</TableCell>
                  <TableCell className="text-center font-bold">23.16</TableCell>
                  <TableCell className="text-center font-bold">21.55</TableCell>
                  <TableCell className="text-center font-bold">11.34</TableCell>
                  <TableCell className="text-center font-bold">56.5</TableCell>
                  <TableCell className="text-center font-bold">100.0</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Tablas de detalle expandibles */}
          {showDetailTables && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Desglose Mantencion</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table className="text-sm">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Formato</TableHead>
                        <TableHead className="text-center">Cilindros</TableHead>
                        <TableHead className="text-center">Porcentaje</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>5K</TableCell>
                        <TableCell className="text-center">380</TableCell>
                        <TableCell className="text-center">41.4%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>11K</TableCell>
                        <TableCell className="text-center">275</TableCell>
                        <TableCell className="text-center">30.0%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>15K</TableCell>
                        <TableCell className="text-center">185</TableCell>
                        <TableCell className="text-center">20.1%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>45K</TableCell>
                        <TableCell className="text-center">78</TableCell>
                        <TableCell className="text-center">8.5%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Desglose Competencia</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table className="text-sm">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Formato</TableHead>
                        <TableHead className="text-center">Cilindros</TableHead>
                        <TableHead className="text-center">Porcentaje</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>5K</TableCell>
                        <TableCell className="text-center">320</TableCell>
                        <TableCell className="text-center">43.7%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>11K</TableCell>
                        <TableCell className="text-center">230</TableCell>
                        <TableCell className="text-center">31.4%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>15K</TableCell>
                        <TableCell className="text-center">120</TableCell>
                        <TableCell className="text-center">16.4%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>45K</TableCell>
                        <TableCell className="text-center">63</TableCell>
                        <TableCell className="text-center">8.6%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 