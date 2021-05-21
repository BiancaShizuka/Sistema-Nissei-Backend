const axios = require('axios');
const db = require('../models/Database');
const ContaReceber = require('../models/ContaReceber');
const Servico = require('../models/Servico')

module.exports={
    
    async alterar(request,response) {
 
        const {con_cod,ser_cod,con_dtPgto} = request.body;

        const con = await db.conecta();

        const c = await new ContaReceber().getConta(con_cod,ser_cod,db);
        c.setDtPgto(con_dtPgto);
        c.alterar(ser_cod,db); 
        
        return response.json(c);
    },
    
    async alterarValor(request,response) {
 
        const {con_cod,ser_cod,con_valor} = request.body;

        const con = await db.conecta();

        const c = await new ContaReceber().getConta(con_cod,ser_cod,db);
        c.setValor(con_valor);
        c.alterarValor(ser_cod,db);
        
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
    
    async adicionarConta(request,response){

        const{ser_cod,con_valor} = request.body;
  
        const con = await db.conecta();
        
        const date = new Date();
        date.setDate(date.getDate());

        //buscar o serviço
        let servico = await new Servico().procurarCod(ser_cod,db);

        //coloca a conta no serviço
        let index = servico.getContas().length;
        const c = new ContaReceber(index+1,con_valor,date,date);       
        
        servico.addContaReceber(c);
        

        //coloca a conta no banco
        await servico.getContas()[index].gravar(ser_cod,db);
        
       
        return response.json(c);
    },
  
}