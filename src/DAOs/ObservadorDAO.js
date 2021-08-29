module.exports=class ObservadorDAO{
    async gravar(ser,obs,db){
        const sql="insert into observadores (ser_cod,cli_cod) values (?,?)";
        console.log("ObservadorDAO cli_cod="+obs.getCod());
        const valor=[ser.getCod(),obs.getCod()];
        const resp= await db.manipula(sql,valor);
        console.log("RESPOSTA:  "+resp.err);
        return resp;
    }
    async deletar(ser,obs,db){
        const sql = "DELETE FROM observadores WHERE ser_cod=? AND cli_cod=? "
        const valor=[ser.getCod(),obs.getCod()];
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