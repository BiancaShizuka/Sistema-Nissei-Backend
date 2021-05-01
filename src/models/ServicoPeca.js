const Peca=require('./Peca')
const ServicoPecaDAO=require('../DAOs/ServicoPecaDAO');
module.exports=class ServicoPeca{
    constructor(peca,preco,qtde){
        this.peca=peca;
        this.uti_precoUni=preco;
        this.uti_qtde=qtde;
        this.total=this.uti_qtde*this.uti_precoUni;
    }
    getPeca(){
        return this.peca;
    }
    getQtde(){
        return this.uti_qtde;
    }
    getPreco(){
        return this.uti_precoUni;
    }
    setTotal(total){
        this.total=total;
    }
    getTotal(){
        return this.total;
    }
    calculaTotal(){
        this.total=this.uti_qtde*this.uti_precoUni;
    }
    async gravar(cod,db) {
        await new ServicoPecaDAO().gravar(this,cod,db);
    }
    async deletar(cod,db){
        await new ServicoPecaDAO().deletar(this,cod,db);
    }
    async listar(ser_cod,db){
        const pecas=await new ServicoPecaDAO().listar(ser_cod,db);
        let lista=[];
        for(let i=0;i<pecas.data.length;i++){
            lista.push(new ServicoPeca(await new Peca().procurarCod(pecas.data[i].pec_cod,db),
                    pecas.data[i].uti_precoUni,pecas.data[i].uti_qtde));
            lista[i].calculaTotal();
        }
        return lista;
    }
    async listarPecas(pec_cod,db){
        const pecas=await new ServicoPecaDAO().listarPecas(pec_cod,db);
        let lista=[];
        for(let i=0;i<pecas.data.length;i++){
            lista.push(new ServicoPeca(await new Peca().procurarCod(pecas.data[i].pec_cod,db),
                    pecas.data[1].uti_precoUni,pecas.data[1].uti_qtde));
            lista[i].calculaTotal();
        }
        return lista;
    }
}