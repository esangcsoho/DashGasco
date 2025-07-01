"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { NATIONAL_TOTALS } from "@/lib/data-model"
import Image from "next/image"

interface MasaSectionProps {
  masaPorPlantaYFormato: {
    formatos: string[]
    plantas: Array<{
      nombre: string
      categorias: {
        llenos: any
        vacios: any
        mantencion: any
        competencia: any
      }
    }>
    resumenNacional: {
      masaTotal: number
      masaOperativa: number
      eficienciaMasa: number
      distribucionPorCategoria: {
        [key: string]: {
          masa: number
          porcentaje: number
        }
      }
    }
  }
}

export function MasaSection({ masaPorPlantaYFormato }: MasaSectionProps) {
  return (
    <div className="h-[calc(100vh-200px)] overflow-hidden">
      {/* Header específico para Masa - siguiendo @masa.png */}
      <div className="bg-gray-100 border-b border-gray-300 p-3 mb-4">
        <div className="flex items-center gap-4">
          <Image src="/images/gasco-logo.png" alt="GASCO Logo" width={50} height={16} className="h-4 w-auto" />
          <h2 className="text-base font-semibold text-gray-700">Gestión de Masa</h2>
        </div>
      </div>

      {/* Panel de Control Principal - Vista Ejecutiva */}
      <div className="grid grid-cols-12 gap-4 h-full">
        
        {/* COLUMNA IZQUIERDA: KPIs y Alertas (25%) */}
        <div className="col-span-3 space-y-4">
          
          {/* KPIs Críticos */}
          <Card className="h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Cilindros operativos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <div className="text-xs text-gray-600">Total</div>
                <div className="text-2xl font-bold text-blue-700">8.850</div>
                <div className="text-xs text-blue-600">Cil</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <div className="text-xs text-gray-600">Requerimiento de cilindros optimo</div>
                  <div className="text-2xl font-bold text-green-700">8.500</div>
                  <div className="text-xs text-green-600">Cil</div>
                </div>
                
                <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-xs text-gray-600">Diferencia</div>
                  <div className="text-2xl font-bold text-blue-700">350</div>
                  <div className="text-xs text-blue-600">Cil</div>
                  <div className="text-xs text-green-600 mt-1">4.1%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stock Inicial */}
          <Card className="h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Stock Inicial</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-3 bg-gray-50 rounded-lg border">
                <div className="text-xs text-gray-600">Masa Total</div>
                <div className="text-lg font-bold text-gray-700">8800</div>
                <div className="text-xs text-gray-600">Cil</div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                {/* Llenos */}
                <div className="space-y-2">
                  <div className="text-center p-2 bg-blue-100 rounded">
                    <div className="text-xs text-gray-600">Llenos</div>
                    <div className="text-lg font-bold text-blue-600">2300</div>
                    <div className="text-xs text-blue-600">Cil</div>
                    <div className="text-xs text-blue-600">23 Ton</div>
                  </div>
                  
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="text-xs text-gray-600">Llenos</div>
                    <div className="text-lg font-bold text-blue-600">2900</div>
                    <div className="text-xs text-blue-600">Cil</div>
                    <div className="text-xs text-blue-600">29 Ton</div>
                  </div>
                </div>

                {/* Otros */}
                <div className="space-y-2">
                  <div className="text-center p-2 bg-green-100 rounded">
                    <div className="text-xs text-gray-600">Llenos</div>
                    <div className="text-lg font-bold text-green-600">1600</div>
                    <div className="text-xs text-green-600">Cil</div>
                    <div className="text-xs text-green-600">16 Ton</div>
                  </div>
                  
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="text-xs text-gray-600">Llenos</div>
                    <div className="text-lg font-bold text-green-600">2000</div>
                    <div className="text-xs text-green-600">Cil</div>
                    <div className="text-xs text-green-600">20 Ton</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stock Online */}
          <Card className="h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Stock Online</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-3 bg-gray-50 rounded-lg border mb-4">
                <div className="text-xs text-gray-600">Masa Total</div>
                <div className="text-lg font-bold text-gray-700">9200</div>
                <div className="text-xs text-gray-600">Cil</div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {/* Llenos */}
                <div className="space-y-2">
                  <div className="text-center p-2 bg-blue-100 rounded">
                    <div className="text-xs text-gray-600">Llenos</div>
                    <div className="text-lg font-bold text-blue-600">2400</div>
                    <div className="text-xs text-blue-600">Cil</div>
                    <div className="text-xs text-blue-600">24 Ton</div>
                  </div>
                  
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="text-xs text-gray-600">Llenos</div>
                    <div className="text-lg font-bold text-blue-600">3000</div>
                    <div className="text-xs text-blue-600">Cil</div>
                    <div className="text-xs text-blue-600">30 Ton</div>
                  </div>
                </div>

                {/* Otros */}
                <div className="space-y-2">
                  <div className="text-center p-2 bg-green-100 rounded">
                    <div className="text-xs text-gray-600">Llenos</div>
                    <div className="text-lg font-bold text-green-600">1800</div>
                    <div className="text-xs text-green-600">Cil</div>
                    <div className="text-xs text-green-600">18 Ton</div>
                  </div>
                  
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="text-xs text-gray-600">Llenos</div>
                    <div className="text-lg font-bold text-green-600">2000</div>
                    <div className="text-xs text-green-600">Cil</div>
                    <div className="text-xs text-green-600">20 Ton</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* COLUMNA CENTRAL: Matriz Principal (50%) */}
        <div className="col-span-6">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold">Resumen Online Total Por Subsistema</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-80px)] overflow-auto">
              
              {/* Tabla Consolidada */}
              <Table className="text-xs">
                <TableHeader className="sticky top-0 bg-white">
                  <TableRow>
                    <TableHead className="text-center border border-gray-300 bg-gray-100 font-bold text-xs">
                      Productos
                    </TableHead>
                    <TableHead className="text-center border border-gray-300 bg-gray-100 font-bold text-xs">
                      Inicial
                    </TableHead>
                    <TableHead className="text-center border border-gray-300 bg-gray-100 font-bold text-xs">
                      Online
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-xs border border-gray-300 bg-gray-50 p-2">
                      Llenos
                    </TableCell>
                    <TableCell className="text-center text-xs border border-blue-200 p-1">
                      <div className="font-bold text-blue-700">0</div>
                    </TableCell>
                    <TableCell className="text-center text-xs border border-blue-200 p-1">
                      <div className="font-bold text-blue-700">12</div>
                    </TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell className="font-medium text-xs border border-gray-300 bg-gray-50 p-2">
                      Vacíos
                    </TableCell>
                    <TableCell className="text-center text-xs border border-green-200 p-1">
                      <div className="font-bold text-green-700">7194</div>
                    </TableCell>
                    <TableCell className="text-center text-xs border border-green-200 p-1">
                      <div className="font-bold text-green-700">1330</div>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium text-xs border border-gray-300 bg-gray-50 p-2">
                      Mantencion
                    </TableCell>
                    <TableCell className="text-center text-xs border border-orange-200 p-1">
                      <div className="font-bold text-orange-700">1606</div>
                    </TableCell>
                    <TableCell className="text-center text-xs border border-orange-200 p-1">
                      <div className="font-bold text-orange-700">1350</div>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium text-xs border border-gray-300 bg-gray-50 p-2">
                      Competencia
                    </TableCell>
                    <TableCell className="text-center text-xs border border-red-200 p-1">
                      <div className="font-bold text-red-700">509</div>
                    </TableCell>
                    <TableCell className="text-center text-xs border border-red-200 p-1">
                      <div className="font-bold text-red-700">2.41</div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* COLUMNA DERECHA: Resumen De Masa por Cilindros (25%) */}
        <div className="col-span-3 space-y-4">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Resumen De Masa por Cilindros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Datos en tabla */}
                <Table className="text-xs">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center font-bold">UI</TableHead>
                      <TableHead className="text-center font-bold">12</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">1SK</TableCell>
                      <TableCell className="text-center">2982</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">15K</TableCell>
                      <TableCell className="text-center">1204</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">45K</TableCell>
                      <TableCell className="text-center">235</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Gas Domicilio</TableCell>
                      <TableCell className="text-center">8</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Rend Operativo</TableCell>
                      <TableCell className="text-center">2445</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Rend Operativo</TableCell>
                      <TableCell className="text-center">7258</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 