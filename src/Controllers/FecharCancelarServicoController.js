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
                
                for(let i=1;i<=qtde_parcelas;i++){
                    let date2 = new Date(date);
                    let v=parseFloat((parseFloat(servico.getTotal()/qtde_parcelas).toFixed(1))).toFixed(2);
                    servico.addContaReceber(new ContaReceber(i,v,date2));
                    date.setDate(date.getDate()+30);
                }
            }
            
            for(let i=0;i<qtde_parcelas;i++)
                await servico.getContas()[i].gravar(ser_cod,db);
        }
        return response.json(servico);
    },
    async cancelar(request,response) {
 
        const {ser_cod} = request.body;
        console.log(ser_cod);
        let date = new Date();
        const con = await db.conecta();
        let servico = await new Servico().procurarCod(ser_cod,db);
        let i=0;
        while(i<servico.getContas().length && servico.getContas()[i].getDtPgto()==null)
            i++;
        if(i===servico.getContas().length){
            //console.log(servico.getFuncionario().getStatus());
            if(servico.getFuncionario()!==null && servico.getFuncionario().getStatus()==0)
                servico.setFuncionario(null);
            console.log(servico.getCarro());
            if(servico.getCarro()!==null && servico.getCarro().getStatus()==0){
          
                servico.setCarro(null);
            }
            for(let j=0;j<servico.getContas().length;j++){
                servico.getContas()[j].deletarContaServico(ser_cod,db);
            }
            servico.setFim(null);
            await servico.alterar(db);
        
        }
        
      
        return response.json(servico);
    },
    
    
  
}