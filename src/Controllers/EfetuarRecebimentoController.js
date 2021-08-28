const axios = require('axios');
const db = require('../models/Database');
const ContaReceber = require('../models/ContaReceber');
const Servico = require('../models/Servico');
const BaixaConta = require('./BaixaConta');
module.exports=class EfetuarRecebimentoController extends BaixaConta{
    async procurarCod(cod,db){
        const result=await new Servico().procurarCod(cod,db);
        return result;
    }
    async alterar(request,response) {
 
        const {con_cod,ser_cod,con_dtPgto} = request.body;
        const resp=await super.gravar(ser_cod,con_cod,con_dtPgto,true);
        return response.json(resp);
    }
    
    async listarContasFiltro(request,response) {
 
        const dtInicio = request.query["dt_inicio"];
        const dtFim = request.query["dt_fim"];
        const status = request.query["status"];
        const cliente = request.query["cliente"];

        const con = await db.conecta();

        const contas = await new ContaReceber().listarContasFiltro(dtInicio,dtFim,status,cliente,db);
        return response.json(contas);
    }
    
  
}