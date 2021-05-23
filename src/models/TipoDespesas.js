const Despesas=require('./Despesas');
const DespesasAO=require('../DAOs/DespesasDAO');
const ContaPagar = require('./ContaPagar');
const ContaPagarDAO = require('../DAOs/ContaPagarDAO');
const TipoDespesas = require('./TipoDespesas');
const TipoDespesasDAO = require('../DAO/TipoDespesasDAO'); 
module.exports=class TipoDespesas{
    constructor(td_cod,td_nome){
        this.td_cod=td_cod;
        this.td_nome=td_nome;
    }
    getTd_cod(){
        return this.td_cod;
    }
    getTd_nome(){
        return this.td_nome;
    }
    async gravar(db) {
        const resp=await new TipoDespesasDAO().gravar(this,db);
        this.td_cod=resp.lastId; 
    }
    async alterar(db){
        await new TipoDespesasDAO().alterar(this,db);
    }
    async deletar(db){
        await new TipoDespesasDAO().deletar(this.db)
        return resp;
    }
    async procurarNome(nome,db){
        const resp=await new TipoDespesaDAO().procurarNome(nome,db);
        let tipodespesa = new TipoDespesas(resp.data[0].dt_cod,resp.data[0].td_nome)
        return tipodespesa;
    }
    async procurarCod(cod,db){
        const resp=await new TipoDespesaDAO().procurarCod(cod,db);
        let tipodespesa = new TipoDespesas(resp.data[0].dt_cod,resp.data[0].td_nome)
        return tipodespesa;
    }
}