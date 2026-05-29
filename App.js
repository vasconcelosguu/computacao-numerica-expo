import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AboutScreen from "./src/screens/AboutScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ManualScreen from "./src/screens/ManualScreen";
import RegressionScreen from "./src/screens/RegressionScreen";
import RootsScreen from "./src/screens/RootsScreen";
import SystemsScreen from "./src/screens/SystemsScreen";

export default function App() {
  const [screen, setScreen] = useState("home");

  return (
    <SafeAreaView style={styles.app}>
      <View style={styles.header}>
        <Text style={styles.title}>NumeriCalc</Text>
        <Text style={styles.subtitle}>Trabalho de Computação Numérica</Text>
      </View>

      <View style={styles.body}>
        {screen === "home" && <HomeScreen setScreen={setScreen} />}
        {screen === "roots" && <RootsScreen />}
        {screen === "systems" && <SystemsScreen />}
        {screen === "regression" && <RegressionScreen />}
        {screen === "history" && <HistoryScreen />}
        {screen === "manual" && <ManualScreen />}
        {screen === "about" && <AboutScreen />}
      </View>

      <View style={styles.tabs}>
        <Tab title="Início" active={screen === "home"} onPress={() => setScreen("home")} />
        <Tab title="Raízes" active={screen === "roots"} onPress={() => setScreen("roots")} />
        <Tab title="Sistemas" active={screen === "systems"} onPress={() => setScreen("systems")} />
        <Tab title="Curvas" active={screen === "regression"} onPress={() => setScreen("regression")} />
        <Tab title="Histórico" active={screen === "history"} onPress={() => setScreen("history")} />
        <Tab title="Manual" active={screen === "manual"} onPress={() => setScreen("manual")} />
      </View>
    </SafeAreaView>
  );
}

function Tab({ title, active, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tab}>
      <Text style={[styles.tabText, active && styles.tabTextActive]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#020617",
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
    backgroundColor: "#020617",
  },
  title: {
    color: "#f8fafc",
    fontSize: 24,
    fontWeight: "900",
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 13,
    marginTop: 2,
  },
  body: {
    flex: 1,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#020617",
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 4,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  tabText: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "700",
  },
  tabTextActive: {
    color: "#38bdf8",
  },
});