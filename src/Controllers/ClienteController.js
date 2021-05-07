const axios = require('axios');
//const mysql = require('mysql2/promise');
const db = require('../models/Database');
const Cliente=require('../models/Cliente');
module.exports={
    async gravar(request,response) {
 
        const {pes_cod,cli_bairro,cli_rua,cli_cidade,cli_uf,cli_cep} = request.body;
       
        //verificar se o professor ja esta cadastrado
        const con = await db.conecta();
        const sql = "INSERT INTO Cliente (pes_cod,cli_bairro,cli_rua,cli_cidade,cli_uf,cli_cep,cli_status) VALUES (?, ?, ?, ?, ?, ?,true)";
        
        const valor = [pes_cod,cli_bairro,cli_rua,cli_cidade,cli_uf,cli_cep];
        const result = await db.manipula(sql,valor);
        
        return response.json(result);
    },
    async alterar(request,response){
        const {pes_cod,cli_bairro,cli_rua,cli_cidade,cli_uf,cli_cep} = request.body;
        
      
        const con = await db.conecta();
        const sql = "UPDATE Cliente SET cli_bairro = ?,cli_rua=?, "+
                    "cli_cidade=?,cli_uf=?,cli_cep=? "+
                    "WHERE pes_cod = ?";
        
        const valor = [cli_bairro,cli_rua,cli_cidade,cli_uf,cli_cep,pes_cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async procurarCliente(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const clientes=await new Cliente().procurarCod(cod,db);
        return response.json(clientes);
    },
    async listar(request,response){
        const con = await db.conecta();
        const sql = "SELECT * FROM Cliente where cli_status=true";
        const users = await db.consulta(sql);
        return response.json(users.data);
    },
    async deletar(request,response){
        const cod = request.params.cod;
        const con = await db.conecta();
        const valor = [cod];
        const sql3 = "DELETE FROM contato WHERE pes_cod=?";
        var result = await db.manipula(sql3,valor);
       
        const sql = "DELETE FROM Cliente WHERE pes_cod=?";
        
        
        result = await db.manipula(sql,valor);
      
        const sql2 = "DELETE FROM Pessoa WHERE pes_cod=?";
        result = await db.manipula(sql2,valor);
       
        return response.json(result);
    },
    async deletarLogico(request,response){
        const cod = request.params.cod;
        const con = await db.conecta();
        const sql = "UPDATE Cliente SET cli_status = ? "+
                    "WHERE pes_cod = ?";
        
        const valor = [false,cod];
        const result = await db.consulta(sql,valor);
        return response.json(result.data);
    }
}