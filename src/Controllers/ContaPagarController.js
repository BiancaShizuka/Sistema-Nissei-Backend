const axios=require('axios');
const db=require('../models/Database');
module.exports={
    async gravar(request,response) {
        const {des_cod,con_valor,con_dtVencimento,con_dtPgto} = request.body;
        const con = await db.conecta();
        let contapagar=new Despesa(0,await new TipoDespesa().procurarCod(td_cod,db),con_valor,con_dtVencimento,con_dtPgto
                                );
        await contapagar.gravar(db);
        return response.json(contapagar);
    },
    async alterar(request,response) {
      const {con_cod,des_cod,con_valor,con_dtVencimento,con_dtPgto} = request.body;
      const con = await db.conecta();
      let contapagar=new Despesa(0,await new TipoDespesa().procurarCod(td_cod,db),con_valor,con_dtVencimento,con_dtPgto
                              );
      await contapagar.alterar(db);
      return response.json(contapagar);
    },
    async excluir(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        let contapagar=await new TipoDespesa().procurarCod(cod,db);
        await contapagar.excluir(db);
        return response.json(contapagar);
    },
    async procurarCod(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const contapagar=await new TipoDespesa().procurarCod(cod,db);
        return response.json(contapagar);
      },
}
