# NumeriCalc

## Aplicativo Mobile de Métodos Numéricos

Aplicativo desenvolvido para a disciplina de **Computação Numérica**, com o objetivo de implementar e demonstrar os principais métodos numéricos estudados em aula através de uma interface mobile moderna, intuitiva e funcional.

O projeto foi desenvolvido utilizando **React Native + Expo SDK 56**, permitindo execução em dispositivos Android por meio do Expo Go ou APK nativo.

---

# Sumário

* Sobre o Projeto
* Funcionalidades
* Tecnologias Utilizadas
* Estrutura do Projeto
* Métodos Numéricos Implementados
* Interface do Aplicativo
* Instalação do Projeto
* Execução no Expo Go
* Geração de APK
* Estrutura Matemática
* Tratamento de Dados
* Estrutura dos Algoritmos
* Explicação Técnica dos Métodos
* Gráficos e Visualização
* Histórico de Cálculos
* Manual de Uso
* Scripts e Organização
* Melhorias Implementadas
* Possíveis Melhorias Futuras
* Integrantes
* Licença

---

# Sobre o Projeto

O **NumeriCalc** é um aplicativo mobile desenvolvido para auxiliar no estudo e execução de métodos numéricos utilizados em Computação Numérica.

O sistema permite que o usuário:

* encontre raízes de funções;
* resolva sistemas lineares;
* realize regressão linear;
* visualize gráficos matemáticos;
* acompanhe resultados iterativos;
* visualize histórico de cálculos realizados.

Todo o processamento matemático é realizado localmente no dispositivo.

---

# Funcionalidades

## Métodos de Raízes

* Método da Bisseção
* Método do Ponto Fixo
* Método de Newton-Raphson
* Método das Secantes

## Sistemas Lineares

* Eliminação de Gauss com Pivoteamento
* Fatoração LU
* Método de Jacobi
* Método de Gauss-Seidel

## Ajuste de Curvas

* Regressão Linear
* Método dos Mínimos Quadrados

## Recursos Extras

* Histórico local de cálculos
* Exemplos prontos
* Interface moderna
* Gráficos interativos
* Manual integrado
* Cópia de resultados
* Validação matemática
* Controle de iterações
* Exibição de erro relativo

---

# Tecnologias Utilizadas

| Tecnologia       | Finalidade              |
| ---------------- | ----------------------- |
| React Native     | Desenvolvimento mobile  |
| Expo SDK 56      | Ambiente de execução    |
| JavaScript       | Lógica do sistema       |
| React Hooks      | Gerenciamento de estado |
| AsyncStorage     | Persistência local      |
| React Native SVG | Geração de gráficos     |
| Expo Clipboard   | Copiar resultados       |
| Metro Bundler    | Empacotamento           |

---

# Estrutura do Projeto

```bash
computacao-numerica-expo/
│
├── App.js
├── package.json
├── eas.json
│
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── RootsScreen.js
│   │   ├── SystemsScreen.js
│   │   ├── RegressionScreen.js
│   │   ├── HistoryScreen.js
│   │   ├── ManualScreen.js
│   │   └── AboutScreen.js
│   │
│   ├── methods/
│   │   ├── roots.js
│   │   ├── systems.js
│   │   └── regression.js
│   │
│   ├── components/
│   │   ├── Card.js
│   │   ├── Input.js
│   │   ├── ResultBox.js
│   │   ├── Graph.js
│   │   └── Button.js
│   │
│   ├── utils/
│   │   ├── parser.js
│   │   ├── formatter.js
│   │   └── storage.js
│   │
│   └── data/
│       └── examples.js
│
└── README.md
```

---

# Métodos Numéricos Implementados

## Método da Bisseção

Método iterativo utilizado para encontrar raízes de funções contínuas em um intervalo `[a,b]`.

### Funcionamento

1. Divide-se o intervalo ao meio;
2. Avalia-se o sinal da função;
3. Escolhe-se o novo intervalo;
4. O processo se repete até atingir a tolerância.

### Fórmula

```math
x = \frac{a+b}{2}
```

---

## Método do Ponto Fixo

Transforma a equação:

```math
f(x)=0
```

em:

```math
x=g(x)
```

e realiza iterações sucessivas.

### Fórmula

```math
x_{n+1}=g(x_n)
```

---

## Método de Newton-Raphson

Método baseado na derivada da função.

### Fórmula

```math
x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}
```

---

## Método das Secantes

Semelhante ao Newton-Raphson, porém sem utilizar derivadas.

### Fórmula

```math
x_{n+1}=x_n-\frac{f(x_n)(x_n-x_{n-1})}{f(x_n)-f(x_{n-1})}
```

---

# Sistemas Lineares

## Eliminação de Gauss

Transforma a matriz em triangular superior através de operações elementares.

---

## Fatoração LU

Decompõe a matriz em:

```math
A = LU
```

onde:

* `L` → matriz triangular inferior
* `U` → matriz triangular superior

---

## Método de Jacobi

Método iterativo baseado na aproximação sucessiva.

---

## Método de Gauss-Seidel

Semelhante ao Jacobi, porém utilizando imediatamente os valores atualizados.

---

# Ajuste de Curvas

## Regressão Linear

Calcula a reta:

```math
y=ax+b
```

que melhor representa os dados.

---

## Método dos Mínimos Quadrados

Minimiza o erro quadrático entre pontos reais e valores aproximados.

---

# Interface do Aplicativo

O aplicativo foi desenvolvido com foco em:

* usabilidade;
* organização;
* clareza visual;
* experiência mobile;
* facilidade de navegação.

## Características Visuais

* Tema escuro moderno
* Cards organizados
* Navegação inferior
* Gráficos matemáticos
* Componentes responsivos
* Destaque visual para resultados

---

# Instalação do Projeto

## Requisitos

* Node.js
* NPM
* Expo CLI
* Expo Go

---

## Clonar Projeto

```bash
git clone https://github.com/seu-repositorio/numericalc.git
```

---

## Instalar Dependências

```bash
npm install
```

---

## Executar Projeto

```bash
npx expo start
```

---

# Execução no Expo Go

1. Instalar Expo Go no Android;
2. Executar:

```bash
npx expo start
```

3. Escanear QR Code;
4. Aplicativo abrirá automaticamente.

---

# Geração de APK

## Configuração EAS

```bash
npm install -g eas-cli
```

---

## Login

```bash
eas login
```

---

## Configurar Build

```bash
eas build:configure
```

---

## Gerar APK

```bash
eas build -p android --profile preview
```

---

# Estrutura Matemática

Todos os algoritmos foram implementados manualmente, sem bibliotecas matemáticas prontas.

O sistema realiza:

* cálculos iterativos;
* controle de tolerância;
* controle de erro;
* controle de convergência;
* validação de entrada;
* validação de matrizes;
* verificação de divisões inválidas.

---

# Tratamento de Dados

O aplicativo realiza diversas validações antes de executar os métodos.

## Validações

* campos vazios;
* divisão por zero;
* matriz inválida;
* intervalo inválido;
* função inválida;
* derivada nula;
* erro de convergência.

---

# Estrutura dos Algoritmos

Cada método foi separado em arquivos independentes para facilitar:

* manutenção;
* organização;
* reutilização;
* leitura do código.

Exemplo:

```bash
src/methods/roots.js
```

contém todos os métodos relacionados a raízes.

---

# Explicação Técnica dos Métodos

## Controle de Iterações

Todos os métodos possuem:

```javascript
maxIterations = 100
```

para evitar loops infinitos.

---

## Controle de Tolerância

A convergência é controlada por:

```javascript
tolerance = 0.0001
```

---

## Erro Relativo

O sistema calcula:

```math
Erro = |x_n - x_{n-1}|
```

---

# Gráficos e Visualização

Os gráficos são gerados utilizando:

```text
react-native-svg
```

Permitindo:

* desenho de eixos;
* curvas matemáticas;
* pontos de interseção;
* visualização de raízes;
* gráficos de regressão.

---

# Histórico de Cálculos

Os resultados são armazenados localmente utilizando:

```text
AsyncStorage
```

O usuário pode:

* visualizar histórico;
* reutilizar cálculos;
* revisar resultados anteriores.

---

# Manual de Uso

## Raízes

1. Selecionar método;
2. Inserir função;
3. Inserir parâmetros;
4. Executar cálculo.

---

## Sistemas

1. Inserir matriz;
2. Escolher método;
3. Executar solução.

---

## Regressão

1. Inserir pontos;
2. Selecionar método;
3. Gerar gráfico.

---

# Scripts e Organização

Os scripts foram organizados em módulos independentes.

## Principais Arquivos

| Arquivo       | Função                   |
| ------------- | ------------------------ |
| roots.js      | Métodos de raízes        |
| systems.js    | Sistemas lineares        |
| regression.js | Ajuste de curvas         |
| parser.js     | Tratamento de expressões |
| storage.js    | Histórico local          |

---

# Melhorias Implementadas

* Estrutura profissional
* Interface moderna
* Histórico persistente
* Gráficos avançados
* Navegação otimizada
* Código modularizado
* Melhorias de desempenho
* Tratamento de erros
* Manual integrado
* Responsividade

---

# Possíveis Melhorias Futuras

* Suporte a iOS
* Exportação PDF
* Mais métodos numéricos
* Sistema de temas
* Animações matemáticas
* Salvamento em nuvem
* Comparação entre métodos

---

# Integrantes

| Nome                | Função                          |
| ------------------- | ------------------------------- |
| Felipe Piovesan     | Desenvolvimento                 |
| Frederico Brumati   | Documentação                    |
| Gustavo Vasconcelos | Desenvolvimento Mobile          |
| Ruan Gimenes        | Interface e Testes              |
| Vitor Zuchieri      | Pesquisa e Validação Matemática |

---

# Licença

Projeto desenvolvido exclusivamente para fins acadêmicos.

---

# Considerações Finais

O projeto permitiu aplicar na prática os conceitos estudados em Computação Numérica, demonstrando a implementação de algoritmos matemáticos em um ambiente mobile moderno.

Além da parte matemática, o projeto também envolveu:

* desenvolvimento mobile;
* estruturação de software;
* experiência do usuário;
* persistência de dados;
* geração de gráficos;
* organização modular.

O aplicativo final atende aos requisitos propostos pela disciplina e apresenta uma solução funcional, organizada e escalável.
