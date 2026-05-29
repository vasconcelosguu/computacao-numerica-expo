import React, { useCallback, useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { Button, Card, SectionTitle, Badge } from '../components/ui';
import { clearHistory, getHistory } from '../utils/storage';

export default function HistoryScreen() {
  const [items, setItems] = useState([]);

  async function load() {
    const data = await getHistory();
    setItems(data);
  }

  React.useEffect(() => { load(); }, []);

  async function clearAll() {
    await clearHistory();
    setItems([]);
  }

  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <SectionTitle title="Histórico" subtitle="Últimos cálculos salvos localmente no aparelho." />
    <Button title="Atualizar histórico" onPress={load} secondary />
    <Button title="Limpar histórico" onPress={clearAll} danger />
    {items.length === 0 && <Card><Text style={styles.empty}>Nenhum cálculo salvo ainda.</Text></Card>}
    {items.map((item) => <Card key={item.id}>
      <View style={styles.header}><Text style={styles.title}>{item.title}</Text><Badge>{item.category}</Badge></View>
      <Text style={styles.meta}>{item.date} - {item.method}</Text>
      <Text style={styles.summary}>{item.summary}</Text>
    </Card>)}
  </ScrollView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#020617' },
  content: { padding: 18, paddingBottom: 120 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#f8fafc', fontWeight: '900', fontSize: 17, flex: 1 },
  meta: { color: '#94a3b8', marginTop: 6, marginBottom: 8 },
  summary: { color: '#e2e8f0', lineHeight: 22 },
  empty: { color: '#cbd5e1', lineHeight: 22 },
});
