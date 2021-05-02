const axios = require('axios');
const db = require('../models/Database');
const ContaReceber = require('../models/ContaReceber');

module.exports={
    async alterar(request,response) {
 
        const {con_cod,ser_cod,con_dtPgto} = request.body;

        const con = await db.conecta();

        const c = await new ContaReceber().getConta(con_cod,ser_cod,db);
        c.setDtPgto(con_dtPgto);
        c.alterar(db);
        
   
        
        return response.json(c);
    },
    
    async listarContas(request,response) {
 
        const {ser_cod} = request.params;

        const con = await db.conecta();

        const contas = await new ContaReceber().listarContasServico(ser_cod,db);
        
        
   
        
        return response.json(contas);
    },
    
  
}