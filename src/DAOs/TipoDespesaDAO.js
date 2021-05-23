module.exports=class TipoDespesasDAO{
    async alterar(request,response){
        const {td_cod,dt_nome} = request.body;
        const con = await db.conecta();
        const sql = "UPDATE TipoDespesa SET dt_nome=?"+
                    "WHERE dt_cod = ?";
        
        const valor = [des_dtEntrada,dt_cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    }
    async gravar(request,response) {
        const {dt_nome} = request.body;
        const con = await db.conecta();
        const sql = "INSERT INTO TipoDespesa (dt_nome) VALUES (?)";
        
        const valor = [dt_nome];
        const result = await db.manipula(sql,valor);
        if(!result.status)
            console.log("Ja cadastrado");
        return response.json(result);
    }
    async deletar(request,response){
        const cod = request.params.cod;
        const con = await db.conecta();
        const sql = "DELETE FROM TipoDespesa WHERE dt_cod=?";  
        
        const valor = [cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    }
    async procurarNome(cod,db){
        const {dt_nome} = request.body;
        const sql = "SELECT * FROM TipoDespesa td_cod"+
                 "WHERE dt_nome=?";
        const valor = [cod];
        const resp = await db.consulta(sql,valor);
        return response.json(resp.data);
    }
    async procurarCod(request,response){
        const cod = request.params.cod;
        const con = await db.conecta();
        const sql = "SELECT * FROM TipoDespesa WHERE dt_cod=?";
        
        const valor = [cod];
        const result = await db.consulta(sql,valor);
        console.log(result);
        return response.json(result.data);
    }
}