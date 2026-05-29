import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = '@numerical_calc_history';

export async function getHistory() {
  const raw = await AsyncStorage.getItem(HISTORY_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveHistoryItem(item) {
  const current = await getHistory();
  const next = [{ ...item, id: `${Date.now()}` }, ...current].slice(0, 30);
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  return next;
}

export async function clearHistory() {
  await AsyncStorage.removeItem(HISTORY_KEY);
}
