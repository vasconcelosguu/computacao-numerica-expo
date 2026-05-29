import React, { useState } from 'react';
import { Alert, ScrollView, View, StyleSheet } from 'react-native';
import { Button, Card, Field, MethodButton, SectionTitle } from '../components/ui';
import MessageBox from '../components/MessageBox';
import ResultBox from '../components/ResultBox';
import { gaussPivot, gaussSeidel, jacobi, luFactorization } from '../methods/systems';
import { parseMatrix, parseVector } from '../utils/mathParser';
import { nowLabel, toNumber, formatVector } from '../utils/format';
import { saveHistoryItem } from '../utils/storage';
import { systemExamples } from '../data/examples';

export default function SystemsScreen() {
  const [method, setMethod] = useState('gauss');
  const [matrixText, setMatrixText] = useState('10 2 1\n1 5 1\n2 3 10');
  const [vectorText, setVectorText] = useState('7\n-8\n6');
  const [tolerance, setTolerance] = useState('0.0001');
  const [maxIterations, setMaxIterations] = useState('50');
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');

  function applyExample(example) { setMatrixText(example.A); setVectorText(example.b); setResult(null); setMessage(`Exemplo carregado: ${example.name}`); }

  async function calculate() {
    try {
      setMessage('');
      const A = parseMatrix(matrixText);
      const b = parseVector(vectorText);
      const tol = toNumber(tolerance, 0.0001);
      const max = Math.max(1, Math.floor(toNumber(maxIterations, 50)));
      let response;
      if (method === 'gauss') response = gaussPivot(A, b);
      if (method === 'lu') response = luFactorization(A, b);
      if (method === 'jacobi') response = jacobi(A, b, tol, max);
      if (method === 'seidel') response = gaussSeidel(A, b, tol, max);
      setResult(response);
      await saveHistoryItem({ date: nowLabel(), category: 'Sistemas', method: response.method, title: response.method, summary: `Solução: ${formatVector(response.solution)}` });
    } catch (error) {
      Alert.alert('Erro no cálculo', error.message);
      setMessage(error.message);
    }
  }

  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <SectionTitle title="Sistemas lineares" subtitle="Resolva Ax = b por métodos diretos e iterativos." />
    <View style={styles.methods}><MethodButton title="Gauss" active={method === 'gauss'} onPress={() => setMethod('gauss')} /><MethodButton title="LU" active={method === 'lu'} onPress={() => setMethod('lu')} /><MethodButton title="Jacobi" active={method === 'jacobi'} onPress={() => setMethod('jacobi')} /><MethodButton title="G-Seidel" active={method === 'seidel'} onPress={() => setMethod('seidel')} /></View>
    <MessageBox message={message} />
    <Card>
      <Field label="Matriz A" value={matrixText} onChangeText={setMatrixText} multiline placeholder={'10 2 1\n1 5 1\n2 3 10'} />
      <Field label="Vetor b" value={vectorText} onChangeText={setVectorText} multiline placeholder={'7\n-8\n6'} />
      {(method === 'jacobi' || method === 'seidel') && <View style={styles.row}><View style={styles.flex}><Field label="Tolerância" value={tolerance} onChangeText={setTolerance} /></View><View style={styles.flex}><Field label="Máx. iterações" value={maxIterations} onChangeText={setMaxIterations} /></View></View>}
      <Button title="Resolver sistema" onPress={calculate} />
    </Card>
    <Card><SectionTitle title="Exemplos prontos" subtitle="Sistemas preparados para testar os métodos." />{systemExamples.map((example) => <Button key={example.name} title={example.name} onPress={() => applyExample(example)} secondary />)}</Card>
    <ResultBox result={result} />
  </ScrollView>;
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#020617' }, content: { padding: 18, paddingBottom: 120 }, methods: { flexDirection: 'row', flexWrap: 'wrap' }, row: { flexDirection: 'row', gap: 10 }, flex: { flex: 1 } });
