const Despesas=require('./Despesas');
const DespesasAO=require('../DAOs/DespesasDAO');
const ContaPagar = require('./ContaPagar');
const ContaPagarDAO = require('../DAOs/ContaPagarDAO');
const TipoDespesas = require('./TipoDespesas');
const TipoDespesasDAO = require('../DAO/TipoDespesasDAO'); 
module.exports=class ContaPagar{
    constructor(con_cod,des_cod,con_valor,con_dtVencimento,con_dtPago,con_nParcela){
        this.con_cod=con_cod;
        this.des_cod=des_cod;
        this.con_valor=con_valor;
        this.con_dtVencimento=con_dtVencimento;
        this.con_dtPago=con_dtPago;
        this.con_nParcela=con_nParcela;
    }
    getCon_cod(){
        return this.con_cod;
    }
    getDes_cod(){
        return this.des_cod;
    }
    getCon_valor(){
        return this.con_valor;
    }
    getDt_vencimento(){
        return this.con_dtVencimento
    }
    getDt_pago(){
        return this.con_dtPago;
    }
    async buscarNParcelas(cod,db){

    }
    async gravar(db) {
        const resp=await new ContaPagarDAO().gravar(this,db);
        this.td_cod=resp.lastId; 
    }
    async alterar(db){
        await new ContaPagarDAO().alterar(this,db);
    }
    async deletar(db){
        await new ContaPagarDAO().deletar(this.db)
        return resp;
    }
}