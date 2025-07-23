CREATE TABLE public.Crianca_Adolescente (
    id_crianca SERIAL PRIMARY KEY,
    nome_completo VARCHAR(50),
    data_nascimento DATE,
    sexo CHAR(1),
    cpf VARCHAR(50),
    escola VARCHAR(50),
    situacao_familiar VARCHAR(50),
    id_atendimento INTEGER
);

CREATE TABLE public.Atendimento (
    id_atendimento SERIAL PRIMARY KEY,
    data DATE,
    setor VARCHAR(50),
    resumo_situacao VARCHAR(500),
    id_crianca INTEGER,
    id_profissional INTEGER
);

CREATE TABLE public.Profissional (
	id_profissional SERIAL PRIMARY KEY,
	nome_completo VARCHAR(50),
	genero VARCHAR(10),
	cpf VARCHAR(50),
	setor VARCHAR(50),
	id_atendimento INTEGER,
	id_usuario INTEGER
);

CREATE TABLE public.Usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(50),
    perfil_acesso VARCHAR(20)
);

CREATE TABLE public.Responsavel_Legal (
    id_responsavel SERIAL PRIMARY KEY,
    nome VARCHAR(50),
    grau_parentesco VARCHAR(20),
    telefone VARCHAR(15),
    endereco VARCHAR(50),
    id_crianca INTEGER
);

CREATE TABLE public.Ocorrencia_Critica (
    id_ocorrencia SERIAL PRIMARY KEY,
    tipo_ocorrencia VARCHAR(50),
    descricao VARCHAR(500),
    gravidade VARCHAR(50),
    id_crianca INTEGER
);

CREATE TABLE public.Documento (
    id_documento SERIAL PRIMARY KEY,
    nome_arquivo VARCHAR(50),
    tipo_documento VARCHAR(20),
    arquivo_pdf VARCHAR(100),
    id_crianca INTEGER
    
);

CREATE TABLE public.Encaminhamento (
    id_encaminhamento SERIAL PRIMARY KEY,
    data DATE,
    instituicao_destino VARCHAR(100),
    status VARCHAR(20),
    id_crianca INTEGER
);

CREATE TABLE public.Programa_Social (
    id_programa SERIAL PRIMARY KEY,
    nome_programa VARCHAR(50),
    status VARCHAR(20),
    data_inicio DATE,
    observacoes VARCHAR(100)
);

CREATE TABLE public.Crianca_Programa (
    id_crianca INTEGER,
    id_programa INTEGER,
    data_entrada DATE,
    data_saida DATE,
    PRIMARY KEY (id_crianca, id_programa)
);

CREATE TABLE public.Visita_Tecnica (
    id_visita SERIAL PRIMARY KEY,
    data_visita DATE
);

CREATE TABLE public.Profissional_Visita (
    id_visita INTEGER,
    id_profissional INTEGER,
    descricao VARCHAR(500),
    PRIMARY KEY (id_visita, id_profissional)
);

CREATE TABLE public.Log_Atividade (
    id_log SERIAL PRIMARY KEY,
    data DATE,
    hora TIME,
    acao_executada VARCHAR(100),
    item_afetado VARCHAR(100),
    id_usuario INTEGER
);

ALTER TABLE Crianca_Adolescente
ADD FOREIGN KEY (id_atendimento) REFERENCES Atendimento(id_atendimento);

ALTER TABLE Atendimento
ADD FOREIGN KEY (id_crianca) REFERENCES Crianca_Adolescente(id_crianca),
ADD FOREIGN KEY (id_profissional) REFERENCES Profissional(id_profissional);

ALTER TABLE Profissional
ADD FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
ADD FOREIGN KEY (id_atendimento) REFERENCES Atendimento(id_atendimento);

ALTER TABLE Responsavel_Legal
ADD FOREIGN KEY (id_crianca) REFERENCES Crianca_Adolescente(id_crianca);

ALTER TABLE Ocorrencia_Critica
ADD FOREIGN KEY (id_crianca) REFERENCES Crianca_Adolescente(id_crianca);

ALTER TABLE Documento
ADD FOREIGN KEY (id_crianca) REFERENCES Crianca_Adolescente(id_crianca);

ALTER TABLE Encaminhamento
ADD FOREIGN KEY (id_crianca) REFERENCES Crianca_Adolescente(id_crianca);

ALTER TABLE Crianca_Programa
ADD FOREIGN KEY (id_crianca) REFERENCES Crianca_Adolescente(id_crianca),
ADD FOREIGN KEY (id_programa) REFERENCES Programa_Social(id_programa);

ALTER TABLE profissional_Visita
ADD FOREIGN KEY (id_profissional) REFERENCES Profissional(id_profissional),
ADD FOREIGN KEY (id_visita) REFERENCES Visita_Tecnica(id_visita);

ALTER TABLE Log_Atividade
ADD FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario);

-- Usuários
INSERT INTO Usuario (nome, perfil_acesso) VALUES
('Ana Souza', 'admin'),
('Carlos Lima', 'assistente'),
('Fernanda Costa', 'coordenador'),
('Ricardo Mendes', 'assistente'),
('Laura Martins', 'admin');

-- Profissionais
INSERT INTO Profissional (nome_completo, genero, cpf, setor, id_atendimento, id_usuario) VALUES
('João Pereira', 'Masculino', '123.456.789-00', 'Psicologia', NULL, 1),
('Maria Oliveira', 'Feminino', '987.654.321-00', 'Serviço Social', NULL, 2),
('Patrícia Silva', 'Feminino', '222.333.444-55', 'Educação', NULL, 3),
('Carlos Alberto', 'Masculino', '666.777.888-99', 'Psicologia', NULL, 4),
('Aline Torres', 'Feminino', '999.000.111-22', 'Serviço Social', NULL, 5);

-- Atendimento
INSERT INTO Atendimento (data, setor, resumo_situacao, id_crianca, id_profissional) VALUES
('2025-07-01', 'Psicologia', 'Acompanhamento psicológico iniciado.', NULL, 1),
('2025-07-05', 'Serviço Social', 'Avaliação socioeconômica realizada.', NULL, 2),
('2025-07-10', 'Educação', 'Dificuldade de aprendizagem identificada.', NULL, 3),
('2025-07-12', 'Psicologia', 'Sessão de escuta ativa realizada.', NULL, 4),
('2025-07-15', 'Serviço Social', 'Encaminhamento para benefícios sociais.', NULL, 5);

-- Crianças/Adolescentes
INSERT INTO Crianca_Adolescente (nome_completo, data_nascimento, sexo, cpf, escola, situacao_familiar, id_atendimento) VALUES
('Lucas Silva', '2010-05-20', 'M', '111.222.333-44', 'Escola A', 'Com os pais', 1),
('Julia Santos', '2012-09-15', 'F', '555.666.777-88', 'Escola B', 'Com avó materna', 2),
('Mateus Rocha', '2009-03-10', 'M', '222.333.444-55', 'Escola C', 'Em abrigo', 3),
('Amanda Lima', '2011-12-05', 'F', '888.999.000-11', 'Escola D', 'Com mãe', 4),
('Rafael Costa', '2013-08-25', 'M', '333.444.555-66', 'Escola E', 'Com pai', 5);

-- Responsáveis Legais
INSERT INTO Responsavel_Legal (nome, grau_parentesco, telefone, endereco, id_crianca) VALUES
('Paulo Silva', 'Pai', '(11) 91234-5678', 'Rua das Flores, 123', 1),
('Claudia Santos', 'Avó', '(11) 99876-5432', 'Av. Brasil, 456', 2),
('Direção do Abrigo Esperança', 'Institucional', '(11) 90000-1111', 'Rua da Esperança, 100', 3),
('Maria Lima', 'Mãe', '(11) 93333-4444', 'Rua Nova, 321', 4),
('Carlos Costa', 'Pai', '(11) 95555-6666', 'Alameda Central, 88', 5);

select * from Crianca_Adolescente;
select * from Usuario;
select * from Crianca_Adoles