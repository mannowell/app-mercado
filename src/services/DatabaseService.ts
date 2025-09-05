import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Produto, Mercado, ListaCompra, ItemLista, HistoricoPreco } from '../types';

export class DatabaseService {
  private static instance: DatabaseService;
  private sqlite: SQLiteConnection;
  private db!: SQLiteDBConnection;
  private initialized = false;

  private constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async init(): Promise<void> {
    if (this.initialized) return;

    const db = await this.sqlite.createConnection(
      'app-mercado',
      false,
      'no-encryption',
      1,
      false
    );

    await db.open();

    const statements = [
      `CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS mercados (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        endereco TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS listas_compra (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT NOT NULL,
        mercadoId INTEGER,
        status TEXT CHECK(status IN ('pendente', 'concluida')) NOT NULL,
        total REAL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        FOREIGN KEY (mercadoId) REFERENCES mercados(id)
      )`,
      `CREATE TABLE IF NOT EXISTS itens_lista (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        listaId INTEGER NOT NULL,
        produtoId INTEGER NOT NULL,
        quantidade INTEGER NOT NULL,
        preco REAL,
        comprado INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        FOREIGN KEY (listaId) REFERENCES listas_compra(id),
        FOREIGN KEY (produtoId) REFERENCES produtos(id)
      )`,
      `CREATE TABLE IF NOT EXISTS historico_precos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        produtoId INTEGER NOT NULL,
        mercadoId INTEGER NOT NULL,
        preco REAL NOT NULL,
        data TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        FOREIGN KEY (produtoId) REFERENCES produtos(id),
        FOREIGN KEY (mercadoId) REFERENCES mercados(id)
      )`
    ];

    for (const statement of statements) {
      await db.execute(statement);
    }

    this.db = db;
    this.initialized = true;
  }

  // Produtos
  async addProduto(produto: Omit<Produto, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
    const now = new Date().toISOString();
    const result = await this.db.run(
      'INSERT INTO produtos (nome, descricao, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
      [produto.nome, produto.descricao || null, now, now]
    );
    return result.changes?.lastId || 0;
  }

  async getProdutos(): Promise<Produto[]> {
    const result = await this.db.query('SELECT * FROM produtos ORDER BY nome');
    return result.values || [];
  }

  // Mercados
  async addMercado(mercado: Omit<Mercado, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
    const now = new Date().toISOString();
    const result = await this.db.run(
      'INSERT INTO mercados (nome, endereco, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
      [mercado.nome, mercado.endereco || null, now, now]
    );
    return result.changes?.lastId || 0;
  }

  async getMercados(): Promise<Mercado[]> {
    const result = await this.db.query('SELECT * FROM mercados ORDER BY nome');
    return result.values || [];
  }

  // Listas de Compra
  async addListaCompra(lista: Omit<ListaCompra, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
    const now = new Date().toISOString();
    const result = await this.db.run(
      'INSERT INTO listas_compra (data, mercadoId, status, total, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
      [lista.data.toISOString(), lista.mercadoId, lista.status, lista.total || null, now, now]
    );
    return result.changes?.lastId || 0;
  }

  async getListasCompra(): Promise<ListaCompra[]> {
    const result = await this.db.query('SELECT * FROM listas_compra ORDER BY data DESC');
    return result.values || [];
  }

  // Itens da Lista
  async addItemLista(item: Omit<ItemLista, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
    const now = new Date().toISOString();
    const result = await this.db.run(
      'INSERT INTO itens_lista (listaId, produtoId, quantidade, preco, comprado, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [item.listaId, item.produtoId, item.quantidade, item.preco || null, item.comprado ? 1 : 0, now, now]
    );
    return result.changes?.lastId || 0;
  }

  async getItensLista(listaId: number): Promise<ItemLista[]> {
    const result = await this.db.query(
      'SELECT * FROM itens_lista WHERE listaId = ? ORDER BY id',
      [listaId]
    );
    return result.values || [];
  }

  // Atualizar Lista
  async updateLista(lista: Partial<ListaCompra> & { id: number }): Promise<void> {
    const now = new Date().toISOString();
    const fields: string[] = [];
    const values: any[] = [];

    if (lista.data) {
      fields.push('data = ?');
      values.push(lista.data.toISOString());
    }
    if (lista.mercadoId) {
      fields.push('mercadoId = ?');
      values.push(lista.mercadoId);
    }
    if (lista.status) {
      fields.push('status = ?');
      values.push(lista.status);
    }
    if (typeof lista.total === 'number') {
      fields.push('total = ?');
      values.push(lista.total);
    }

    fields.push('updatedAt = ?');
    values.push(now);

    values.push(lista.id);

    await this.db.run(
      `UPDATE listas_compra SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
  }

  // Atualizar Item da Lista
  async updateItemLista(item: Partial<ItemLista> & { id: number }): Promise<void> {
    const now = new Date().toISOString();
    const fields: string[] = [];
    const values: any[] = [];

    if (item.quantidade) {
      fields.push('quantidade = ?');
      values.push(item.quantidade);
    }
    if (item.preco) {
      fields.push('preco = ?');
      values.push(item.preco);
    }
    if (typeof item.comprado === 'boolean') {
      fields.push('comprado = ?');
      values.push(item.comprado ? 1 : 0);
    }

    fields.push('updatedAt = ?');
    values.push(now);

    values.push(item.id);

    await this.db.run(
      `UPDATE itens_lista SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
  }

  // Excluir Item da Lista
  async deleteItemLista(itemId: number): Promise<void> {
    await this.db.run('DELETE FROM itens_lista WHERE id = ?', [itemId]);
  }

  // Histórico de Preços
  async addHistoricoPreco(historico: Omit<HistoricoPreco, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
    const now = new Date().toISOString();
    const result = await this.db.run(
      'INSERT INTO historico_precos (produtoId, mercadoId, preco, data, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
      [historico.produtoId, historico.mercadoId, historico.preco, historico.data.toISOString(), now, now]
    );
    return result.changes?.lastId || 0;
  }

  async getHistoricoPrecos(produtoId: number, mercadoId?: number): Promise<HistoricoPreco[]> {
    let query = 'SELECT * FROM historico_precos WHERE produtoId = ?';
    const params: any[] = [produtoId];
    
    if (mercadoId) {
      query += ' AND mercadoId = ?';
      params.push(mercadoId);
    }
    
    query += ' ORDER BY data DESC';
    const result = await this.db.query(query, params);
    return result.values || [];
  }
}
