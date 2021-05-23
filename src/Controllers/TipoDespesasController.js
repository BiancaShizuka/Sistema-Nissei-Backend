const axios=require('axios');
const db=require('../models/Database');
module.exports={
    async gravar(request,response) {
        const {dt_nome} = request.body;
        const con = await db.conecta();
        let tipodespesa=new Despesa(0,dt_nome);
        await tipodespesa.gravar(db);
        return response.json(despesa);
    },
    async alterar(request,response) {
      const {dt_cod,td_nome} = request.body;
      const con = await db.conecta();
      let tipodespesa=new Despesa(dt_cod,dt_nome);
      await tipodespesa.alterar(db);
      return response.json(tipodespesa);
    },
    async procurarDespesa(request,response){
      const {cod} = request.params;
      const con = await db.conecta();
      const tipodespesa=await new TipoDespesa().procurarCod(cod,db);
      return response.json(tipodespesa);
    },
    async excluir(request,response){
      const {cod} = request.params;
      const con = await db.conecta();
      let tipodespesa=await new TipoDespesa().procurarCod(cod,db);
      await tipodespesa.excluir(db);
      return response.json(tipodespesa);
    },
}