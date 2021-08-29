
const axios = require('axios');
const db = require('../models/Database');
const ContaReceber = require('../models/ContaReceber');
const Servico = require('../models/Servico')
const Strategy=require('./Strategy')

module.exports={
    
    async fechar(request,response) {
 
        const {ser_cod,qtde_parcelas} = request.body;
        console.log(ser_cod);
        let date = new Date();
        const con = await db.conecta();
        //procura o serviço
        let servico = await new Servico().procurarCod(ser_cod,db);
        if(qtde_parcelas<=3 && qtde_parcelas>=1){
            //coloca a data que o serviço terminou
            servico.setFim(date);
            await servico.alterar(db);


            str=new Strategy()
            str.gerarParcelas(servico,qtde_parcelas,date,db);
            servico.notificar(db);

            /*
            if(qtde_parcelas===1){// a vista
                //se for a vista só adiciono uma conta que tem o valor total do serviço e o dia do vencimento
                servico.addContaReceber(new ContaReceber(1,servico.getTotal(),date));
            
            }
            else{//mais de uma parcela
                //vou adicionando as contas no serviço
                for(let i=1;i<=qtde_parcelas-1;i++){
                    let date2 = new Date(date);
                    let v=parseFloat(servico.getTotal()/qtde_parcelas).toFixed(2);
                    servico.addContaReceber(new ContaReceber(i,v,date2));
                    date.setDate(date.getDate()+30);
                }
                let auxv=servico.getTotal()-parseFloat(servico.getTotal()/qtde_parcelas).toFixed(2)*(qtde_parcelas-1);
                servico.addContaReceber(new ContaReceber(qtde_parcelas,auxv,date));
            }
            //mando gravar as contas uma por uma
            for(let i=0;i<qtde_parcelas;i++)
                await servico.getContas()[i].gravar(ser_cod,db);*/
        }
        return response.json(servico);
    },
    
    
    
  
}