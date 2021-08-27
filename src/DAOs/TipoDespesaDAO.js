module.exports=class TipoDespesasDAO{
    async listar(db){
        const sql="SELECT * FROM tipo_despesa";
        const result=await db.consulta(sql);
        return result;
    }
    async alterar(tpDesp,db){
        const sql = "UPDATE tipo_despesa SET dt_nome=?"+
                    "WHERE dt_cod = ?";
        
        const valor = [tpDesp.getNome(),tpDesp.getCod()];
        const result = await db.manipula(sql,valor);
        return result;
    }
    async gravar(tpDesp,db) {
        const sql = "INSERT INTO tipo_despesa UPPER(dt_nome) VALUES (?)";
        const valor = ["%"+tpDesp.getNome()+"%"];
        const result = await db.manipula(sql,valor);
        return result;
    }
    async deletar(tipo,db){
        const con = await db.conecta();
        const sql = "DELETE FROM tipo_despesa WHERE dt_cod=?";  
        const valor = [tipo.getCod()];
        const result = await db.manipula(sql,valor);
        return result;
    }
    async procurarNome(nome,db){
        const sql = "SELECT * FROM tipo_despesa td_cod"+
                 "WHERE dt_nome=?";
        const valor = [nome];
        const resp = await db.consulta(sql,valor);
        return resp;
    }
    async procurarCod(cod,db){
        const sql = "SELECT * FROM tipo_despesa WHERE td_cod=?";
        const valor = [cod];
        const result = await db.consulta(sql,valor);
        return result;
    }
}