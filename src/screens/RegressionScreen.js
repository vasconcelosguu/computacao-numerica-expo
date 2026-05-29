import React, { useState } from 'react';
import { Alert, ScrollView, View, StyleSheet } from 'react-native';
import { Button, Card, Field, MethodButton, SectionTitle } from '../components/ui';
import MessageBox from '../components/MessageBox';
import ResultBox from '../components/ResultBox';
import { RegressionChart } from '../components/Charts';
import { linearRegression, polynomialRegression } from '../methods/regression';
import { parsePoints } from '../utils/mathParser';
import { nowLabel, toNumber } from '../utils/format';
import { saveHistoryItem } from '../utils/storage';
import { regressionExamples } from '../data/examples';

export default function RegressionScreen() {
  const [method, setMethod] = useState('linear');
  const [pointsText, setPointsText] = useState('1 2\n2 3\n3 5\n4 4\n5 6');
  const [degree, setDegree] = useState('2');
  const [result, setResult] = useState(null);
  const [chartPoints, setChartPoints] = useState([]);
  const [message, setMessage] = useState('');

  function applyExample(example) { setPointsText(example.points); setDegree(example.degree); setResult(null); setChartPoints([]); setMessage(`Exemplo carregado: ${example.name}`); }

  async function calculate() {
    try {
      setMessage('');
      const points = parsePoints(pointsText);
      let response;
      if (method === 'linear') response = linearRegression(points);
      if (method === 'poly') response = polynomialRegression(points, Math.max(1, Math.floor(toNumber(degree, 2))));
      setChartPoints(points);
      setResult(response);
      await saveHistoryItem({ date: nowLabel(), category: 'Ajuste de Curvas', method: response.method, title: response.method, summary: response.equation });
    } catch (error) {
      Alert.alert('Erro no cálculo', error.message);
      setMessage(error.message);
    }
  }

  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <SectionTitle title="Ajuste de curvas" subtitle="Calcule regressão linear e mínimos quadrados polinomial." />
    <View style={styles.methods}><MethodButton title="Linear" active={method === 'linear'} onPress={() => setMethod('linear')} /><MethodButton title="Mínimos Quadrados" active={method === 'poly'} onPress={() => setMethod('poly')} /></View>
    <MessageBox message={message} />
    <Card>
      <Field label="Pontos no formato x y" value={pointsText} onChangeText={setPointsText} multiline placeholder={'1 2\n2 3\n3 5'} />
      {method === 'poly' && <Field label="Grau do polinômio" value={degree} onChangeText={setDegree} placeholder="2" />}
      <Button title="Calcular ajuste" onPress={calculate} />
    </Card>
    <Card><SectionTitle title="Exemplos prontos" subtitle="Dados para testar regressão e curva polinomial." />{regressionExamples.map((example) => <Button key={example.name} title={example.name} onPress={() => applyExample(example)} secondary />)}</Card>
    <ResultBox result={result} />
    <RegressionChart points={chartPoints} coefficients={result?.coefficients || []} />
  </ScrollView>;
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#020617' }, content: { padding: 18, paddingBottom: 120 }, methods: { flexDirection: 'row', flexWrap: 'wrap' } });
