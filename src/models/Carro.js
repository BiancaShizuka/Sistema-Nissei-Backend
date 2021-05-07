const CarroDAO=require('../DAOs/CarroDAO');
const Marca=require('../models/Marca');
module.exports=class Carro{
    constructor(cod,placa,ano,modelo,km,marca,status){
        this.car_id=cod;
        this.car_placa=placa;
        this.car_ano=ano;
        this.car_modelo=modelo;
        this.car_km=km;
        this.car_marca=marca;
        this.car_status=status;
    }
    getId(){
        return this.car_id;
    }
    getPlaca(){
        return this.car_placa;
    }
    async procurarCod(cod_carro,db){
        let result=await new CarroDAO().procurarCod(cod_carro,db);
        let carro;
        if(result.data[0].mar_cod!=null)
        carro=new Carro(result.data[0].car_id,result.data[0].car_placa,result.data[0].car_ano,result.data[0].car_modelo,
            result.data[0].car_km,await (new Marca().procurarCod(result.data[0].mar_cod,db)),result.data[0].status);
        else
        carro=new Carro(result.data[0].car_id,result.data[0].car_placa,result.data[0].car_ano,result.data[0].car_modelo,
            result.data[0].car_km,null,result.data[0].status);
        return carro;
    }
    async listarPorCliente(cod,db){
        let result=await new CarroDAO().listarPorCliente(cod,db);
        let carros=[];
        let marca=null;
        for(let i=0;i<result.data.length;i++){
            if(result.data[i].mar_cod!=null)
                marca=await (new Marca().procurarCod(result.data[i].mar_cod,db));
            carros.push(new Carro(result.data[i].car_id,result.data[i].car_placa,result.data[i].car_ano,
                result.data[i].car_modelo,
                result.data[i].car_km,marca,result.data[i].car_status));
            marca=null;
        }
        return carros;
    }
}