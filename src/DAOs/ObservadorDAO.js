module.exports=class ObservadorDAO{
    async gravar(obs,db){
        sql="insert into observadores (cli_cod,ser_cod) values (?,?)";
        const valor=[obs.getCod(),obs.getCliente().getCod()];
        const resp= await db.manipula(sql,valor);
        return resp;
    }
    async deletar(obs,db){
        const sql = "DELETE FROM observadores WHERE cli_cod=? AND ser_cod=? "
        const valor=[obs.getCod(),obs.getCliente().getCod()];
        const resp=await db.manipula(sql,valor);
        return resp;
    }
    async listar(obs,db){
        const sql="select * from observadores where ser_cod=?";
        const valor=[obs.getCod()];
        const resp=await db.consulta(sql,valor);
        return resp;
    }
}