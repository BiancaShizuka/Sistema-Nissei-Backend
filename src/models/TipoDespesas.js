const TipoDespesaDAO = require("../DAOs/TipoDespesaDAO"); 
module.exports=class TipoDespesas{
    constructor(td_cod,td_nome){
        this.td_cod=td_cod;
        this.td_nome=td_nome;
    }
    getCod(){
        return this.td_cod;
    }
    getNome(){
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
        let tipodespesas = [];
        for(let i=0;i<resp.data.length;i++){
            tipodespesas.push(new TipoDespesas(resp.data[i].td_cod,resp.data[i].td_nome));
        }
        return tipodespesas;
    }
    async procurarCod(cod,db){
        const resp=await new TipoDespesaDAO().procurarCod(cod,db);
        let tipodespesa = new TipoDespesas(resp.data[0].td_cod,resp.data[0].td_nome)
        return tipodespesa;
    }
    async listar(db){
        const resp=await new TipoDespesaDAO().listar();
        let tdespesas=[];
        for(let i=0;i<resp.data.length;i++){
            tdespesas.push(new TipoDespesas(resp.data[i].td_cod,resp.data[i].td_nome));
        }
        return tdespesas;
    }
}