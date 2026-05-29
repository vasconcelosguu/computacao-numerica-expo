import React, { useState } from 'react';
import { Alert, ScrollView, View, StyleSheet } from 'react-native';
import { Button, Card, Field, MethodButton, SectionTitle } from '../components/ui';
import MessageBox from '../components/MessageBox';
import ResultBox from '../components/ResultBox';
import { FunctionChart } from '../components/Charts';
import { bisection, fixedPoint, newtonRaphson, secant } from '../methods/roots';
import { toNumber, nowLabel, round } from '../utils/format';
import { saveHistoryItem } from '../utils/storage';
import { rootExamples } from '../data/examples';

export default function RootsScreen() {
  const [method, setMethod] = useState('bisection');
  const [expression, setExpression] = useState('x*x - 4');
  const [a, setA] = useState('0');
  const [b, setB] = useState('5');
  const [x0, setX0] = useState('1');
  const [x1, setX1] = useState('3');
  const [tolerance, setTolerance] = useState('0.0001');
  const [maxIterations, setMaxIterations] = useState('50');
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');

  function applyExample(example) {
    setExpression(example.expression); setA(example.a || '0'); setB(example.b || '1'); setX0(example.x0 || '1'); setX1(example.x1 || '2'); setResult(null); setMessage(`Exemplo carregado: ${example.name}`);
  }

  async function calculate() {
    try {
      setMessage('');
      const tol = toNumber(tolerance, 0.0001);
      const max = Math.max(1, Math.floor(toNumber(maxIterations, 50)));
      let response;
      if (method === 'bisection') response = bisection(expression, toNumber(a), toNumber(b), tol, max);
      if (method === 'fixed') response = fixedPoint(expression, toNumber(x0), tol, max);
      if (method === 'newton') response = newtonRaphson(expression, toNumber(x0), tol, max);
      if (method === 'secant') response = secant(expression, toNumber(x0), toNumber(x1), tol, max);
      setResult(response);
      await saveHistoryItem({ date: nowLabel(), category: 'Raízes', method: response.method, title: `${response.method} - ${expression}`, summary: `Raiz: ${round(response.root)} | f(x): ${round(response.fx)}` });
    } catch (error) {
      Alert.alert('Erro no cálculo', error.message);
      setMessage(error.message);
    }
  }

  const examples = rootExamples[method] || [];
  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <SectionTitle title="Raízes de funções" subtitle="Informe a função e selecione o método numérico desejado." />
    <View style={styles.methods}><MethodButton title="Bisseção" active={method === 'bisection'} onPress={() => setMethod('bisection')} /><MethodButton title="Ponto Fixo" active={method === 'fixed'} onPress={() => setMethod('fixed')} /><MethodButton title="Newton" active={method === 'newton'} onPress={() => setMethod('newton')} /><MethodButton title="Secantes" active={method === 'secant'} onPress={() => setMethod('secant')} /></View>
    <MessageBox message={message} />
    <Card>
      <Field label={method === 'fixed' ? 'Função g(x)' : 'Função f(x)'} value={expression} onChangeText={setExpression} placeholder="Ex: x*x - 4" />
      {method === 'bisection' && <View style={styles.row}><View style={styles.flex}><Field label="a" value={a} onChangeText={setA} /></View><View style={styles.flex}><Field label="b" value={b} onChangeText={setB} /></View></View>}
      {method !== 'bisection' && <View style={styles.row}><View style={styles.flex}><Field label="x0" value={x0} onChangeText={setX0} /></View>{method === 'secant' && <View style={styles.flex}><Field label="x1" value={x1} onChangeText={setX1} /></View>}</View>}
      <View style={styles.row}><View style={styles.flex}><Field label="Tolerância" value={tolerance} onChangeText={setTolerance} /></View><View style={styles.flex}><Field label="Máx. iterações" value={maxIterations} onChangeText={setMaxIterations} /></View></View>
      <Button title="Calcular" onPress={calculate} />
    </Card>
    <Card><SectionTitle title="Exemplos prontos" subtitle="Use um exemplo seguro para apresentar ao professor." />{examples.map((example) => <Button key={example.name} title={example.name} onPress={() => applyExample(example)} secondary />)}</Card>
    <ResultBox result={result} />
    <FunctionChart expression={expression} root={result?.root} />
  </ScrollView>;
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#020617' }, content: { padding: 18, paddingBottom: 120 }, methods: { flexDirection: 'row', flexWrap: 'wrap' }, row: { flexDirection: 'row', gap: 10 }, flex: { flex: 1 } });
