# Decisão: Estrutura de Banco de Dados SQLite Local

## Status
Aprovado - 2025-09-05

## Contexto
O aplicativo de lista de compras precisa armazenar dados localmente no dispositivo do usuário, incluindo produtos, mercados, listas de compras e histórico de preços.

## Decisão
Decidimos usar o SQLite através do plugin @capacitor-community/sqlite com a seguinte estrutura:

### Tabelas
1. produtos
   - Armazena informações básicas dos produtos
   - Campos: id, nome, descricao, createdAt, updatedAt

2. mercados
   - Cadastro de mercados/estabelecimentos
   - Campos: id, nome, endereco, createdAt, updatedAt

3. listas_compra
   - Listas de compras do usuário
   - Campos: id, data, mercadoId, status, total, createdAt, updatedAt

4. itens_lista
   - Itens individuais de cada lista
   - Campos: id, listaId, produtoId, quantidade, preco, comprado, createdAt, updatedAt

5. historico_precos
   - Histórico de preços dos produtos por mercado
   - Campos: id, produtoId, mercadoId, preco, data, createdAt, updatedAt

## Consequências

### Positivas
1. Armazenamento local eficiente e confiável
2. Suporte a consultas SQL completas
3. Bom desempenho para as operações necessárias
4. Fácil backup e exportação de dados
5. Suporte multiplataforma via Capacitor

### Negativas
1. Necessidade de manter esquema de banco de dados
2. Complexidade adicional na atualização do esquema
3. Necessidade de gerenciar migrations no futuro

## Alternativas Consideradas
1. AsyncStorage - Muito simples para nossa necessidade
2. IndexedDB - Mais complexo de usar e menos suporte
3. Realm - Licenciamento mais restritivo

## Notas
- Implementamos campos de auditoria (createdAt, updatedAt) em todas as tabelas
- Usamos chaves estrangeiras para manter integridade referencial
- Escolhemos tipos de dados apropriados para cada coluna
