const axios=require('axios');
const db=require('../models/Database');
const Despesa=require('../models/Despesa');
const ContaPagar=require('../models/ContaPagar');
const BaixaConta = require('./BaixaConta');
module.exports= class EfetuarPagamentoController extends BaixaConta{
  async alterar(request,response) {
      const {des_cod,con_cod,con_dtPgto} = request.body;
      const t=new EfetuarPagamentoController();
      const resp=await super.gravar(des_cod,con_cod,con_dtPgto,false,t);
      return response.json(resp);
  }
  async procurarCod(cod,db){
    const result=await new Despesa().procurarCod(cod,db);
    return result;
  }
  async listarContasFiltro(request,response){
    const td_cod = request.query["td_cod"];
    const dtFim = request.query["dtFim"];
    const dtInicio = request.query["dtInicio"];
    const con = await db.conecta();

    const contas = await new ContaPagar().listarContasFiltro(td_cod,dtInicio,dtFim,db);
    
    return response.json(contas);
  }
    
}
