
module.exports=class ServicoDAO{
    async alterar(ser,db){
        let funcionario,carro;
        if(ser.getFuncionario()==null)
            funcionario=null;
        else
            funcionario=ser.getFuncionario().getCod();
        if(ser.getCarro()==null)
            carro=null;
        else
            carro=ser.getCarro().getId();
        const sql = "UPDATE servico SET car_id=? ,fun_cod=?,"+
                    "ser_descricao=?,ser_maoObra=?,ser_inicio=?, ser_fim=?, "+
                    "ser_status=? "+
                    "WHERE ser_cod = ?";

        const valor = [carro,funcionario,ser.getDescricao(),
                    ser.getMaoObra(),ser.getInicio(),ser.getFim(),ser.getStatus(),ser.getCod()];
        const result = await db.manipula(sql,valor);
        console.log(result);
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
    async excluir(ser,db){
        const sql = "delete from servico where ser_cod=?"

        const valor = [ser.getCod()];
        const result = await db.manipula(sql,valor);
        return result;
    }
    async listarFiltros(cli_nome,dt_inicio,dt_saida,car_placa,status,db){
        let hasParameter=false;
        let valor=[];
        let sql;
        sql="select s.ser_cod,s.ser_fim,s.cli_cod as cli_cod,s.fun_cod,c.car_id,s.ser_inicio,ser_status";
        sql+=" from (Servico s";
        sql+=" left join Carro c on s.car_id=c.car_id"; 
        sql+=" left join Pessoa p on s.cli_cod=p.pes_cod";
        sql+=" left join Pessoa p2 on s.fun_cod=p2.pes_cod) ";
        if(status){
            if(status=="1")
                sql+=" where s.ser_fim is null"
            else
                sql+=" where s.ser_fim is not null"
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
        if(hasParameter)
            sql+=" and";
        else
            sql+=" where";
        sql+=" ser_status=true"
        sql+=" order by ser_inicio";
        console.log(sql);
        const result = await db.consulta(sql,valor);
        
        return result;
    }
    async listarPorCliente(cli_cod,db){
        const sql = "SELECT * FROM servico where cli_cod=? order by ser_inicio";
        const valor = [cli_cod];
        const sers = await db.consulta(sql,valor);
        return sers;
    }
    async listarPorCarro(car_id,db){
        const sql = "SELECT * FROM servico where car_id=? order by ser_inicio";
        const valor = [car_id];
        const sers = await db.consulta(sql,valor);
        return sers;
    }
    async listarPorCarroNull(cod,db){
        const sql = "SELECT * FROM servico s where car_id is null and cli_cod=? order by s.ser_inicio";
        const valor = [cod];
        const sers = await db.consulta(sql,valor);
        return sers;
    }
}