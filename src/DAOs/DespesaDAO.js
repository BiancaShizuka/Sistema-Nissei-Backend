module.exports=class DespesaDAO{
    async gravar(despesa,db) {
        const sql = "INSERT INTO Despesa (des_dtEntrada,td_cod) VALUES ( ?, ?)";
        
        const valor = [despesa.getDtEntrada(),despesa.getTpDespesa().getCod()];
        const result = await db.manipula(sql,valor);
        
       
        return result;
    }
    async deletar(despesa,db){
        const sql = "DELETE FROM Despesa WHERE des_cod=?";
        
        const valor = [despesa.getCod()];
        const result = await db.manipula(sql,valor);
        return result;
    }
    async procurarCod(cod,db){
        const sql = "SELECT * FROM Despesa WHERE des_cod=?";
        
        const valor = [cod];
        const resp = await db.consulta(sql,valor);
        return resp;
    }
}