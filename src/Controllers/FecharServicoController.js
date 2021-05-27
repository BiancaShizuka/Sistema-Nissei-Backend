const axios = require('axios');
const db = require('../models/Database');
const ContaReceber = require('../models/ContaReceber');
const Servico = require('../models/Servico')
module.exports={
    async fechar(request,response) {
 
        const {ser_cod,qtde_parcelas} = request.body;
        console.log(ser_cod);
        let date = new Date();
        const con = await db.conecta();
        let servico = await new Servico().procurarCod(ser_cod,db);
        if(qtde_parcelas<=3 && qtde_parcelas>=1){
            
            servico.setFim(date);
            await servico.alterar(db);
        
            if(qtde_parcelas===1){
                servico.addContaReceber(new ContaReceber(1,servico.getTotal(),date));
            
            }
            else{
                
                for(let i=1;i<=qtde_parcelas-1;i++){
                    let date2 = new Date(date);
                    let v=parseFloat(servico.getTotal()/qtde_parcelas).toFixed(2);
                    servico.addContaReceber(new ContaReceber(i,v,date2));
                    date.setDate(date.getDate()+30);
                }
                let auxv=servico.getTotal()-parseFloat(servico.getTotal()/qtde_parcelas).toFixed(2)*(qtde_parcelas-1);
                servico.addContaReceber(new ContaReceber(qtde_parcelas,auxv,date));
            }
            
            for(let i=0;i<qtde_parcelas;i++)
                await servico.getContas()[i].gravar(ser_cod,db);
        }
        return response.json(servico);
    },
    
    
    
  
}