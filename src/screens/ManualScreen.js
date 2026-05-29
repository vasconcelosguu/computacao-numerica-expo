import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Card, SectionTitle, Badge } from '../components/ui';

function ManualCard({ title, children }) {
  return <Card><Text style={styles.cardTitle}>{title}</Text>{children}</Card>;
}

export default function ManualScreen() {
  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <SectionTitle title="Manual do usuário" subtitle="Guia simples para usar o aplicativo durante a apresentação." />
    <ManualCard title="1. Objetivo do aplicativo"><Text style={styles.paragraph}>O NumeriCalc foi desenvolvido para aplicar métodos estudados em Computação Numérica. O usuário escolhe o método, informa os dados de entrada e o aplicativo exibe resultado, iterações, critério de parada e gráficos quando aplicável.</Text></ManualCard>
    <ManualCard title="2. Raízes de funções"><Badge>Bisseção</Badge><Badge>Ponto Fixo</Badge><Badge>Newton-Raphson</Badge><Badge>Secantes</Badge><Text style={styles.paragraph}>Informe a função usando x como variável. Exemplos: x*x - 4, sin(x), cos(x) - x, exp(x) - 2. Para Bisseção, informe a e b com sinais opostos. Para Newton, informe x0. Para Secantes, informe x0 e x1.</Text><Text style={styles.code}>f(x) = x*x - 4</Text></ManualCard>
    <ManualCard title="3. Sistemas lineares"><Badge>Gauss</Badge><Badge>LU</Badge><Badge>Jacobi</Badge><Badge>Gauss-Seidel</Badge><Text style={styles.paragraph}>Digite a matriz A linha por linha e o vetor b separadamente. O aplicativo valida se a matriz é quadrada e calcula a solução x.</Text><Text style={styles.code}>A = 10 2 1{`\n`}1 5 1{`\n`}2 3 10{`\n\n`}b = 7{`\n`}-8{`\n`}6</Text><Text style={styles.paragraph}>Nos métodos de Jacobi e Gauss-Seidel, a convergência depende da matriz. O app avisa se a matriz é diagonalmente dominante.</Text></ManualCard>
    <ManualCard title="4. Ajuste de curvas"><Badge>Regressão Linear</Badge><Badge>Mínimos Quadrados</Badge><Text style={styles.paragraph}>Informe pontos no formato x y, um por linha. A Regressão Linear calcula uma reta y = ax + b. O método dos Mínimos Quadrados polinomial calcula uma curva de grau escolhido.</Text><Text style={styles.code}>1 2{`\n`}2 3{`\n`}3 5{`\n`}4 4{`\n`}5 6</Text></ManualCard>
    <ManualCard title="5. Histórico e cópia de resultados"><Text style={styles.paragraph}>Após cada cálculo bem-sucedido, o resultado é salvo no histórico local do aparelho. Na caixa de resultado, o botão Copiar resumo gera um texto com método, resposta, critério de parada e número de iterações.</Text></ManualCard>
    <ManualCard title="6. Possíveis erros"><Text style={styles.paragraph}>Se aparecer erro, confira se os números estão corretos, se a função está escrita no padrão aceito, se o intervalo da Bisseção possui sinais opostos e se a matriz do sistema é quadrada.</Text></ManualCard>
  </ScrollView>;
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#020617' }, content: { padding: 18, paddingBottom: 120 }, cardTitle: { color: '#f8fafc', fontSize: 18, fontWeight: '900', marginBottom: 10 }, paragraph: { color: '#cbd5e1', lineHeight: 22, marginBottom: 8 }, code: { color: '#bae6fd', backgroundColor: '#020617', borderWidth: 1, borderColor: '#334155', borderRadius: 12, padding: 10, marginTop: 8, fontFamily: 'monospace' } });
