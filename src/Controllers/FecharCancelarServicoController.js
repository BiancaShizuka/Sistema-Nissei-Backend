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
        servico.setFim(date);
        servico.setStatus(false);
        await servico.alterar(db);
        if(qtde_parcelas===1){
            servico.addContaReceber(new ContaReceber(1,servico.getCod(),servico.getTotal(),date));
           
        }
        else{
            
            for(let i=1;i<=qtde_parcelas;i++){
                date.setDate(date.getDate()+30);
                let date2 = new Date(date);
            
                servico.addContaReceber(new ContaReceber(i,servico.getCod(),servico.getTotal()/qtde_parcelas,date2));
    
            }
        }
        
        for(let i=1;i<=qtde_parcelas;i++)
            await servico.getContas()[i-1].gravar(db);
        return response.json(servico);
    },
    async cancelar(request,response) {
 
        const {ser_cod} = request.body;
        console.log(ser_cod);
        let date = new Date();
        const con = await db.conecta();
        let servico = await new Servico().procurarCod(ser_cod,db);
        servico.setFim(null);
        servico.setStatus(false);
        await servico.alterar(db);
        if(qtde_parcelas===1){
            servico.addContaReceber(new ContaReceber(1,servico.getCod(),servico.getTotal(),date));
           
        }
        else{
            
            for(let i=1;i<=qtde_parcelas;i++){
                let date2 = date.setDate(date.getDate()+30);
                console.log("date2: "+date2);
                servico.addContaReceber(new ContaReceber(i,servico.getCod(),servico.getTotal()/qtde_parcelas,date2));
    
            }
        }
        
        for(let i=1;i<=qtde_parcelas;i++)
            await servico.getContas()[i-1].gravar(db);
        return response.json(servico);
    },
    
    
  
}