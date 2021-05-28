const axios = require('axios');
const db = require('../models/Database');
const ContaReceber = require('../models/ContaReceber');
const Servico = require('../models/Servico');
module.exports={
    async alterar(request,response) {
 
        const {con_cod,ser_cod,con_dtPgto} = request.body;

        const con = await db.conecta();
        //procuro o serviço que dentro tem uma lista das contas a receber
        const servico=await new Servico().procurarCod(ser_cod,db);
        let i=0;
        //procuro a conta, na lista de contas do serviço, que tem o código con_cod
        while(i<servico.getContas().length && servico.getContas()[i].getCod()!==con_cod)
            i++;
        //coloco o dia que o cliente pagou
        servico.getContas()[i].setDtPgto(con_dtPgto);
        servico.getContas()[i].alterar(ser_cod,db);
        
   
        
        return response.json(servico.getContas()[i]);
    },
	
	async receberParcial(request,response){

        const{ser_cod,con_cod,con_valor} = request.body;
  
        const con = await db.conecta();
        //buscar o serviço
        let servico = await new Servico().procurarCod(ser_cod,db);
        const date = new Date();
        let c=null;
        let i=0;
        while(i<servico.getContas().length && servico.getContas()[i].getCod()!==con_cod)
            i++;
        //ver se o valor pago é igual ao valor da parcela
        if(servico.getContas()[i].getValor()==con_valor){
            servico.getContas()[i].setDtPgto(date);
            servico.getContas()[i].alterar(ser_cod,db);
        }else{
            servico.getContas()[i].setValor(servico.getContas()[i].getValor()-con_valor);
            //altera o valor da parcela
            await servico.getContas()[i].alterar(ser_cod,db);
            let index = servico.getContas().length;
            c = new ContaReceber(index+1,con_valor,date,date);
            //coloca a conta no serviço
            servico.addContaReceber(c);
            //coloca a conta no banco
            await servico.getContas()[index].gravarPago(ser_cod,db);
        }
        return response.json(c);
    },
    async listarContasFiltro(request,response) {
 
        const dtInicio = request.query["dt_inicio"];
        const dtFim = request.query["dt_fim"];
        const status = request.query["status"];
        const cliente = request.query["cliente"];

        const con = await db.conecta();

        const contas = await new ContaReceber().listarContasFiltro(dtInicio,dtFim,status,cliente,db);
        return response.json(contas);
    },
    
  
}