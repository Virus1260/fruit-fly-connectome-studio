# Graphify Knowledge Graph Suite

This directory contains standalone codebase and concept knowledge graphs generated using **Graphify**.

## Purpose
Graphify indexes project source code, markdown documentation, and biophysical concept relationships into a persistent structural graph (`graph.json`). It enables:
- Fast multi-hop architecture traversal (AST symbol extraction and caller-callee mapping).
- Interactive visual tree exploration (`GRAPH_TREE.html`).
- Persistent graph memory for AI agents without bloating prompt context.

## Separation from Main Application
- All Graphify data, caches, and HTML outputs are stored in this `graphify/` directory.
- This directory is explicitly ignored by `.vercelignore`.
- Vercel only receives the Next.js runtime bundle, keeping deployments lightweight.
- Git tracks this directory so knowledge graph models are never lost on GitHub.

## Usage Commands

```powershell
# 1. Re-extract AST symbols and dependency edges
python -m graphify extract . --code-only --out graphify

# 2. Generate interactive collapsible D3 tree visualization
python -m graphify tree --graph graphify/graphify-out/graph.json --output graphify/graphify-out/GRAPH_TREE.html

# 3. View architectural hub nodes (god nodes)
python -m graphify god-nodes --graph graphify/graphify-out/graph.json
```
