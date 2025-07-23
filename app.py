import os
from dotenv import load_dotenv

import psycopg2 as pg

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")

PAGE_SIZE = 8

connection = pg.connect(host=DB_HOST, dbname=DB_NAME, user=DB_USER, password=DB_PASS)


def getCriacas(page=0):
    try:
        offset = PAGE_SIZE * page
        cursor = connection.cursor()
        cursor.execute(
            f"select * from Crianca_Adolescente order by id_crianca limit {PAGE_SIZE} offset {offset};"
        )

        output = cursor.fetchall()
        cursor.close()
        return output

    except:
        # placeholder
        print("nao foi possivel fazer a query")
        return []

def deleteCrianca(nome):
    try:
        cursor = connection.cursor()
        cursor.execute(
                f"delete from Crianca_Adolescente where nome_completo = '{nome}';"
        )

        connection.commit()
        cursor.close()

    except:
        connection.rollback()


def addCrianca(nome, nascimento, sexo, cpf, escola, situacao, atendimento=None):
    try:
        cursor = connection.cursor()
        cursor.execute(
            f"insert into Crianca_Adolescente (nome_completo, data_nascimento, sexo, cpf, escola, situacao_familiar, id_atendimento) values('{nome}', '{nascimento}', '{sexo}', '{cpf}', '{escola}', '{situacao}', null);"
        )
        connection.commit()
        cursor.close()
    except:
        connection.rollback()


def getCriancaPorNome(nome):
    try:
        cursor = connection.cursor()
        cursor.execute(
            f"select * from Crianca_Adolescente where nome_completo like '%{nome}%';"
        )

        output = cursor.fetchall()
        cursor.close()
        return output

    except:
        # placeholder
        print("nao foi possivel fazer a query")
        return []


def getAgendamentos(page=0):
    try:
        offset = PAGE_SIZE * page
        cursor = connection.cursor()
        cursor.execute(
            f"select * from Atendimento order by id_atendimento limit {PAGE_SIZE} offset {offset};"
        )

        output = cursor.fetchall()
        cursor.close()
        return output

    except:
        # placeholder
        print("nao foi possivel fazer a query")
        return []

def addAgendamento(data, setor, resumo):
    try:
        print(data)
        cursor = connection.cursor()
        cursor.execute(
            f"insert into Atendimento (data, setor, resumo_situacao, id_crianca, id_profissional) values(to_date('{data}', 'YYYY-MM-DD'), '{setor}', '{resumo}', null, null);"
        )
        connection.commit()
        cursor.close()
    except:
        connection.rollback()


def getProfissionais(page=0):
    try:
        offset = PAGE_SIZE * page
        cursor = connection.cursor()
        cursor.execute(
            f"select nome_completo, setor from Profissional order by id_profissional limit {PAGE_SIZE} offset {offset};"
        )

        output = cursor.fetchall()
        cursor.close()
        return output

    except:
        # placeholder
        print("nao foi possivel fazer a query")
        return []

def addProfissional(nome, genero, cpf, setor):
    try:
        cursor = connection.cursor()
        cursor.execute(
            f"insert into Profissional (nome_completo, genero, cpf, setor, id_atendimento, id_usuario) values('{nome}', '{genero}', '{cpf}', '{setor}', null, null);"
        )
        connection.commit()
        cursor.close()
    except:
        connection.rollback()

def getProfissionalPorNome(nome):
    try:
        cursor = connection.cursor()
        cursor.execute(
            f"select * from Profissional where nome_completo like '%{nome}%';"
        )

        output = cursor.fetchall()
        cursor.close()
        return output

    except:
        # placeholder
        print("nao foi possivel fazer a query")
        return []

def deleteProfissional(nome):
    try:
        cursor = connection.cursor()
        cursor.execute(
                f"delete from Profissional where nome_completo = '{nome}';"
        )

        connection.commit()
        cursor.close()

    except:
        connection.rollback()

from flask import Flask, json, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)

cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/api/criancas")
@cross_origin()
def criancas_first_page():
    return json.dumps(getCriacas())


@app.route("/api/criancas/<page>")
@cross_origin()
def criancas(page):
    data = getCriacas(int(page))
    return json.dumps(data)


@app.route("/api/criancas/buscar/<nome>")
@cross_origin()
def criancas_buscar(nome):
    return json.dumps(getCriancaPorNome(nome))

@app.route("/api/criancas/remove/<nome>")
@cross_origin()
def criancas_deletar(nome):
    deleteCrianca(nome)
    return "Ok", 200

@app.route("/api/criancas", methods=["POST"])
@cross_origin()
def criancas_post():
    body = request.get_json()
    print(body)
    addCrianca(
        body["nome"],
        body["data_nascimento"],
        body["sexo"],
        body["cpf"],
        body["escola"],
        body["situacao"],
    )
    return "Ok", 201


@app.route("/api/agendamentos/<page>")
@cross_origin()
def agendamento_first_page(page):
    data = getAgendamentos(int(page))
    return json.dumps(data)


@app.route("/api/agendamentos")
@cross_origin()
def agendamento():
    data = getAgendamentos()
    return json.dumps(data)


@app.route("/api/agendamentos", methods=["POST"])
@cross_origin()
def agendamento_post():
    body = request.get_json()
    addAgendamento(body['data'], body['setor'], body['resumo'])
    return "Ok", 201

@app.route("/api/profissionais")
@cross_origin()
def profissionais_first_page():
    return json.dumps(getProfissionais())

@app.route("/api/profissionais", methods=["POST"])
@cross_origin()
def profissionais_post():
    body = request.get_json()
    addProfissional(body['nome'], body['genero'], body['cpf'], body['setor'])
    return "Ok", 201

@app.route("/api/profissionais/buscar/<nome>")
@cross_origin()
def profissionais_buscar(nome):
    return json.dumps(getProfissionalPorNome(nome))

@app.route("/api/profissionais/remove/<nome>")
@cross_origin()
def profissionais_deletar(nome):
    deleteProfissional(nome)
    return "Ok", 200


if __name__ == "__main__":
    app.run(port=3001, debug=True)

connection.close()
