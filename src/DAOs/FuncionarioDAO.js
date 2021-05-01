module.exports=class FuncionarioDAO{
    async procurarCod(cod,db){
        const sql = "SELECT * FROM Funcionario f,Pessoa p WHERE p.pes_cod=f.pes_cod and p.pes_cod=?";
        const valor = [cod];
        const resp= await db.consulta(sql,valor);
        return resp;
    }
}