const DespesaDAO=require('../DAOs/DespesaDAO');

module.exports=class Despesas{
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
        let despesa = new Despesas(resp.data[0].des_cod,resp.data[0].des_dtEntrada,resp.data[0].dt_cod);
        return despesa;
    }
}