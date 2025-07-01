"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge" // No usado
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button" // No usado
// import { TremorCard, TremorMetric } from "../ui/tremor-card" // No usado
import { CircularProgress } from "../ui/tremor-progress"
import { UNIFIED_DATA, calculateNationalTotals, MASTER_INSIGHTS, calculateNationalProducts } from "@/lib/data-model"
import { Factory, Package2, AlertTriangle } from "lucide-react" // Gauge y Map eliminados
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
  const NATIONAL_TOTALS = calculateNationalTotals();

  // Helper function to get text color based on status color
  const getTextColorClass = (value: number, thresholds: { good: number; warning: number }) => {
    const status = getStatusColor(value, thresholds);
    if (status === "blue") return "text-blue-600";
    if (status === "green") return "text-green-600";
    if (status === "orange") return "text-orange-500"; // Adjusted orange for better visibility potentially
    if (status === "red") return "text-red-600";
    return "text-gray-700"; // Default
  };


  return (
    <div className="space-y-6">
      {/* Header específico para Resumen Nacional */}
      <div className="bg-gray-50 border-b border-gray-200 p-3"> {/* Gris más claro, borde más sutil */}
        <div className="flex items-center gap-4">
          <Image src="/images/gasco-logo.png" alt="GASCO Logo" width={50} height={16} className="h-5 w-auto" /> {/* Ligeramente más grande el logo si es necesario */}
          <h2 className="text-lg font-semibold text-gray-800">Resumen Nacional Materia Prima</h2> {/* Título más grande y oscuro */}
        </div>
      </div>

      {/* 3 Cards superiores principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center shadow-sm"> {/* Sombra sutil */}
          <CardContent className="p-6">
            <div className="text-sm text-gray-500 mb-2">Materia Prima SGP</div> {/* Gris más claro para el título */}
            <div className="text-3xl font-bold text-blue-600">{(NATIONAL_TOTALS.materiaPrima.toneladas ?? 0).toLocaleString()}</div>
            <div className="text-sm text-blue-500">ton</div> {/* Azul más claro para la unidad */}
          </CardContent>
        </Card>

        <Card className="text-center shadow-sm">
          <CardContent className="p-6">
            <div className="text-sm text-gray-500 mb-2">Materia Prima SAP</div>
            <div className="text-3xl font-bold text-gray-800">{Math.round(NATIONAL_TOTALS.materiaPrima.toneladas * 0.88).toLocaleString()}</div> {/* Texto más oscuro */}
            <div className="text-sm text-gray-700">ton</div> {/* Texto más oscuro */}
          </CardContent>
        </Card>

        <Card className="text-center shadow-sm">
          <CardContent className="p-6">
            <div className="text-sm text-gray-500 mb-2">Diferencia SGP vs SAP</div>
            <div className="text-3xl font-bold text-green-600">+13.64%</div>
            <div className="text-sm text-green-500">Porcentaje</div>
            <div className="text-xs text-gray-500 mt-2">Ocupación: {nationalOverview.ocupacionPromedio}%</div> {/* mt-2 para más espacio */}
          </CardContent>
        </Card>
      </div>

      {/* Layout de 3 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna izquierda: Distribución Nacional por subsistemas (Stock SGP) */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base text-gray-700">Distribución Nacional por subsistemas (Stock SGP)</CardTitle> {/* Ajuste de fuente */}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4"> {/* Ajustar gap si es necesario */}
              {/* Subsistemas con gráficos circulares */}
              {filteredData.slice(0, 6).map((subsistema, index) => (
                <Dialog key={subsistema.id}>
                  <DialogTrigger asChild>
                    <div className="text-center cursor-pointer hover:shadow-lg transition-all border border-gray-200 rounded-lg p-4 space-y-2"> {/* p-4, space-y-2 para más aire */}
                      <h3 className="font-semibold text-sm text-gray-700 truncate" title={subsistema.name}>{index + 1}. {subsistema.name}</h3>
                      <div className="py-2"> {/* Espacio para el gráfico */}
                        <CircularProgress
                          value={subsistema.materiaPrima.ocupacion}
                          size="lg" // Más grande
                          color={getStatusColor(subsistema.materiaPrima.ocupacion, { good: 70, warning: 50 }) as "blue" | "green" | "orange" | "red"}
                          showValue={false} // No mostrar valor dentro del círculo
                        />
                      </div>
                      <div className="text-lg font-bold text-gray-800">
                        {subsistema.materiaPrima.toneladas.toLocaleString()} ton
                      </div>
                      <div className="text-xs text-gray-500">
                        Cap: {subsistema.materiaPrima.capacidad.toLocaleString()} ton
                      </div>
                      <div className={`text-sm font-semibold ${getTextColorClass(subsistema.materiaPrima.ocupacion, { good: 70, warning: 50 })}`}>
                        {subsistema.materiaPrima.ocupacion}% Ocupación
                      </div>
                       {/* La imagen de referencia no muestra "Diferencia vs SAP" aquí, se omite por fidelidad */}
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
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-gray-700"> {/* Ajuste de fuente */}
              <Package2 className="w-5 h-5 text-gray-500" /> {/* Icono con color */}
              Resumen por producto general (Stock SGP)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Resumen de productos por toneladas */}
            <div className="space-y-3 mb-6"> {/* Ajustar espaciado si es necesario */}
              {calculateNationalProducts().map((prod) => {
                // Colores por producto (fondos pastel, texto oscuro)
                const productStyleMap: Record<string, { bg: string; text: string }> = {
                  "Propano SC": { bg: "bg-blue-100", text: "text-blue-700" },
                  "Propano": { bg: "bg-cyan-100", text: "text-cyan-700" },
                  "Mezcla": { bg: "bg-purple-100", text: "text-purple-700" },
                  "Butano": { bg: "bg-orange-100", text: "text-orange-700" },
                };
                const styles = productStyleMap[prod.nombre] || { bg: "bg-gray-100", text: "text-gray-800" };
                return (
                  <div key={prod.nombre} className={`text-center p-3 ${styles.bg} rounded-md shadow-sm`}> {/* Ligeramente más padding y sombra */}
                    <div className="text-xs text-gray-600 mb-1">{prod.nombre}</div> {/* Fuente más pequeña para nombre */}
                    <div className={`text-xl font-bold text-gray-800`}> {/* Valor con texto oscuro uniforme */}
                      {(prod.toneladas ?? 0).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">{((prod.porcentaje ?? 0) * 100).toFixed(1)}%</div>
                  </div>
                );
              })}
            </div>

            {/* Tabla de datos debajo */}
            <Table className="text-sm">
              <TableHeader>
                <TableRow className="bg-gray-50"> {/* Fondo gris muy claro */}
                  <TableHead className="text-left font-semibold text-gray-600 px-3 py-2">Producto</TableHead> {/* Alineación izquierda, padding */}
                  <TableHead className="text-center font-semibold text-gray-600 px-3 py-2">Stock SGP</TableHead>
                  <TableHead className="text-center font-semibold text-gray-600 px-3 py-2">Stock SAP</TableHead>
                  <TableHead className="text-center font-semibold text-gray-600 px-3 py-2">Diferencia</TableHead>
                  <TableHead className="text-center font-semibold text-gray-600 px-3 py-2">Porcentaje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {calculateNationalProducts().map((prod) => {
                  const toneladas = prod.toneladas ?? 0;
                  const stockSAP = Math.round(toneladas * 0.95); // Simulación
                  const diferencia = toneladas - stockSAP;
                  const porcentajeNum = (prod.porcentaje ?? 0) * 100;

                  let diffColor = "text-gray-700"; // Default color
                  if (diferencia > 0) diffColor = "text-green-600";
                  else if (diferencia < 0) diffColor = "text-red-600";

                  return (
                    <TableRow key={prod.nombre} className="border-b border-gray-200">
                      <TableCell className="font-medium text-gray-700 px-3 py-2">{prod.nombre}</TableCell> {/* Padding */}
                      <TableCell className="text-center text-gray-700 px-3 py-2">{toneladas.toLocaleString()}</TableCell>
                      <TableCell className="text-center text-gray-700 px-3 py-2">{stockSAP.toLocaleString()}</TableCell>
                      <TableCell className={`text-center font-semibold ${diffColor} px-3 py-2`}>
                        {diferencia > 0 ? '+' : ''}{diferencia.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center text-gray-700 px-3 py-2">{porcentajeNum.toFixed(1)}%</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Columna derecha: Diferencia SGP vs SAP (Cil) */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-gray-700"> {/* Ajuste de fuente */}
              <AlertTriangle className="w-5 h-5 text-gray-500" /> {/* Icono con color */}
              Diferencia SGP vs SAP (Cil)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Tabla de diferencias principales */}
            <Table className="text-sm">
              <TableHeader>
                <TableRow className="bg-gray-50"> {/* Fondo gris muy claro */}
                  <TableHead className="text-left font-semibold text-gray-600 px-3 py-2">Estado</TableHead> {/* Alineación izquierda, padding */}
                  <TableHead className="text-center font-semibold text-gray-600 px-3 py-2">Stock SGP</TableHead>
                  <TableHead className="text-center font-semibold text-gray-600 px-3 py-2">Stock SAP</TableHead>
                  <TableHead className="text-center font-semibold text-gray-600 px-3 py-2">Diferencia</TableHead>
                  <TableHead className="text-center font-semibold text-gray-600 px-3 py-2">Porcentaje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-gray-700 px-3 py-2">Llenos</TableCell> {/* Padding */}
                  <TableCell className="text-center text-gray-700 px-3 py-2">{MASTER_INSIGHTS.stockComparison.stockSGP.llenos.toLocaleString()}</TableCell>
                  <TableCell className="text-center text-gray-700 px-3 py-2">{MASTER_INSIGHTS.stockComparison.stockInicial.llenos.toLocaleString()}</TableCell>
                  <TableCell className="text-center text-green-600 font-semibold px-3 py-2"> {/* font-semibold */}
                    {MASTER_INSIGHTS.stockComparison.differences.llenos > 0 ? '+' : ''}{MASTER_INSIGHTS.stockComparison.differences.llenos.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center text-gray-700 px-3 py-2">+{((MASTER_INSIGHTS.stockComparison.differences.llenos / MASTER_INSIGHTS.stockComparison.stockInicial.llenos) * 100).toFixed(2)}%</TableCell>
                </TableRow>
                <TableRow className="border-b border-gray-200">
                  <TableCell className="font-medium text-gray-700 px-3 py-2">Vacíos</TableCell>
                  <TableCell className="text-center text-gray-700 px-3 py-2">{MASTER_INSIGHTS.stockComparison.stockSGP.vacios.toLocaleString()}</TableCell>
                  <TableCell className="text-center text-gray-700 px-3 py-2">{MASTER_INSIGHTS.stockComparison.stockInicial.vacios.toLocaleString()}</TableCell>
                  <TableCell className="text-center text-green-600 font-semibold px-3 py-2">
                    {MASTER_INSIGHTS.stockComparison.differences.vacios > 0 ? '+' : ''}{MASTER_INSIGHTS.stockComparison.differences.vacios.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center text-gray-700 px-3 py-2">+{((MASTER_INSIGHTS.stockComparison.differences.vacios / MASTER_INSIGHTS.stockComparison.stockInicial.vacios) * 100).toFixed(2)}%</TableCell>
                </TableRow>
                <TableRow className="border-b border-gray-200">
                  <TableCell className="font-medium text-gray-700 px-3 py-2">Mantencion</TableCell>
                  <TableCell className="text-center text-gray-700 px-3 py-2">{MASTER_INSIGHTS.stockComparison.stockSGP.mantencion.toLocaleString()}</TableCell>
                  <TableCell className="text-center text-gray-700 px-3 py-2">{MASTER_INSIGHTS.stockComparison.stockInicial.mantencion.toLocaleString()}</TableCell>
                  <TableCell className="text-center text-red-600 font-semibold px-3 py-2"> {/* Color rojo para negativo */}
                    {/* No añadir '+' si es negativo o cero */}
                    {MASTER_INSIGHTS.stockComparison.differences.mantencion !== 0 ? (MASTER_INSIGHTS.stockComparison.differences.mantencion > 0 ? '+' : '') : ''}{MASTER_INSIGHTS.stockComparison.differences.mantencion.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center text-gray-700 px-3 py-2">{((MASTER_INSIGHTS.stockComparison.differences.mantencion / MASTER_INSIGHTS.stockComparison.stockInicial.mantencion) * 100).toFixed(2)}%</TableCell>
                </TableRow>
                <TableRow className="border-b-0"> {/* Última fila sin borde inferior */}
                  <TableCell className="font-medium text-gray-700 px-3 py-2">Competencia</TableCell>
                  <TableCell className="text-center text-gray-700 px-3 py-2">{MASTER_INSIGHTS.stockComparison.stockSGP.competencia.toLocaleString()}</TableCell>
                  <TableCell className="text-center text-gray-700 px-3 py-2">{MASTER_INSIGHTS.stockComparison.stockInicial.competencia.toLocaleString()}</TableCell>
                  <TableCell className="text-center text-green-600 font-semibold px-3 py-2">
                    {MASTER_INSIGHTS.stockComparison.differences.competencia > 0 ? '+' : ''}{MASTER_INSIGHTS.stockComparison.differences.competencia.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center text-gray-700 px-3 py-2">+{((MASTER_INSIGHTS.stockComparison.differences.competencia / MASTER_INSIGHTS.stockComparison.stockInicial.competencia) * 100).toFixed(2)}%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}