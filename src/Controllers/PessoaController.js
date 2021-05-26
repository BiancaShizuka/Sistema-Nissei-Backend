const axios = require('axios');
//const mysql = require('mysql2/promise');
const db = require('../models/Database');
module.exports={
    async gravar(request,response) {
 
        const {pes_nome,pes_cpf,pes_sexo,pes_email} = request.body;
       
        //verificar se o professor ja esta cadastrado
        const con = await db.conecta();
        const sql = "INSERT INTO Pessoa (pes_nome,pes_cpf, pes_sexo,pes_email) VALUES (?, ?, ?, ?)";
        
        const valor = [pes_nome,pes_cpf, pes_sexo,pes_email];
        const result = await db.manipula(sql,valor);
        
        return response.json(result);
    },
    async alterar(request,response){
        const {pes_nome,pes_cpf,pes_sexo,pes_email} = request.body;
    
      
        const con = await db.conecta();
        const sql = "UPDATE Pessoa SET pes_nome = ?, "+
                    "pes_sexo = ?, pes_email = ? "+
                    "WHERE pes_cpf = ?";
        
        const valor = [pes_nome,pes_sexo,pes_email,pes_cpf];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async procurarCPF(request,response){
        const {cpf} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM Pessoa WHERE pes_cpf=?";
        
        const valor = [cpf];
        const result = await db.consulta(sql,valor);

        return response.json(result.data);
    },
    async procurarEmail(request,response){
        const {email} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM Pessoa WHERE pes_email=?";
        
        const valor = [email];
        const result = await db.consulta(sql,valor);

        return response.json(result.data);
    },
    async listarCliente(request,response){
        const con = await db.conecta();
        const sql = "SELECT * FROM Pessoa,Cliente WHERE Pessoa.pes_cod=Cliente.pes_cod AND Cliente.cli_status=true";
        const users = await db.consulta(sql);
        return response.json(users.data);
    },
    async listarClientePorFiltro(request,response){
        const filtro = request.params.filtro;
        const con = await db.conecta();
        const sql = "SELECT * FROM Pessoa,Cliente WHERE Pessoa.pes_cod=Cliente.pes_cod AND UPPER(Pessoa.pes_nome) like UPPER(?) AND Cliente.cli_status=true";
        const valor = ["%"+filtro+"%"];
        const users = await db.consulta(sql,valor);
        return response.json(users.data);
    },
    async listarFuncionario(request,response){
        const con = await db.conecta();
        const sql = "SELECT * FROM Pessoa,Funcionario WHERE Pessoa.pes_cod=Funcionario.pes_cod  AND Funcionario.fun_status=true";
        const users = await db.consulta(sql);
        return response.json(users.data);
    },
    async listarFuncionarioPorFiltro(request,response){
        const filtro = request.params.filtro;
        const con = await db.conecta();
        const sql = "SELECT * FROM Pessoa,Funcionario WHERE Pessoa.pes_cod=Funcionario.pes_cod  AND UPPER(Pessoa.pes_nome) like UPPER(?) AND Funcionario.fun_status=true";
        const valor = ["%"+filtro+"%"];
        const users = await db.consulta(sql,valor);
        return response.json(users.data);
    },
    async procurarCod(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM Pessoa WHERE pes_cod=?";
        
        const valor = [cod];
        const result = await db.consulta(sql,valor);

        return response.json(result.data);
    },
    async validarEmail(request,response){
        const {email} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM Pessoa,Funcionario WHERE Pessoa.pes_cod=Funcionario.pes_cod and pes_email=?";
        
        const valor = [email];
        const result = await db.consulta(sql,valor);

        return response.json(result.data);
    }
}