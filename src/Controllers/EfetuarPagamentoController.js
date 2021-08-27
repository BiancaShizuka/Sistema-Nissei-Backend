const axios=require('axios');
const db=require('../models/Database');
const Despesa=require('../models/Despesa');
const ContaPagar=require('../models/ContaPagar');
module.exports={
    async alterar(request,response) {
        const {des_cod,con_cod,con_dtPgto} = request.body;
        const con = await db.conecta();
        let despesa=await new Despesa().procurarCod(des_cod,db);
        let i=0;
        while(i<despesa.getContas().lenght && despesa.getContas()[i].getCon_cod()!=con_cod)
          i=i+1;
        despesa.getContas()[i].setDt_pgto(con_dtPgto);
        despesa.getContas()[i].alterar(des_cod,db)
        return response.json(contapagar);
    },
    async procurarCod(request,response){
      const {cod} = request.params;
      const con = await db.conecta();
      const despesa=await new Despesa().procurarCod(cod,db);
      return response.json(despesa);
    },
    async listarContasFiltro(request,response){
      const td_cod = request.query["td_cod"];
      const dtFim = request.query["dtFim"];
      const dtInicio = request.query["dtInicio"];

      const con = await db.conecta();

      const contas = await new ContaPagar().listarContasFiltro(td_cod,dtInicio,dtFim,db);
     
      return response.json(contas);
   }
    
}
