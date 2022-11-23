/*MARK: Implementar um codigo Javascript que execute as seguintes features:
1) Criar um Banco de Dados com o nome BD_SCA.db;
2) Criar as tabelas TB_ALUNO,  TB_DISCIPLINA, TB_PROFESSOR, TB_MATRICULA;
3) Criar comandos SQL para inserir dados nessas tabelas. */

//CREATING A NEW DATABASE
var sqlite3 = require('sqlite3').verbose();
var data = new sqlite3.Database("SCA_BD.db");

//CREATING NEW TABLES
data.run(`CREATE TABLE if not exists TB_ALUNO (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    birth TEXT NOT NULL,
   PRIMARY KEY ("id" AUTOINCREMENT)
)`);

data.run(`CREATE TABLE if not exists TB_DISCIPLINA (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    PRIMARY KEY ("id" AUTOINCREMENT)
 )`);

data.run(`CREATE TABLE if not exists TB_PROFESSOR (
   id INTEGER NOT NULL,
   name TEXT NOT NULL,
   birth TEXT NOT NULL,
   PRIMARY KEY ("id" AUTOINCREMENT)
)`);

data.run(`CREATE TABLE if not exists TB_MATRICULA (
   id INTEGER NOT NULL,
   aluno_id INTEGER NOT NULL,
   disciplina_id INTEGER NOT NULL,
   professor_id INTEGER NOT NULL,
   PRIMARY KEY ("id" AUTOINCREMENT)
   FOREIGN KEY ("aluno_id") REFERENCES "TB_ALUNO"("id"),
   FOREIGN KEY ("disciplina_id") REFERENCES "TB_DISCIPLINA"("id"),
   FOREIGN KEY ("professor_id") REFERENCES "TB_PROFESSOR"("id")
)`);

data.run(`CREATE TABLE if not exists TB_PROFESSOR_DISCIPLINA (
    id INTEGER NOT NULL,
    disciplina_id INTEGER NOT NULL,
    professor_id INTEGER NOT NULL,
    PRIMARY KEY ("id" AUTOINCREMENT)
    FOREIGN KEY ("disciplina_id") REFERENCES "TB_DISCIPLINA"("id"),
    FOREIGN KEY ("professor_id") REFERENCES "TB_PROFESSOR"("id")
)`);

//INSERTING NEW DATA INTO TABLES
data.run("INSERT INTO TB_ALUNO (name, birth) VALUES ('Regianne', '12/10'), ('Bianca', '03/04'), ('Rodrigo', '09/12'), ('Fernando', '13/11')");
data.run("INSERT INTO TB_DISCIPLINA (name) VALUES ('Banco de Dados'), ('Redes de Computadores'), ('Métodos e Ferramentas de Desenvolvimento de Software'), ('Programação de Dispositivos Móveis')");
data.run("INSERT INTO TB_PROFESSOR (name, birth) VALUES ('Taveira', '14/09'), ('Wendell', '29/05'), ('Serra', '20/12'), ('Hairon', '09/11')");
data.run("INSERT INTO TB_MATRICULA (aluno_id, disciplina_id, professor_id) VALUES (1, 1, 1), (2, 2, 2), (3, 3, 3), (3, 3, 3), (4, 4, 4)");
data.run("INSERT INTO TB_PROFESSOR_DISCIPLINA (disciplina_id, professor_id) VALUES (1, 1), (2, 2), (3, 2), (3, 3)");

//QUERYING THE DATABASE
data.each("SELECT TB_MATRICULA.id AS matricula_id, TB_ALUNO.name AS aluno_name, TB_PROFESSOR.name AS professor_name, TB_DISCIPLINA.name AS disciplina_name FROM TB_ALUNO, TB_PROFESSOR, TB_DISCIPLINA INNER JOIN TB_MATRICULA ON TB_ALUNO.id = TB_MATRICULA.aluno_id AND TB_DISCIPLINA.id = TB_MATRICULA.disciplina_id AND TB_PROFESSOR.id = TB_MATRICULA.professor_id", function(err, row) {
  console.log(row.matricula_id + ": (" + row.aluno_name + ", " + row.disciplina_name + ", " + row.professor_name + ")");
});

data.each("SELECT TB_PROFESSOR_DISCIPLINA.id AS profsd_id, TB_PROFESSOR.name AS professor_name, TB_DISCIPLINA.name AS disciplina_name FROM TB_PROFESSOR, TB_DISCIPLINA INNER JOIN TB_PROFESSOR_DISCIPLINA ON TB_PROFESSOR.id = TB_PROFESSOR_DISCIPLINA.professor_id AND TB_DISCIPLINA.id = TB_PROFESSOR_DISCIPLINA.disciplina_id", function(err, row) {
  console.log(row.profsd_id + ": (" + row.professor_name + ", " + row.disciplina_name + ")");
});

data.close();