module.exports=class TipoDespesasDAO{
    async alterar(tpDesp,db){
        const sql = "UPDATE TipoDespesa SET dt_nome=?"+
                    "WHERE dt_cod = ?";
        
        const valor = [tpDesp.getNome(),tpDesp.getCod()];
        const result = await db.manipula(sql,valor);
        return result;
    }
    async gravar(tpDesp,db) {
        const sql = "INSERT INTO TipoDespesa UPPER(dt_nome) VALUES (?)";
        const valor = ["%"+tpDesp.getNome()+"%"];
        const result = await db.manipula(sql,valor);
        return result;
    }
    async deletar(tipo,db){
        const con = await db.conecta();
        const sql = "DELETE FROM TipoDespesa WHERE dt_cod=?";  
        const valor = [tipo.getCod()];
        const result = await db.manipula(sql,valor);
        return result;
    }
    async procurarNome(nome,db){
        const sql = "SELECT * FROM TipoDespesa td_cod"+
                 "WHERE dt_nome=?";
        const valor = [nome];
        const resp = await db.consulta(sql,valor);
        return resp;
    }
    async procurarCod(cod,db){
        const sql = "SELECT * FROM TipoDespesa WHERE dt_cod=?";
        const valor = [cod];
        const result = await db.consulta(sql,valor);
        return result;
    }
}