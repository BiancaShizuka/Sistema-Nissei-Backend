const axios = require('axios');
const db = require('../models/Database');
const ContaReceber = require('../models/ContaReceber');

module.exports={
    
    async alterar(request,response) {
 
        const {con_cod,ser_cod,con_dtPgto} = request.body;

        const con = await db.conecta();

        const c = await new ContaReceber().getConta(con_cod,ser_cod,db);
        c.setDtPgto(con_dtPgto);
        c.alterar(ser_cod,db); 
        
        return response.json(c);
    },
    
    async alterarValor(request,response) {
 
        const {con_cod,ser_cod,con_valor} = request.body;

        const con = await db.conecta();

        const c = await new ContaReceber().getConta(con_cod,ser_cod,db);
        c.setValor(con_valor);
        c.alterarValor(ser_cod,db);
        
        return response.json(c);
    },


    async listarContasFiltro(request,response) {
 
        const dtInicio = request.query["dt_inicio"];
        const dtFim = request.query["dt_fim"];
        const status = request.query["status"];
        const cliente = request.query["cliente"];

        const con = await db.conecta();

        const contas = await new ContaReceber().listarContasFiltro(dtInicio,dtFim,status,cliente,db);
        return response.json(contas);
    },
    
  
}