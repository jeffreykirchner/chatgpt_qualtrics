echo "Dump Database"
pg_dump --host=localhost --port=5432 --username=dbadmin --dbname=chatgpt_qualtrics --file=database_dumps/chatgpt_qualtrics.sql -v -Fc