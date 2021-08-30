const db = require('../models/Database');
const Servico = require('../models/Servico');
const Despesa =require('../models/Despesa');
module.exports=class BaixaConta{
    constructor() {
        if (this.constructor == BaixaConta) {
          throw new Error("Abstract classes can't be instantiated.");
        }
    }
    procurarCod(cod,db) {
    }
    async gravar(conta_cod,con_cod,con_dtPgto, objet){
        const con = await db.conecta();
        let conta=null;
        conta=await objet.procurarCod(conta_cod,db);
        let i=0;
        while(i<conta.getContas().length && conta.getContas()[i].getCod()!==con_cod)
            i++;
        conta.getContas()[i].setDtPgto(con_dtPgto);
        const resp =await conta.getContas()[i].alterar(conta_cod,db);
        return conta.getContas()[i];
    }
    
}