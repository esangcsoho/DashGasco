-- ===========================
-- 1. Resumen nacional por producto
-- ===========================
SELECT
  material_group_description AS producto,
  SUM(StockSgp) AS stock_sgp,
  SUM(StockSap) AS stock_sap,
  SUM(nominal_capacity) AS capacidad
FROM
  `datos-procesados-gasco.stock_operacional_qa.view_resumen_materiaprima`
GROUP BY 1
ORDER BY 1;

-- ===========================
-- 2. Resumen por subsistema y producto
-- ===========================
SELECT
  subsystems_description AS subsistema,
  material_group_description AS producto,
  SUM(StockSgp) AS stock_sgp,
  SUM(StockSap) AS stock_sap,
  SUM(nominal_capacity) AS capacidad
FROM
  `datos-procesados-gasco.stock_operacional_qa.view_resumen_materiaprima`
GROUP BY 1, 2
ORDER BY 1, 2;

-- ===========================
-- 3. Resumen por planta y producto
-- ===========================
SELECT
  plants_description AS planta,
  material_group_description AS producto,
  SUM(StockSgp) AS stock_sgp,
  SUM(StockSap) AS stock_sap,
  SUM(nominal_capacity) AS capacidad
FROM
  `datos-procesados-gasco.stock_operacional_qa.view_resumen_materiaprima`
GROUP BY 1, 2
ORDER BY 1, 2;

-- ===========================
-- 4. Detalle por estanque
-- ===========================
SELECT
  subsystems_description AS subsistema,
  bateria,
  estanques,
  material_group_description AS producto,
  PresionEstanque,
  TemperaturaEstanque,
  Densidad,
  StockSGP,
  StockSap,
  CapacidadEstanque,
  NivelEstanque
FROM
  `datos-procesados-gasco.stock_operacional_qa.view_detalle_materiaprima_estanque`
ORDER BY subsistema, bateria, estanques, producto;

-- ===========================
-- 5. Competencia por subsistema
-- ===========================
SELECT
  subsystems_description AS subsistema,
  SUM(StockSgp) AS stock_sgp,
  SUM(StockSap) AS stock_sap
FROM
  `datos-procesados-gasco.stock_operacional_qa.view_resumen_materiaprima`
WHERE
  material_group_description = 'COMPETENCIA'
GROUP BY 1
ORDER BY 1;

-- ===========================
-- 6. Comparativo SGP vs SAP por producto
-- ===========================
SELECT
  material_group_description AS producto,
  SUM(StockSgp) AS stock_sgp,
  SUM(StockSap) AS stock_sap,
  SUM(StockSgp) - SUM(StockSap) AS diferencia,
  SAFE_DIVIDE(SUM(StockSgp) - SUM(StockSap), SUM(StockSap)) * 100 AS diferencia_pct
FROM
  `datos-procesados-gasco.stock_operacional_qa.view_resumen_materiaprima`
GROUP BY 1
ORDER BY 1;

-- ===========================
-- 7. Por formato de cilindro (si puedes inferirlo)
-- ===========================
SELECT
  subsystems_description AS subsistema,
  CASE
    WHEN LOWER(bateria) LIKE '%5k%' THEN '5k'
    WHEN LOWER(bateria) LIKE '%11k%' THEN '11k'
    WHEN LOWER(bateria) LIKE '%15k%' THEN '15k'
    WHEN LOWER(bateria) LIKE '%45k%' THEN '45k'
    WHEN LOWER(bateria) LIKE '%gh%' THEN 'GH'
    ELSE 'OTRO'
  END AS formato,
  material_group_description AS producto,
  SUM(StockSGP) AS stock_sgp
FROM
  `datos-procesados-gasco.stock_operacional_qa.view_detalle_materiaprima_estanque`
GROUP BY 1, 2, 3
ORDER BY 1, 2, 3;

-- ===========================
-- 8. Resumen nacional total (para cards)
-- ===========================
SELECT
  SUM(StockSgp) AS stock_sgp_total,
  SUM(StockSap) AS stock_sap_total,
  SUM(nominal_capacity) AS capacidad_total
FROM
  `datos-procesados-gasco.stock_operacional_qa.view_resumen_materiaprima`; 