import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function MessageBox({ type = 'info', message }) {
  if (!message) return null;
  const colors = type === 'error' ? ['#7f1d1d', '#fecaca'] : type === 'warning' ? ['#78350f', '#fde68a'] : ['#082f49', '#bae6fd'];
  return <View style={[styles.box, { backgroundColor: colors[0] }]}><Text style={[styles.text, { color: colors[1] }]}>{message}</Text></View>;
}

const styles = StyleSheet.create({
  box: { borderRadius: 14, padding: 12, marginBottom: 14, borderWidth: 1, borderColor: '#334155' },
  text: { fontWeight: '700', lineHeight: 20 },
});
