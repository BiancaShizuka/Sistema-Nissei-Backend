module.exports=class CarroDAO{
    async procurarCod(cod_carro,db){
        const sql = "SELECT * FROM Carro WHERE car_id=?";
        
        const valor = [cod_carro];
        const result = await db.consulta(sql,valor);
        return result;
    }
}