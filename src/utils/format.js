export function toNumber(value, fallback = 0) {
  const normalized = String(value ?? '').replace(',', '.');
  const n = Number(normalized);
  return Number.isFinite(n) ? n : fallback;
}

export function round(value, digits = 8) {
  if (!Number.isFinite(value)) return value;
  return Number(value.toFixed(digits));
}

export function formatVector(vector) {
  return `[${vector.map((v) => round(v)).join(', ')}]`;
}

export function formatMatrix(matrix) {
  return matrix.map((row) => `[${row.map((v) => round(v)).join(', ')}]`).join('\n');
}

export function nowLabel() {
  return new Date().toLocaleString('pt-BR');
}
