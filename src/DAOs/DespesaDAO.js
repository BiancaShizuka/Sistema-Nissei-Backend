module.exports=class DespesaDAO{
     async alterar(despesa,db){
        const con = await db.conecta();
        const sql = "UPDATE Despesa SET des_dtEntrada=?, dt_cod=?"+
                    "WHERE des_cod = ?";
        
        const valor = [despesa.getDtEntrada(),despesa.getTpDespesa().getCod(),despesa.getCod()];
        const result = await db.manipula(sql,valor);
        return result;
    }
    async gravar(despesa,db) {
        const sql = "INSERT INTO Despesa (des_dtEntrada,dt_cod) VALUES ( ?, ?)";
        
        const valor = [despesa.getDtEntrada(),despesa.getCod()];
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