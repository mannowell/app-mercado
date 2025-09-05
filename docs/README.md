# Documentação do Projeto Lista de Compras

Este diretório contém a documentação completa do projeto, incluindo:

## Estrutura de Diretórios

```
docs/
├── chats/           # Histórico de conversas importantes com o GitHub Copilot
├── decisoes/        # Registro de decisões de desenvolvimento (ADRs)
└── evolucao/        # Documentação da evolução do projeto
```

## Como Usar

### Salvando Chats Importantes

1. Ao finalizar uma conversa importante com o Copilot, salve o conteúdo em um arquivo Markdown na pasta `chats/`
2. Use o formato de nome: `YYYY-MM-DD-tema-principal.md`
3. Inclua tags relevantes no início do arquivo para facilitar buscas futuras

Exemplo:
```markdown
---
data: 2025-09-05
tags: [banco-de-dados, sqlite, modelagem]
---

# Implementação do Banco de Dados SQLite

[Conteúdo da conversa]
```

### Registrando Decisões (ADRs)

1. Para cada decisão importante de arquitetura ou tecnologia, crie um arquivo na pasta `decisoes/`
2. Use o formato: `YYYY-MM-DD-decisao.md`
3. Siga o template ADR (Architecture Decision Record)

Exemplo:
```markdown
# Decisão: Uso do SQLite com Capacitor

## Status
Aprovado

## Contexto
Precisamos de uma solução de banco de dados local para o aplicativo...

## Decisão
Decidimos usar SQLite através do plugin @capacitor-community/sqlite...

## Consequências
Positivas:
- Armazenamento local eficiente
- Suporte a consultas SQL completas

Negativas:
- Necessidade de manter esquema de banco de dados
```

### Documentando a Evolução

1. Mantenha um registro das principais mudanças e evoluções do projeto
2. Documente marcos importantes, refatorações e novos recursos
3. Use screenshots ou diagramas quando relevante

## Boas Práticas

1. Sempre inclua data e contexto nas documentações
2. Use tags para facilitar a busca
3. Mantenha a documentação atualizada junto com o código
4. Inclua exemplos práticos quando possível
5. Documente não apenas o "como", mas também o "porquê" das decisões
