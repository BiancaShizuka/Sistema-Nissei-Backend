const axios = require('axios');
const db = require('../models/Database');
const ContaReceber = require('../models/ContaReceber');
const Servico = require('../models/Servico');
module.exports={
    async alterar(request,response) {
 
        const {con_cod,ser_cod,con_dtPgto} = request.body;

        const con = await db.conecta();
        //procuro o serviço que dentro tem uma lista das contas a receber
        const servico=await new Servico().procurarCod(ser_cod,db);
        let i=0;
        //procuro a conta, na lista de contas do serviço, que tem o código con_cod
        while(i<servico.getContas().length && servico.getContas()[i].getCod()!==con_cod)
            i++;
        //coloco o dia que o cliente pagou
        servico.getContas()[i].setDtPgto(con_dtPgto);
        servico.getContas()[i].alterar(ser_cod,db);
        
   
        
        return response.json(servico.getContas()[i]);
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