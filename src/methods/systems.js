import { formatMatrix, formatVector, round } from '../utils/format';

const EPS = 1e-10;

function validateSystem(A, b) {
  if (!A.length) throw new Error('Matriz A vazia.');
  const n = A.length;
  for (const row of A) {
    if (row.length !== n || row.some((v) => !Number.isFinite(v))) throw new Error('A matriz A precisa ser quadrada e conter apenas números.');
  }
  if (b.length !== n || b.some((v) => !Number.isFinite(v))) throw new Error('O vetor b precisa ter o mesmo tamanho da matriz A e conter apenas números.');
}

export function isDiagonallyDominant(A) {
  return A.every((row, i) => Math.abs(row[i]) >= row.reduce((sum, value, j) => sum + (i === j ? 0 : Math.abs(value)), 0));
}

export function gaussPivot(AInput, bInput) {
  const A = AInput.map((row) => [...row]);
  const b = [...bInput];
  validateSystem(A, b);
  const n = A.length;
  const steps = [];
  for (let k = 0; k < n - 1; k++) {
    let maxRow = k;
    for (let i = k + 1; i < n; i++) if (Math.abs(A[i][k]) > Math.abs(A[maxRow][k])) maxRow = i;
    if (Math.abs(A[maxRow][k]) < EPS) throw new Error('Sistema sem solução única.');
    if (maxRow !== k) {
      [A[k], A[maxRow]] = [A[maxRow], A[k]];
      [b[k], b[maxRow]] = [b[maxRow], b[k]];
      steps.push({ i: steps.length + 1, x: `Troca L${k + 1} com L${maxRow + 1}`, detail: formatMatrix(A) });
    }
    for (let i = k + 1; i < n; i++) {
      const factor = A[i][k] / A[k][k];
      for (let j = k; j < n; j++) A[i][j] -= factor * A[k][j];
      b[i] -= factor * b[k];
      steps.push({ i: steps.length + 1, x: `L${i + 1} = L${i + 1} - ${round(factor)}L${k + 1}`, detail: formatMatrix(A) });
    }
  }
  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    const sum = x.reduce((acc, value, j) => j > i ? acc + A[i][j] * value : acc, 0);
    if (Math.abs(A[i][i]) < EPS) throw new Error('Sistema sem solução única.');
    x[i] = (b[i] - sum) / A[i][i];
  }
  return { type: 'system', method: 'Gauss com Pivoteamento', solution: x, iterations: steps, extra: `Matriz triangular final:\n${formatMatrix(A)}` };
}

export function luFactorization(AInput, bInput) {
  const A = AInput.map((row) => [...row]);
  const b = [...bInput];
  validateSystem(A, b);
  const n = A.length;
  const L = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
  const U = Array.from({ length: n }, () => Array(n).fill(0));
  for (let k = 0; k < n; k++) {
    for (let j = k; j < n; j++) U[k][j] = A[k][j] - Array.from({ length: k }).reduce((s, _, r) => s + L[k][r] * U[r][j], 0);
    if (Math.abs(U[k][k]) < EPS) throw new Error('Não foi possível fatorar LU sem pivoteamento.');
    for (let i = k + 1; i < n; i++) L[i][k] = (A[i][k] - Array.from({ length: k }).reduce((s, _, r) => s + L[i][r] * U[r][k], 0)) / U[k][k];
  }
  const y = Array(n).fill(0);
  for (let i = 0; i < n; i++) y[i] = b[i] - Array.from({ length: i }).reduce((s, _, j) => s + L[i][j] * y[j], 0);
  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) x[i] = (y[i] - Array.from({ length: n - i - 1 }).reduce((s, _, idx) => { const j = i + 1 + idx; return s + U[i][j] * x[j]; }, 0)) / U[i][i];
  return { type: 'system', method: 'Fatoração LU', solution: x, iterations: [{ i: 1, x: 'Matriz L', detail: formatMatrix(L) }, { i: 2, x: 'Matriz U', detail: formatMatrix(U) }, { i: 3, x: `Vetor y = ${formatVector(y)}` }], extra: `A = L.U\nL:\n${formatMatrix(L)}\n\nU:\n${formatMatrix(U)}` };
}

export function jacobi(AInput, bInput, tolerance = 0.0001, maxIterations = 50) {
  const A = AInput.map((row) => [...row]);
  const b = [...bInput];
  validateSystem(A, b);
  const n = A.length;
  let x = Array(n).fill(0);
  const iterations = [];
  for (let k = 1; k <= maxIterations; k++) {
    const next = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      if (Math.abs(A[i][i]) < EPS) throw new Error('Elemento diagonal zero encontrado.');
      next[i] = (b[i] - A[i].reduce((sum, value, j) => i !== j ? sum + value * x[j] : sum, 0)) / A[i][i];
    }
    const error = Math.max(...next.map((value, i) => Math.abs(value - x[i])));
    iterations.push({ i: k, x: formatVector(next), error: round(error), detail: 'Atualização usando apenas a iteração anterior.' });
    x = next;
    if (error < tolerance) break;
  }
  return { type: 'system', method: 'Jacobi', solution: x, iterations, criteria: `erro máximo < ${tolerance}`, warning: isDiagonallyDominant(A) ? 'A matriz é diagonalmente dominante, o que favorece a convergência.' : 'A matriz não é diagonalmente dominante. A convergência não é garantida.' };
}

export function gaussSeidel(AInput, bInput, tolerance = 0.0001, maxIterations = 50) {
  const A = AInput.map((row) => [...row]);
  const b = [...bInput];
  validateSystem(A, b);
  const n = A.length;
  const x = Array(n).fill(0);
  const iterations = [];
  for (let k = 1; k <= maxIterations; k++) {
    const old = [...x];
    for (let i = 0; i < n; i++) {
      if (Math.abs(A[i][i]) < EPS) throw new Error('Elemento diagonal zero encontrado.');
      x[i] = (b[i] - A[i].reduce((sum, value, j) => i !== j ? sum + value * x[j] : sum, 0)) / A[i][i];
    }
    const error = Math.max(...x.map((value, i) => Math.abs(value - old[i])));
    iterations.push({ i: k, x: formatVector(x), error: round(error), detail: 'Atualização usando valores recém-calculados.' });
    if (error < tolerance) break;
  }
  return { type: 'system', method: 'Gauss-Seidel', solution: x, iterations, criteria: `erro máximo < ${tolerance}`, warning: isDiagonallyDominant(A) ? 'A matriz é diagonalmente dominante, o que favorece a convergência.' : 'A matriz não é diagonalmente dominante. A convergência não é garantida.' };
}
