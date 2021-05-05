const axios = require('axios');
//const mysql = require('mysql2/promise');
const db = require('../models/Database');
module.exports={
    async gravar(request,response) {
 
        const {pes_cod,fun_anoInicio,fun_senha,fun_nivel} = request.body;
        const con = await db.conecta();
        const sql = "INSERT INTO Funcionario (pes_cod,fun_anoInicio,fun_senha,fun_nivel,fun_status) VALUES (?, ?, ?,?,true)";
        
        const valor = [pes_cod,fun_anoInicio,fun_senha,fun_nivel];
        const result = await db.manipula(sql,valor);
        
        return response.json(result);
    },
    async alterar(request,response){
        const {pes_cod,fun_anoInicio,fun_senha,fun_nivel} = request.body;
    
      
        const con = await db.conecta();
        const sql = "UPDATE Funcionario SET fun_anoInicio = ?, fun_senha = ?, fun_nivel=? "+
                    "WHERE pes_cod = ?";
        
        const valor = [fun_anoInicio,fun_senha,fun_nivel,pes_cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async procurarFunc(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM Funcionario WHERE pes_cod=?";
        
        const valor = [cod];
        const result = await db.consulta(sql,valor);

        return response.json(result.data);
    },
    async listar(request,response){
        const con = await db.conecta();
        const sql = "SELECT * FROM Funcionario,Pessoa where Funcionario.pes_cod=Pessoa.pes_cod AND Funcionario.fun_status=true";
        const users = await db.consulta(sql);
        return response.json(users.data);
    },
    async procurarUser(request,response){
        const email=request.params.email;
        const senha=request.params.senha;
        const con = await db.conecta();
        const sql = "SELECT * FROM Pessoa,Funcionario WHERE Pessoa.pes_cod=Funcionario.pes_cod and pes_email=? and fun_senha=? ";
        const valores = [email , senha ];
        const users = await db.consulta(sql,valores);
        return response.json(users.data);
    },
    async deletar(request,response){
        const cod = request.params.cod;
        const con = await db.conecta();
        let valor = [cod];
        let sql="SELECT * from servico where fun_cod=?";
        let result=await db.consulta(sql,valor);
        if(result.data.length>0){
            sql = "UPDATE Funcionario SET fun_status = ? "+
                    "WHERE pes_cod = ?";
        
            valor = [false,cod];
            result = await db.manipula(sql,valor);
            sql = "UPDATE servico SET fun_cod=? "+
                    "WHERE fun_cod = ? and ser_status=true";
        
            valor = [null,cod];
            result = await db.manipula(sql,valor);
        } 
        else{
            sql = "DELETE FROM Funcionario WHERE pes_cod=?";
            result = await db.manipula(sql,valor);
            sql = "DELETE FROM Pessoa WHERE pes_cod=?";
            result = await db.manipula(sql,valor);
        }
        console.log(result);
        return response.json(result);
    }
}