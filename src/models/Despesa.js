const DespesaDAO=require('../DAOs/DespesaDAO');
const ContaPagar=require("../models/ContaPagar");
module.exports=class Despesa{
    constructor(des_cod,des_dtEntrada,total,tpDespesa){
        this.cod=des_cod;
        this.dtEntrada=des_dtEntrada;
        this.total=total;
        this.tpDespesa=tpDespesa;
        this.contasPagar=[];
    }
    getCod(){
        return this.des_cod;
    }
    getTotal(){
        return this.total;
    }
    setTotal(total){
        this.total=total;
    }
    getTpDespesa(){
        return this.tpDespesa;
    }
    getDtEntrada(){
        return this.dtEntrada;
    }
    setContasPagar(contas){
        this.contasPagar=contas;
    }
    addContaPagar(conta){
        this.contasPagar.push(conta);
    }
    getContasPagar(){
        return this.contasPagar;
    }
    async gravar(db) {
        const resp=await new DespesaDAO().gravar(this,db);
        this.des_cod=resp.lastId; 
    }
    async deletar(db){
        await new DespesaDAO().deletar(this.db)
        return resp;
    }
    async procurarCod(cod,db){
        const resp=await new DespesaDAO().procurarCod(cod,db);
        let despesa = new Despesa(resp.data[0].des_cod,resp.data[0].des_dtEntrada,0,resp.data[0].dt_cod);
        let contas=await new ContaPagar().listarContasDespesa(cod,db);
        despesa.setContasPagar(contas);
        despesa.calcularTotal();
        return despesa;
    }
    calcularTotal(){
        this.total=0;
        for(let i=0;i<this.contasPagar.length;i++){
            this.total+=this.getContasPagar()[i].getCon_valor;
        }
    }
}