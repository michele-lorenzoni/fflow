# fflow

![alt text](https://github.com/michele-lorenzoni/fflow/blob/master/src/showcase/screenshots/Screenshot%202025-11-05%20at%2021-53-29%20project_0.png?raw=true)

Editor visuale a nodi basato su [React Flow](https://reactflow.dev/) (`@xyflow/react`), pensato come canvas per organizzare blocchi di testo/codice collegabili tramite handle. L'interfaccia ricalca un'IDE con menu bar e toolbar contestuali (File / Edit / View / Preferences).

## Stack

- **React 19** + **Vite 7**
- **@xyflow/react** — motore del canvas a nodi
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **@radix-ui/themes** — primitive UI
- **modern-screenshot** — export del canvas in PNG
- **ESLint 9** + **Prettier** + **Husky** + **lint-staged**

## Avvio rapido

```bash
npm install
npm run dev
```

### Script

| Comando | Descrizione |
|---|---|
| `npm run dev` | Avvia il dev server Vite |
| `npm run build` | Build di produzione in `dist/` |
| `npm run preview` | Anteprima locale della build |
| `npm run lint` | Esegue ESLint sul progetto |
| `npm run format` | Formatta il codice con Prettier |
| `npm run format:check` | Verifica la formattazione senza modificare |

Husky installa un hook pre-commit che esegue `lint-staged` (Prettier + ESLint --fix sui file modificati).

## Struttura del progetto

```
src/
├── App.jsx                  # Root: ReactFlow + stato nodi/edge + screenshot
├── main.jsx                 # Entry point React
└── components/
    ├── MyMenu.jsx           # Menu bar superiore (File/Edit/View/Preferences)
    ├── MyFileToolBar.jsx    # Toolbar contestuale File
    ├── MyEditToolBar.jsx    # Toolbar contestuale Edit (es. aggiungi nodo)
    ├── MyViewToolBar.jsx    # Toolbar contestuale View (es. screenshot)
    ├── MyPreferencesToolBar.jsx
    ├── MyTextNode.jsx       # Nodo custom ridimensionabile con textarea
    ├── MyHandle.jsx         # Handle di connessione del nodo
    ├── MyInputTitle.jsx
    ├── MyTooltipButton.jsx
    ├── MySeparator.jsx
    ├── styles/classNames.jsx        # Stringhe Tailwind condivise
    ├── standard/icons/              # Wrapper di Material Symbols
    └── customs/icons/               # Bottoni-icona con handler/tooltip
```

### Architettura

- `App.jsx` mantiene lo stato di nodi ed edge tramite `useNodesState` / `useEdgesState`. Le connessioni sono di tipo `step`.
- Un solo `nodeType` è registrato: `myTextNode` (vedi `MyTextNode.jsx`), che usa `NodeResizer` per il ridimensionamento e una textarea come corpo.
- `MyMenu` gestisce un singolo `activeToolbar` e mostra/nasconde le toolbar tramite classi Tailwind (`top` + `opacity`).
- Le azioni globali (aggiunta nodo, screenshot) sono callback passati da `App.jsx` → `MyMenu` → toolbar specifiche.
- Lo screenshot usa `modern-screenshot` (`domToPng`) sul nodo `#root` e scarica un PNG. La libreria è stata scelta per il supporto a Tailwind CSS v4 (vedi commit `39a84e9`).

### Convenzioni

- Tutti i componenti applicativi sono prefissati con `My*`.
- Icone divise tra `standard/` (Material Symbols puri) e `customs/` (icone con logica/handler).
- Stili Tailwind riutilizzati sono centralizzati in `components/styles/classNames.jsx`.
- Variabili CSS custom: `--color-menu-bg`, `--color-menu-border`, `--color-menu-icon`.
