const axios=require('axios');
const db=require('../models/Database');
const ContaPagar=require("../models/ContaPagar");
const Despesa=require("../models/Despesa");
module.exports={
    async gravar(request,response) {
        const {total,des_dtEntrada,td_cod,qtdeParc} = request.body;
        const con = await db.conecta();
        let despesa=new Despesa(0,des_dtEntrada,total,await new TipoDespesa().procurarCod(td_cod,db));
        let date=new Date();
        if(qtdeParc==1){
          despesa.addContaPagar(new ContaPagar(1,despesa.getTotal(),date,null));
        }else{
          for(let i=1;i<=qtdeParc-1;i++){
            let date2 = new Date(date);
            let v=parseFloat(despesa.getTotal()/qtdeParc).toFixed(2);
            despesa.addContaPagar(new ContaPagar(i,v,date2,null));
            date.setDate(date.getDate()+30);
          }
          let auxv=despesa.getTotal()-parseFloat(despesa.getTotal()/qtdeParc).toFixed(2)*(qtdeParc-1);
          despesa.addContaPagar(new ContaPagar(qtdeParc,auxv,date,null));
        }
        await despesa.gravar(db);
        for(let i=0;i<despesa.getContasPagar().length;i++){
            await despesa.getContasPagar()[i].gravar(despesa.getCod(),db);
        }
        return response.json(despesa);
    },
    async procurarCod(request,response){
      const {cod} = request.params;
      const con = await db.conecta();
      const despesa=await new Despesa().procurarCod(cod,db);
      return response.json(despesa);
    }
}