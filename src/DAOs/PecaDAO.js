module.exports=class PecaDAO{
    async procurarCod(cod,db){
        const sql = "SELECT * FROM peca WHERE pec_cod=?";
        
        const valor = [cod];
        const result = await db.consulta(sql,valor);
        return result;
    }
    async listarPorFiltro(filtro,db){
        const sql = "SELECT * FROM peca WHERE UPPER(pec_descricao) LIKE UPPER(?) AND pec_status=true";
        const valor = ["%"+filtro+"%"];
        const pecas = await db.consulta(sql,valor);
        return pecas;
    }
    async gravar(peca,db) {
        const sql = "INSERT INTO peca (pec_descricao,pec_status) VALUES (?,true)";
        
        const valor = [peca.getDescricao()];
        const result = await db.manipula(sql,valor);
        
        return result;
    }
}