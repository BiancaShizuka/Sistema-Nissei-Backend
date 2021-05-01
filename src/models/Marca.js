const MarcaDAO=require('../DAOs/MarcaDAO');
module.exports=class Marca{
    constructor(cod,marca,status){
        this.mar_cod=cod;
        this.mar_descricao=marca;
        this.mar_status=status;
    }
    getMarca(){
        return this.mar_descricao;
    }
    async procurarCod(cod_marca,db){
        let resp = await new MarcaDAO().procurarCod(cod_marca,db);
        let marca=new Marca(resp.data[0].mar_cod,
            resp.data[0].mar_descricao,
            resp.data[0].mar_status);
        return marca;
    }
}