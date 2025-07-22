import os
from dotenv import load_dotenv

import psycopg2 as pg

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")

PAGE_SIZE = int(os.getenv("PAGE_SIZE"))

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

# def insertAgendamento():


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

@app.route("/api/agendamentos", methods = ['POST'])
@cross_origin()
def agendamento_post():
    print(request.get_json())
    return "Ok", 201

if __name__ == "__main__":
    app.run(port=3001, debug=True)

connection.close()
