
module.exports=class ServicoDAO{
    async alterar(ser,db){
        const sql = "UPDATE servico SET car_id=? ,fun_cod=?,"+
                    "ser_descricao=?,ser_maoObra=?,ser_inicio=?, "+
                    "ser_status=? "+
                    "WHERE ser_cod = ?";
        
        const valor = [ser.getCarro().getId(),ser.getFuncionario().getCod(),ser.getDescricao(),
                    ser.getMaoObra(),ser.getInicio(),ser.getStatus(),ser.getCod()];
        const result = await db.manipula(sql,valor);
    }
    async gravar(ser,db) {
        const sql = "INSERT INTO servico (car_id,cli_cod,fun_cod,ser_descricao,ser_maoObra,ser_inicio,ser_fim,ser_status) VALUES (?, ?, ?, ?, ?, ?,null ,?)";
        
        const valor = [ser.getCarro().getId(),ser.getCliente().getCod(),ser.getFuncionario().getCod(),
            ser.getDescricao(),ser.getMaoObra(),ser.getInicio(),ser.getStatus()];
        const result = await db.manipula(sql,valor);
        return result;
    }
    async procurarCod(cod,db){
        const sql = "SELECT * FROM servico WHERE ser_cod=?";
        
        const valor = [cod];
        const resp = await db.consulta(sql,valor);
        return resp;
    }
    async listarFiltros(cli_nome,dt_inicio,dt_saida,car_placa,status,db){
        let hasParameter=false;
        let valor=[];
        let sql;
        sql="select s.ser_cod,s.cli_cod as cli_cod,s.fun_cod,c.car_id,s.ser_inicio,ser_status";
        sql+=" from (Servico s";
        sql+=" left join Carro c on s.car_id=c.car_id"; 
        sql+=" left join Pessoa p on s.cli_cod=p.pes_cod";
        sql+=" left join Pessoa p2 on s.fun_cod=p2.pes_cod) ";
        if(status){
            sql+=" where s.ser_status=?"
            valor.push(status);
            hasParameter=true;
        }
        
        if(cli_nome){
            if(hasParameter)
                sql+=" and";
            else
                sql+=" where";
            hasParameter=true;

            sql+=" UPPER(p.pes_nome) LIKE UPPER(?)";
            valor.push("%"+cli_nome+"%");
        }
        if(dt_inicio){
            if(hasParameter)
                sql+=" and";
            else
                sql+=" where";
            hasParameter=true;

            sql+=" s.ser_inicio>=?";
            valor.push(dt_inicio);
        }
        if(dt_saida){
            if(hasParameter)
                sql+=" and";
            else
                sql+=" where";
            hasParameter=true;

            sql+=" s.ser_inicio<=?";
            valor.push(dt_saida);
        }
        if(car_placa){
            if(hasParameter)
                sql+=" and";
            else
                sql+=" where";
            hasParameter=true;

            sql+=" UPPER(c.car_placa) LIKE UPPER(?)";
            valor.push("%"+car_placa+"%");
        }
        const result = await db.consulta(sql,valor);
        
        return result;
    }
}