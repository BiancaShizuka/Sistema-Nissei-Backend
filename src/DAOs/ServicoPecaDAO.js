const ServicoPeca=require('../models/ServicoPeca');
const Peca=require('../models/Peca');
module.exports=class ServicoPeca{
    async listarPecas(pec_cod,db){
        const sql = "SELECT * FROM servicopecas s where pec_cod=?";
        const valor = [pec_cod];
        const pecas = await db.consulta(sql,valor);
        return pecas;
    }
    async listar(ser_cod,db){
        const sql = "SELECT * FROM servicopecas where ser_cod=?";
        const valor = [ser_cod];
        const pecas = await db.consulta(sql,valor);
        
        return pecas;
    }
    async gravar(peca,cod,db) {    
        const sql = "INSERT INTO servicopecas (ser_cod,pec_cod,uti_precoUni,uti_qtde) VALUES (?, ?, ?, ?)";
        const valor = [cod,peca.getPeca().getCod(),peca.getPreco(),peca.getQtde()];
        const result=await db.manipula(sql,valor);
        return result;
    }
    async deletar(peca,cod,db){
        const sql = "DELETE FROM servicopecas WHERE ser_cod=? AND pec_cod=? "
              
        const valor = [cod,peca.getPeca().getCod()];
        const result=await db.manipula(sql,valor);
        return result;
    }
    async procurarServicoPeca(peca,ser_cod,db){
        const sql="select * from servicopecas where ser_cod=? and pec_cod=?";
        const valor=[ser_cod,peca.getPeca().getCod()];
        const result=await db.manipula(sql,valor);
        return result;
    }
}