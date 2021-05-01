module.exports=class MarcaDAO{
    async procurarCod(cod_marca,db){
        const sql = "SELECT * FROM marca WHERE mar_cod=?";
        
        const valor = [cod_marca];
        const result = await db.consulta(sql,valor);
        return result;
    }
}