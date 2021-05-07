const MarcaDAO=require('../DAOs/MarcaDAO');
module.exports=class Marca{
    constructor(cod,marca,status){
        this.mar_cod=cod;
        this.mar_descricao=marca;
        this.mar_status=status;
    }
    getDescricao(){
        return this.mar_descricao;
    }
    getCod(){
        return this.mar_cod;
    }
    getStatus(){
        return this.mar_status;
    }
    setDescricao(descricao){
        this.mar_descricao=descricao;
    }
    setStatus(status){
        this.status=status;
    }
    async procurarCod(cod_marca,db){
        let resp = await new MarcaDAO().procurarCod(cod_marca,db);
        let marca=new Marca(resp.data[0].mar_cod,
            resp.data[0].mar_descricao,
            resp.data[0].mar_status);
        return marca;
    }
    async listar(db){
        let resp =await new MarcaDAO().listar(db);
        let marcas=[];
        
        for(let i=0;i<resp.data.length;i++){
            marcas.push(
                new Marca(resp.data[i].mar_cod,resp.data[i].mar_descricao,resp.data[i].mar_status)
                
            )

        }
        
        return marcas;
    }
    async listarPorFiltro(filtro,db){
        let resp =await new MarcaDAO().listarPorFiltro(filtro,db);
        let marcas=[];
       
        for(let i=0;i<resp.data.length;i++){
            marcas.push(
                new Marca(resp.data[i].mar_cod,resp.data[i].mar_descricao,resp.data[i].mar_status)
                
            )
        } 
        return marcas;
    }
    async gravar(db){
        let resp = await new MarcaDAO().gravar(this,db);
        return resp;
    }
    async alterar(db){
        let resp = await new MarcaDAO().alterar(this,db);
        return resp;
    }
}