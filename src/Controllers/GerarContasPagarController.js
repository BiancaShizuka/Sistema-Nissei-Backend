const axios=require('axios');
const db=require('../models/Database');
const ContaPagar=require("../models/ContaPagar");
const Despesa=require("../models/Despesa");
const TipoDespesa=require('../models/TipoDespesas');
module.exports={
    async gravar(request,response) {
        const {total,des_dtEntrada,td_cod,qtdeParc} = request.body;
       
        const con = await db.conecta();
        let despesa=new Despesa(0,des_dtEntrada,total,await new TipoDespesa().procurarCod(td_cod,db));
        let date=new Date();
        //Ve se a quantidade de parcelas é igual a 1, se for foi pago a vista
        if(qtdeParc==1){
          despesa.addContaPagar(new ContaPagar(1,despesa.getTotal(),date,null));
        }else{
          //Gero a quantidade de parcelas indicada
          for(let i=1;i<=qtdeParc-1;i++){
            let date2 = new Date(date);
            let v=parseFloat(despesa.getTotal()/qtdeParc).toFixed(2);
            despesa.addContaPagar(new ContaPagar(i,v,date2,null));
            date.setDate(date.getDate()+30);
          }
          let auxv=despesa.getTotal()-parseFloat(despesa.getTotal()/qtdeParc).toFixed(2)*(qtdeParc-1);
          despesa.addContaPagar(new ContaPagar(qtdeParc,auxv,date,null));
        }
        
        //Gravo a despesa no banco
        await despesa.gravar(db);
        for(let i=0;i<despesa.getContasPagar().length;i++){//Gravo cada parcela no banco
            await despesa.getContasPagar()[i].gravar(despesa.getCod(),db);
        }
        return response.json(despesa);
    }
}