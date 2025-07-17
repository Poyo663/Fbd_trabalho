import os
from dotenv import load_dotenv

import psycopg2 as pg

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")

PAGE_SIZE: int = os.getenv("PAGE_SIZE")

connection = pg.connect(host=DB_HOST, dbname=DB_NAME, user=DB_USER, password=DB_PASS)
# url = f'postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}/{DB_NAME}'

# def fetchAllFromDB():
#     cursor = connection.cursor()
#     cursor.execute("select * from pessoa")
#     rows = cursor.fetchall()
#     for i in rows:
#         print(i)
#     cursor.close()
#
# def insertIntoDB(name, cpf, sex, birthday, salary):
#     cursor = connection.cursor()
#     cursor.execute(f'insert into pessoa values(2, \'{name}\', \'{cpf}\', \'{sex}\', to_date(\'{birthday}\', \'DD/MM/YYYY\'), {salary})')
#     connection.commit()
#     cursor.close()


def getCriacas(page=1):
    try:
        offset = PAGE_SIZE * page
        cursor = connection.cursor()
        cursor.execute(
            f"select * from CriacaAdolescente limit {PAGE_SIZE} offset {offset}"
        )
        print(cursor.fetchall())
        cursor.close()
    except:
        # placeholder
        print("nao foi possivel fazer a query")


getCriacas()

connection.close()
