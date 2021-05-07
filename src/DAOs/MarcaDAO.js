module.exports=class MarcaDAO{
    async procurarCod(cod_marca,db){
        const sql = "SELECT * FROM marca WHERE mar_cod=?";
        
        const valor = [cod_marca];
        const result = await db.consulta(sql,valor);
        return result;
    }
    async listar(db){

        const sql = "SELECT * FROM marca where mar_status=true";
        const marcas = await db.consulta(sql);
        return marcas;
    }
    async listarPorFiltro(filtro,db){

        const sql = "SELECT * FROM marca WHERE UPPER(mar_descricao) LIKE UPPER(?) and mar_status=true";
        const valor = [filtro+"%"];
        const marcas = await db.consulta(sql,valor);
    
        return marcas;
    }
    async gravar(marca,db) {

        const con = await db.conecta();
        const sql = "INSERT INTO marca (mar_descricao,mar_status) VALUES (?,true)";
        
        const valor = [marca.getDescricao()];
        const result = await db.manipula(sql,valor);
      
        return result;
    }
    async alterar(marca,db){
        const sql = "UPDATE marca set mar_descricao=?,mar_status=? "+
                    "WHERE mar_cod = ?";
        
        const valor = [marca.getDescricao(),marca.getStatus(),marca.getCod()];
        const result = await db.manipula(sql,valor);
        return result;
    }

}