module.exports=class ClienteDAO{
    async procurarCod(cod,db){
        const sql = "SELECT * FROM Cliente c,Pessoa p WHERE p.pes_cod=c.pes_cod and p.pes_cod=?";
        const valor = [cod];
        const resp= await db.consulta(sql,valor);
        return resp;
    }
}