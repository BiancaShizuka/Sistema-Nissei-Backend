const Despesas=require('./Despesas');
const DespesasAO=require('../DAOs/DespesaDAO');
const ContaPagar = require('./ContaPagar');
const ContaPagarDAO = require('../DAOs/ContaPagarDAO');
const TipoDespesas = require('./TipoDespesas');
const TipoDespesasDAO = require('../DAO/TipoDespesaDAO'); 
module.exports=class Despesas{
    constructor(des_cod,des_dtEntrada,dt_cod){
        this.des_cod=des_cod;
        this.des_dtEntrada=des_dtEntrada;
        this.dt_cod=dt_cod;
    }
    getCod(){
        return this.des_cod;
    }
    async gravar(db) {
        const resp=await new DespesasDAO().gravar(this,db);
        this.des_cod=resp.lastId; 
    }
    async alterar(db){
        await new DespesasDAO().alterar(this,db);
    }
    async deletar(db){
        await new DespesasDAO().deletar(this.db)
        return resp;
    }
    async procurarCod(cod,db){
        const resp=await new DespesaDAO().procurarCod(cod,db);
        let despesa = new Despesas(resp.data[0].des_cod,resp.data[0].des_dtEntrada,resp.data[0].dt_cod)
        return despesa;
    }
}