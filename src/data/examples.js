export const rootExamples = {
  bisection: [
    { name: 'x² - 4', expression: 'x*x - 4', a: '0', b: '5', x0: '1', x1: '3' },
    { name: 'cos(x) - x', expression: 'cos(x) - x', a: '0', b: '1', x0: '0.5', x1: '1' },
    { name: 'e^x - 3x', expression: 'exp(x) - 3*x', a: '0', b: '1', x0: '0.5', x1: '1' },
  ],
  fixed: [
    { name: 'sqrt(4)', expression: 'sqrt(4)', x0: '1', x1: '3', a: '0', b: '5' },
    { name: 'cos(x)', expression: 'cos(x)', x0: '0.5', x1: '1', a: '0', b: '1' },
  ],
  newton: [
    { name: 'x² - 4', expression: 'x*x - 4', x0: '1', x1: '3', a: '0', b: '5' },
    { name: 'x³ - x - 2', expression: 'x*x*x - x - 2', x0: '1.5', x1: '2', a: '1', b: '2' },
  ],
  secant: [
    { name: 'x² - 4', expression: 'x*x - 4', x0: '1', x1: '3', a: '0', b: '5' },
    { name: 'cos(x) - x', expression: 'cos(x) - x', x0: '0', x1: '1', a: '0', b: '1' },
  ],
};

export const systemExamples = [
  { name: 'Sistema 3x3 dominante', A: '10 2 1\n1 5 1\n2 3 10', b: '7\n-8\n6' },
  { name: 'Sistema 2x2 simples', A: '2 1\n5 7', b: '11\n13' },
  { name: 'Sistema para LU', A: '4 3\n6 3', b: '10\n12' },
];

export const regressionExamples = [
  { name: 'Pontos quase lineares', points: '1 2\n2 3\n3 5\n4 4\n5 6', degree: '2' },
  { name: 'Curva quadrática', points: '0 1\n1 3\n2 7\n3 13\n4 21', degree: '2' },
  { name: 'Dados experimentais', points: '1 1.2\n2 1.9\n3 3.2\n4 3.8\n5 5.1\n6 6.2', degree: '1' },
];
