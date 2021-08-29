
const db = require('../models/Database');
const ContaReceber = require('../models/ContaReceber');
const Servico = require('../models/Servico');
const ObservadorDAO=require('../DAOs/ObservadorDAO');
module.exports={
    async cancelar(request,response) {
 
        const {ser_cod} = request.body;
        console.log(ser_cod);
        let date = new Date();
        const con = await db.conecta();
        //procuro o serviço
        let servico = await new Servico().procurarCod(ser_cod,db);
        let i=0;
        //verico se as contas estão com o dia de pagamento do cliente como null
        while(i<servico.getContas().length && servico.getContas()[i].getDtPgto()==null)
            i++;
        if(i===servico.getContas().length){//o cliente não pagou nenhuma conta
            //vejo se o status do funcionario do serviço é false, pois isso significa que ele foi excluido
            if(servico.getFuncionario()!==null && servico.getFuncionario().getStatus()==0)
                servico.setFuncionario(null);//se foi excluido coloco o funcionario como null
            //vejo se o carro tem status false, significa que ele foi excluido
            if(servico.getCarro()!==null && servico.getCarro().getStatus()==0){
                servico.setCarro(null);//foi excluido, então precisa colocar null
            }
            //excluo todas as contas a receber do serviço
            for(let j=0;j<servico.getContas().length;j++){
                servico.getContas()[j].deletarContaServico(ser_cod,db);
            }
            servico.setFim(null);//coloco que o serviço não terminou, assim a data é null
            await servico.alterar(db);
            await servico.adicionar(servico.getCliente(),db);
        }
        
      
        return response.json(servico);
    },
}