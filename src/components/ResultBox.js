import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Button, Card, Badge } from './ui';
import { formatVector, round } from '../utils/format';

function buildSummary(result) {
  if (!result) return '';
  let text = `Método: ${result.method}\n`;
  if (result.root !== undefined) text += `Raiz aproximada: ${round(result.root)}\nf(x): ${round(result.fx)}\n`;
  if (result.solution) text += `Solução: ${formatVector(result.solution)}\n`;
  if (result.equation) text += `Equação: ${result.equation}\n`;
  if (result.r2 !== undefined) text += `R²: ${round(result.r2)}\n`;
  if (result.criteria) text += `Critério de parada: ${result.criteria}\n`;
  text += `Iterações/etapas: ${result.iterations?.length || 0}`;
  return text;
}

export default function ResultBox({ result }) {
  if (!result) return null;
  const copy = async () => Clipboard.setStringAsync(buildSummary(result));
  return <Card accent="#22c55e">
    <View style={styles.header}><Text style={styles.title}>Resultado</Text><Badge color="#22c55e">{result.method}</Badge></View>
    {result.root !== undefined && <><Text style={styles.line}>Raiz aproximada: {round(result.root)}</Text><Text style={styles.line}>f(x): {round(result.fx)}</Text></>}
    {result.solution && <Text style={styles.line}>Solução: {formatVector(result.solution)}</Text>}
    {result.equation && <Text style={styles.line}>Equação: {result.equation}</Text>}
    {result.r2 !== undefined && <Text style={styles.line}>R²: {round(result.r2)}</Text>}
    {result.criteria && <Text style={styles.small}>Critério de parada: {result.criteria}</Text>}
    {result.warning && <Text style={styles.warning}>{result.warning}</Text>}
    {result.extra && <Text style={styles.code}>{result.extra}</Text>}
    {result.iterations?.length > 0 && <View style={styles.table}><Text style={styles.tableTitle}>Iterações / etapas</Text>{result.iterations.slice(0, 25).map((it, index) => <View key={`${it.i}-${index}`} style={styles.row}><Text style={styles.cell}>#{it.i}</Text><Text style={styles.cellLarge}>{String(it.x ?? it.detail ?? '-')}</Text>{it.fx !== undefined && <Text style={styles.cell}>f: {it.fx}</Text>}{it.error !== undefined && <Text style={styles.cell}>erro: {it.error}</Text>}{it.detail && <Text style={styles.detail}>{it.detail}</Text>}</View>)}</View>}
    <Button title="Copiar resumo do resultado" onPress={copy} secondary />
  </Card>;
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { color: '#f8fafc', fontSize: 19, fontWeight: '900' },
  line: { color: '#e2e8f0', fontSize: 15, lineHeight: 23, marginBottom: 4 },
  small: { color: '#94a3b8', lineHeight: 20, marginTop: 4 },
  warning: { color: '#fde68a', lineHeight: 20, marginTop: 8 },
  code: { color: '#bae6fd', backgroundColor: '#020617', borderWidth: 1, borderColor: '#334155', padding: 10, borderRadius: 12, marginTop: 10, fontFamily: 'monospace' },
  table: { marginTop: 12 },
  tableTitle: { color: '#f8fafc', fontWeight: '900', marginBottom: 8 },
  row: { backgroundColor: '#020617', borderRadius: 12, padding: 10, marginBottom: 8, borderWidth: 1, borderColor: '#1e293b' },
  cell: { color: '#cbd5e1', fontSize: 12, marginBottom: 2 },
  cellLarge: { color: '#e0f2fe', fontSize: 12, marginBottom: 2, fontWeight: '700' },
  detail: { color: '#94a3b8', fontSize: 11, marginTop: 4 },
});
