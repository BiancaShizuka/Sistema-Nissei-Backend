const axios=require('axios');
const db=require('../models/Database');
module.exports={
    async efetuarPagamento(request,response) {
        const {des_cod,con_cod,con_dtPgto} = request.body;
        const con = await db.conecta();
        let despesa=await new Despesa().procurarCod(des_cod,db);
        let i=0;
        while(i<despesa.getContas().lenght && despesa.getContas()[i].getCon_cod()!=con_cod)
          i=i+1;
        despesa.getContas()[i].setDt_pgto(con_dtPgto);
        despesa.getContas()[i].alterar(des_cod,db)
        return response.json(contapagar);
    },
    
}
