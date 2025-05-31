/* 
id = chave primária, auto-incremento
nome = nome do produto, não pode ser nulo
desricao = descrição do produto, pode ser nulo
preco = preço do produto, não pode ser nulo
foreign key = garante que cada produto pertença a uma categoria válida
*/

CREATE TABLE cadastro (

    nome TEXT NOT NULL
    email TEXT NOT NULL UNIQUE,
    senha text not NULL,
    cartao  NOT NULL
    endereco TEXT
    telefone TEXT
    data_cadastro DATE DEFAULT CURRENT_DATE
)


CREATE TABLE produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    desricao TEXT,
    preco REAL NOT NULL,
    categoria_id INTEGER,
    tamanho TEXT,
    cor TEXT,
    estoque INTEGER DEFAULT 0,
    imagem TEXT,
    data_cadastro DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
) 


CREATE TABLE categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    desricao TEXT,
    estoque INTEGER DEFAULT 0,
    
)

