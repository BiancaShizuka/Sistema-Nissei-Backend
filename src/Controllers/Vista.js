const ContaReceber=require('../models/ContaReceber');
const Parcelado=require('./Parcelado')
const Strategy=require('./Strategy')
function Vista(){
    Strategy.call(this);
}
Vista.prototype ={
    gerarParcelas: async function (servico,qtde_parcelas,date,db) {
        if(qtde_parcelas==1){
            servico.addContaReceber(new ContaReceber(1,servico.getTotal(),date));
                
            await servico.getContas()[0].gravar(servico.getCod(),db);
        }
        else{
            new Parcelado().gerarParcelas(servico,qtde_parcelas,date,db);
        }
    }
};

module.exports=Vista