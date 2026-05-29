import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Card, SectionTitle, Badge } from '../components/ui';

export default function AboutScreen() {
  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <SectionTitle title="Sobre o projeto" subtitle="Informações técnicas para explicar ao professor." />
    <Card><Text style={styles.cardTitle}>Objetivo</Text><Text style={styles.paragraph}>Desenvolver um aplicativo mobile capaz de efetuar cálculos matemáticos apresentados na disciplina de Computação Numérica, permitindo que o usuário selecione o método de solução desejado.</Text></Card>
    <Card><Text style={styles.cardTitle}>Tecnologias</Text><Badge>React Native</Badge><Badge>Expo Go</Badge><Badge>JavaScript</Badge><Badge>AsyncStorage</Badge><Badge>SVG</Badge><Text style={styles.paragraph}>O app foi desenvolvido em React Native com Expo Go. Os gráficos são renderizados com react-native-svg e o histórico é salvo localmente com AsyncStorage.</Text></Card>
    <Card><Text style={styles.cardTitle}>Estrutura do código</Text><Text style={styles.code}>src/screens: telas do aplicativo{`\n`}src/components: componentes visuais reutilizáveis{`\n`}src/methods: algoritmos numéricos{`\n`}src/utils: parser, formatação e armazenamento{`\n`}src/data: exemplos prontos</Text></Card>
    <Card><Text style={styles.cardTitle}>Métodos implementados</Text><Text style={styles.paragraph}>Raízes: Bisseção, Ponto Fixo, Newton-Raphson e Secantes.</Text><Text style={styles.paragraph}>Sistemas lineares: Gauss com pivoteamento, Fatoração LU, Jacobi e Gauss-Seidel.</Text><Text style={styles.paragraph}>Ajuste de curvas: Regressão Linear e Mínimos Quadrados Polinomial.</Text></Card>
    <Card><Text style={styles.cardTitle}>Integrantes</Text><Text style={styles.paragraph}>Substitua este texto pelos nomes dos integrantes do grupo no arquivo src/screens/AboutScreen.js.</Text></Card>
  </ScrollView>;
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#020617' }, content: { padding: 18, paddingBottom: 120 }, cardTitle: { color: '#f8fafc', fontSize: 18, fontWeight: '900', marginBottom: 10 }, paragraph: { color: '#cbd5e1', lineHeight: 22, marginBottom: 8 }, code: { color: '#bae6fd', backgroundColor: '#020617', borderWidth: 1, borderColor: '#334155', borderRadius: 12, padding: 10, fontFamily: 'monospace' } });
