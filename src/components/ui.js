import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export function Screen({ children }) {
  return <View style={styles.screen}>{children}</View>;
}

export function SectionTitle({ title, subtitle }) {
  return <View style={styles.sectionTitle}><Text style={styles.title}>{title}</Text>{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}</View>;
}

export function Card({ children, accent }) {
  return <View style={[styles.card, accent && { borderColor: accent }]}>{children}</View>;
}

export function Field({ label, value, onChangeText, placeholder, multiline }) {
  return <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#64748b" multiline={multiline} style={[styles.input, multiline && styles.textArea]} autoCapitalize="none" autoCorrect={false} /></View>;
}

export function Button({ title, onPress, secondary, danger }) {
  return <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[styles.button, secondary && styles.buttonSecondary, danger && styles.buttonDanger]}><Text style={[styles.buttonText, secondary && styles.buttonSecondaryText]}>{title}</Text></TouchableOpacity>;
}

export function MethodButton({ title, active, onPress }) {
  return <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[styles.methodButton, active && styles.methodButtonActive]}><Text style={[styles.methodText, active && styles.methodTextActive]}>{title}</Text></TouchableOpacity>;
}

export function Badge({ children, color = '#38bdf8' }) {
  return <View style={[styles.badge, { borderColor: color }]}><Text style={[styles.badgeText, { color }]}>{children}</Text></View>;
}

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#020617' },
  sectionTitle: { marginBottom: 16 },
  title: { color: '#f8fafc', fontSize: 28, fontWeight: '900' },
  subtitle: { color: '#94a3b8', fontSize: 14, marginTop: 6, lineHeight: 21 },
  card: { backgroundColor: '#0f172a', borderRadius: 22, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#1e293b' },
  field: { marginBottom: 12 },
  label: { color: '#e2e8f0', fontWeight: '800', marginBottom: 6 },
  input: { backgroundColor: '#020617', borderWidth: 1, borderColor: '#334155', color: '#f8fafc', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15 },
  textArea: { minHeight: 110, textAlignVertical: 'top' },
  button: { backgroundColor: '#38bdf8', borderRadius: 16, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  buttonSecondary: { backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155' },
  buttonDanger: { backgroundColor: '#ef4444' },
  buttonText: { color: '#020617', fontWeight: '900', fontSize: 15 },
  buttonSecondaryText: { color: '#e2e8f0' },
  methodButton: { backgroundColor: '#0f172a', borderWidth: 1, borderColor: '#334155', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 12, marginRight: 8, marginBottom: 10 },
  methodButtonActive: { backgroundColor: '#38bdf8', borderColor: '#38bdf8' },
  methodText: { color: '#cbd5e1', fontWeight: '800' },
  methodTextActive: { color: '#020617' },
  badge: { alignSelf: 'flex-start', borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, marginRight: 8, marginBottom: 8, backgroundColor: '#020617' },
  badgeText: { fontSize: 11, fontWeight: '900' },
});
