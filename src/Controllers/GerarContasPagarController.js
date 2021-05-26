const axios=require('axios');
const db=require('../models/Database');
const COntaPagar=require("../models/ContaPagar");
module.exports={
    async gravar(request,response) {
        const {total,des_dtEntrada,td_cod,qtdeParc} = request.body;
        const con = await db.conecta();
        let despesa=new Despesa(0,des_dtEntrada,total,await new TipoDespesa().procurarCod(td_cod,db));
        let date=new Date();
        if(qtdeParc==1){
          despesa.addContaPagar(new ContaPagar(1,servico.getTotal(),date));
        }else{

        }
        await despesa.gravar(db);
        return response.json(despesa);
    },
    async alterar(request,response) {
      const {des_cod,des_dtEntrada,td_cod} = request.body;
      const con = await db.conecta();
      let despesa=new Despesa(0,des_dtEntrada,await new TipoDespesa().procurarCod(td_cod,db),
                              );
      await despesa.alterar(db);
      return response.json(despesa);
    },
    async procurarCod(request,response){
      const {cod} = request.params;
      const con = await db.conecta();
      const despesa=await new Despesa().procurarCod(cod,db);
      return response.json(despesa);
    },
    async excluir(request,response){
      const {cod} = request.params;
      const con = await db.conecta();
      let despesa=await new Despesa().procurarCod(cod,db);
      await despesa.excluir(db);
      return response.json(despesa);
    },
}