#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE demo;
	\c demo;
		CREATE TABLE todos (
  		todo_id SERIAL PRIMARY KEY, 
  		description VARCHAR(255)
	);
EOSQL