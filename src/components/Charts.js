import React, { useMemo } from 'react';
import { Text } from 'react-native';
import Svg, { Polyline, Line, Circle, Text as SvgText } from 'react-native-svg';
import { Card } from './ui';
import { createFunction } from '../utils/mathParser';
import { evaluatePolynomial } from '../methods/regression';

export function FunctionChart({ expression, root }) {
  const points = useMemo(() => {
    try {
      const f = createFunction(expression);
      const list = [];
      for (let x = -10; x <= 10; x += 0.25) {
        const y = f(x);
        if (Number.isFinite(y) && Math.abs(y) < 1000) list.push({ x, y });
      }
      return list;
    } catch { return []; }
  }, [expression]);
  if (!points.length) return null;
  return <ChartFrame title="Gráfico da função f(x)" points={points} root={root} />;
}

export function RegressionChart({ points, coefficients }) {
  if (!points?.length || !coefficients?.length) return null;
  const minX = Math.min(...points.map((p) => p.x));
  const maxX = Math.max(...points.map((p) => p.x));
  const curve = [];
  for (let i = 0; i <= 60; i++) {
    const x = minX + ((maxX - minX || 1) * i) / 60;
    curve.push({ x, y: evaluatePolynomial(coefficients, x) });
  }
  return <ChartFrame title="Gráfico do ajuste de curvas" points={curve} scatter={points} />;
}

function ChartFrame({ title, points, scatter = [], root }) {
  const width = 340;
  const height = 210;
  const padding = 28;
  const all = [...points, ...scatter];
  const xs = all.map((p) => p.x);
  const ys = all.map((p) => p.y);
  const minX = Math.min(...xs, -1);
  const maxX = Math.max(...xs, 1);
  const minY = Math.min(...ys, -1);
  const maxY = Math.max(...ys, 1);
  const mapX = (x) => padding + ((x - minX) / (maxX - minX || 1)) * (width - padding * 2);
  const mapY = (y) => height - padding - ((y - minY) / (maxY - minY || 1)) * (height - padding * 2);
  const polyline = points.map((p) => `${mapX(p.x)},${mapY(p.y)}`).join(' ');
  const zeroY = mapY(0);
  const zeroX = mapX(0);
  return <Card>
    <Text style={{ color: '#f8fafc', fontWeight: '900', fontSize: 18, marginBottom: 10 }}>{title}</Text>
    <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
      <Line x1={padding} y1={Math.min(Math.max(zeroY, padding), height - padding)} x2={width - padding} y2={Math.min(Math.max(zeroY, padding), height - padding)} stroke="#475569" strokeWidth="1" />
      <Line x1={Math.min(Math.max(zeroX, padding), width - padding)} y1={padding} x2={Math.min(Math.max(zeroX, padding), width - padding)} y2={height - padding} stroke="#475569" strokeWidth="1" />
      <SvgText x={width - padding + 4} y={Math.min(Math.max(zeroY, padding + 10), height - padding)} fill="#94a3b8" fontSize="10">x</SvgText>
      <SvgText x={Math.min(Math.max(zeroX, padding), width - padding)} y={padding - 8} fill="#94a3b8" fontSize="10">y</SvgText>
      <Polyline points={polyline} fill="none" stroke="#38bdf8" strokeWidth="3" />
      {scatter.map((p, index) => <Circle key={index} cx={mapX(p.x)} cy={mapY(p.y)} r="4" fill="#22c55e" />)}
      {root !== undefined && Number.isFinite(root) && <><Circle cx={mapX(root)} cy={mapY(0)} r="6" fill="#22c55e" /><SvgText x={mapX(root) + 7} y={mapY(0) - 6} fill="#bbf7d0" fontSize="10">raiz</SvgText></>}
    </Svg>
    <Text style={{ color: '#94a3b8', fontSize: 12 }}>Legenda: linha azul representa a função/ajuste. Pontos verdes indicam raiz ou dados informados.</Text>
  </Card>;
}
