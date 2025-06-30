"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Map, TrendingUp } from "lucide-react"
import { TremorCard, TremorMetric } from "../ui/tremor-card"
import { CircularProgress } from "../ui/tremor-progress"
import { UNIFIED_DATA, NATIONAL_TOTALS } from "@/lib/data-model"
import Image from "next/image"

interface OverviewSectionProps {
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

export function OverviewSection({ 
  nationalOverview, 
  filteredData, 
  expandedSubsystem, 
  toggleSubsystem, 
  getStatusColor 
}: OverviewSectionProps) {
  return (
    <div className="space-y-6">
      {/* Header específico para Resumen Nacional - siguiendo @propuesta.png */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <Image src="/images/gasco-logo.png" alt="GASCO Logo" width={100} height={32} className="h-8 w-auto brightness-0 invert" />
            <div className="border-l border-gray-300 pl-4">
              <h2 className="text-2xl font-bold">Dashboard Nacional SGP</h2>
              <p className="text-gray-200">Sistema Integrado de Gestión de Procesos</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-300">Vista general</div>
            <div className="text-lg font-semibold">Resumen Nacional</div>
          </div>
        </div>
      </div>

      {/* KPIs Principales usando TremorMetric */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <TremorCard decoration="left" decorationColor="blue-500">
          <TremorMetric
            title="Subsistemas Totales"
            value={nationalOverview.totalSubsistemas}
            change={{
              value: 2.3,
              type: "increase"
            }}
            tooltip="Total de subsistemas en operación"
          />
        </TremorCard>

        <TremorCard decoration="left" decorationColor="green-500">
          <TremorMetric
            title="Subsistemas Activos"
            value={nationalOverview.subsistemesActivos}
            change={{
              value: 1.5,
              type: "increase"
            }}
            target={nationalOverview.totalSubsistemas}
            tooltip="Subsistemas actualmente operativos"
          />
        </TremorCard>

        <TremorCard decoration="left" decorationColor="purple-500">
          <TremorMetric
            title="Total Cilindros"
            value={nationalOverview.totalCilindros.toLocaleString()}
            change={{
              value: 0.8,
              type: "increase"
            }}
            tooltip="Total nacional de cilindros"
          />
        </TremorCard>

        <TremorCard decoration="left" decorationColor="orange-500">
          <TremorMetric
            title="Eficiencia Nacional"
            value={`${nationalOverview.eficienciaOperacional}%`}
            change={{
              value: 1.2,
              type: "increase"
            }}
            target={95}
            tooltip="Eficiencia operacional promedio"
          />
        </TremorCard>
      </div>

      {/* Mapa de subsistemas con estado */}
      <TremorCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="w-5 h-5" />
            Mapa Nacional de Subsistemas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map((subsistema) => (
              <TremorCard 
                key={subsistema.id}
                className="hover:shadow-md transition-all cursor-pointer"
                decoration="top"
                decorationColor={subsistema.materiaPrima.estado === "activo" ? "green-500" : "gray-400"}
                onClick={() => toggleSubsystem(subsistema.id)}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">{subsistema.name}</h3>
                    <Badge 
                      variant={subsistema.materiaPrima.estado === "activo" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {subsistema.materiaPrima.estado}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Ocupación:</span>
                      <span className="font-medium">{subsistema.materiaPrima.ocupacion}%</span>
                    </div>
                    
                    <CircularProgress 
                      value={subsistema.materiaPrima.ocupacion} 
                      size="sm"
                      color={getStatusColor(subsistema.materiaPrima.ocupacion, { good: 70, warning: 50 })}
                    />
                    
                    <div className="text-xs text-gray-500 text-center">
                      {subsistema.materiaPrima.toneladas.toLocaleString()} / {subsistema.materiaPrima.capacidad.toLocaleString()} TON
                    </div>
                  </div>

                  {expandedSubsystem === subsistema.id && (
                    <div className="mt-4 pt-4 border-t space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-blue-50 p-2 rounded">
                          <div className="text-gray-600">Cilindros</div>
                          <div className="font-bold text-blue-600">{subsistema.cilindros.total.toLocaleString()}</div>
                        </div>
                        <div className="bg-green-50 p-2 rounded">
                          <div className="text-gray-600">Operativos</div>
                          <div className="font-bold text-green-600">{subsistema.cilindros.operativos.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TremorCard>
            ))}
          </div>
        </CardContent>
      </TremorCard>

      {/* Resumen de capacidad nacional */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TremorCard decoration="top" decorationColor="blue-500">
          <TremorMetric
            title="Capacidad Total Nacional"
            value={`${NATIONAL_TOTALS.materiaPrima.capacidad.toLocaleString()} TON`}
            tooltip="Capacidad máxima de almacenamiento"
          />
        </TremorCard>

        <TremorCard decoration="top" decorationColor="green-500">
          <TremorMetric
            title="Materia Prima Almacenada"
            value={`${NATIONAL_TOTALS.materiaPrima.toneladas.toLocaleString()} TON`}
            change={{
              value: 2.1,
              type: "increase"
            }}
            target={NATIONAL_TOTALS.materiaPrima.capacidad}
            tooltip="Total de materia prima en stock"
          />
        </TremorCard>

        <TremorCard decoration="top" decorationColor="purple-500">
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-2">Ocupación Promedio</div>
            <CircularProgress
              value={nationalOverview.ocupacionPromedio}
              size="lg"
              color={getStatusColor(nationalOverview.ocupacionPromedio, { good: 60, warning: 40 })}
            />
          </CardContent>
        </TremorCard>
      </div>
    </div>
  )
} 