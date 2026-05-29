import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Badge, Button, Card, SectionTitle } from '../components/ui';

function MenuCard({ title, subtitle, badges, color, onPress }) {
  return <TouchableOpacity onPress={onPress} activeOpacity={0.85}><Card accent={color}>
    <Text style={styles.menuTitle}>{title}</Text>
    <Text style={styles.menuText}>{subtitle}</Text>
    <View style={styles.badges}>{badges.map((b) => <Badge key={b} color={color}>{b}</Badge>)}</View>
  </Card></TouchableOpacity>;
}

export default function HomeScreen({ setScreen }) {
  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <View style={styles.hero}>
      <Text style={styles.heroSmall}>Trabalho de Computação Numérica</Text>
      <Text style={styles.heroTitle}>Aplicativo mobile de métodos numéricos</Text>
      <Text style={styles.heroText}>Resolva raízes, sistemas lineares e ajuste de curvas com tabelas de iteração, gráficos, exemplos prontos e histórico local.</Text>
      <Button title="Começar agora" onPress={() => setScreen('roots')} />
    </View>
    <SectionTitle title="Módulos do aplicativo" subtitle="Escolha uma área para iniciar a resolução." />
    <MenuCard title="Raízes de Funções" subtitle="Bisseção, Ponto Fixo, Newton-Raphson e Secantes com gráfico da função." badges={['Iterativo', 'Gráfico', 'Erro']} color="#38bdf8" onPress={() => setScreen('roots')} />
    <MenuCard title="Sistemas Lineares" subtitle="Gauss com pivoteamento, Fatoração LU, Jacobi e Gauss-Seidel." badges={['Direto', 'Iterativo', 'Matrizes']} color="#a78bfa" onPress={() => setScreen('systems')} />
    <MenuCard title="Ajuste de Curvas" subtitle="Regressão Linear e Mínimos Quadrados Polinomial com visualização gráfica." badges={['Regressão', 'R²', 'Curva']} color="#22c55e" onPress={() => setScreen('regression')} />
    <MenuCard title="Manual do Usuário" subtitle="Explicações simples sobre como usar cada método e exemplos de entrada." badges={['Ajuda', 'Exemplos']} color="#f59e0b" onPress={() => setScreen('manual')} />
    <MenuCard title="Sobre o Projeto" subtitle="Objetivo, tecnologias utilizadas, estrutura de arquivos e observações para apresentação." badges={['Expo Go', 'React Native']} color="#fb7185" onPress={() => setScreen('about')} />
  </ScrollView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#020617' },
  content: { padding: 18, paddingBottom: 120 },
  hero: { backgroundColor: '#0f172a', borderRadius: 28, padding: 22, borderWidth: 1, borderColor: '#1e293b', marginBottom: 18 },
  heroSmall: { color: '#38bdf8', fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1.2, fontSize: 12, marginBottom: 8 },
  heroTitle: { color: '#f8fafc', fontSize: 32, lineHeight: 38, fontWeight: '900' },
  heroText: { color: '#cbd5e1', marginTop: 10, lineHeight: 22 },
  menuTitle: { color: '#f8fafc', fontSize: 20, fontWeight: '900', marginBottom: 6 },
  menuText: { color: '#cbd5e1', lineHeight: 21, marginBottom: 10 },
  badges: { flexDirection: 'row', flexWrap: 'wrap' },
});
