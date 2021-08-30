const ContaReceber=require('../models/ContaReceber');
const Strategy=require('./Strategy')
function Parcelado(){
    Strategy.call(this);
}
//Parcelado.prototype=Object.create(Strategy.prototype);
Parcelado.prototype={
    gerarParcelas: async function (servico,qtde_parcelas,date,db) {
        for(let i=1;i<=qtde_parcelas-1;i++){
            let date2 = new Date(date);
            let v=parseFloat(servico.getTotal()/qtde_parcelas).toFixed(2);
            servico.addContaReceber(new ContaReceber(i,v,date2));
            date.setDate(date.getDate()+30);
        }
        let auxv=servico.getTotal()-parseFloat(servico.getTotal()/qtde_parcelas).toFixed(2)*(qtde_parcelas-1);
        servico.addContaReceber(new ContaReceber(qtde_parcelas,auxv,date));

        for(let i=0;i<qtde_parcelas;i++)
                await servico.getContas()[i].gravar(servico.getCod(),db);
       
    }
};

module.exports=Parcelado