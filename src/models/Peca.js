const PecaDAO=require('../DAOs/PecaDAO');
module.exports=class Peca{
    constructor(cod,peca){
        this.pec_cod=cod;
        this.pec_descricao=peca;
    }
    getDescricao(){
        return this.pec_descricao;
    }
    getCod(){
        return this.pec_cod;
    }
    async gravar(db) {
        let result=await new PecaDAO().gravar(this,db);
        this.pec_cod=result.lastId;
    }
    async procurarCod(cod,db){
        const result=await new PecaDAO().procurarCod(cod,db);
        let peca=new Peca(result.data[0].pec_cod,result.data[0].pec_descricao);
        return peca;
    }
    async listarPorFiltro(filtro,db){
        const result=await new PecaDAO().listarPorFiltro(filtro,db);
        let pecas=[]
        for(let i=0;i<result.data.length;i++){
            pecas.push(new Peca(result.data[i].pec_cod,result.data[i].pec_descricao));
        }
        return pecas;
    }
}