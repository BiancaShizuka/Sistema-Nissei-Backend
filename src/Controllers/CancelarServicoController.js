
const db = require('../models/Database');
const ContaReceber = require('../models/ContaReceber');
const Servico = require('../models/Servico')
module.exports={
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