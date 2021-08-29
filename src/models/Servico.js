const Carro=require('./Carro');
const Funcionario=require('./Funcionario');
const Cliente=require('./Cliente');
const ServicoPeca=require('./ServicoPeca');
const ServicoDAO=require('../DAOs/ServicoDAO');
const ContaReceber = require('./ContaReceber');
const Sujeito=require('./Sujeito');
const ObservadorDAO = require('../DAOs/ObservadorDAO');
module.exports=class Servico extends Sujeito{
    constructor(cod,carro,cliente,funcionario,descricao,maoObra,inicio,status,fim){
        super();
        this.ser_cod=cod;
        this.carro=carro;
        this.cliente=cliente;
        this.funcionario=funcionario;
        this.ser_descricao=descricao;
        this.ser_maoObra=maoObra;
        this.ser_status=status;
        this.ser_inicio=inicio;
        this.ser_fim=fim;
        this.pecas=[];
        this.contasReceber=[];
        this.total=0;
        this.observadores=[];
    }
    getFuncionario(){
        return this.funcionario;
    }
    setFuncionario(funcionario){
        this.funcionario=funcionario;
    }
    getCod(){
        return this.ser_cod;
    }
    getCarro(){
        return this.carro;
    }
    setCarro(carro){
        this.carro=carro;
    }
    getCliente(){
        return this.cliente;
    }
    getFuncionario(){
        return this.funcionario;
    }
    getDescricao(){
        return this.ser_descricao;
    }
    getMaoObra(){
        return this.ser_maoObra;
    }
    getInicio(){
        return this.ser_inicio;
    }
    getStatus(){
        return this.ser_status;
    }
    setStatus(status){
        this.ser_status=status;
    }
    setPecas(pecas){
        this.pecas=pecas;
    }
    getPecas(){
        return this.pecas;
    }
    addPecaLista(peca){
        this.pecas.push(peca);
    }
    getContas(){
        return this.contasReceber;
    }
    addContaReceber(conta){
        this.contasReceber.push(conta);
    }
    
    setContas(contas){
        this.contasReceber=contas;
    }
    setTotal(total){
        this.total=total;
    }
    getTotal(){
        return this.total;
    }
    setFim(fim){
        this.ser_fim=fim;
    }
    getFim(){
        return this.ser_fim;
    }
    setCarro(carro){
        this.carro=carro;
    }
    async gravar(db) {
        const resp=await new ServicoDAO().gravar(this,db);
        this.ser_cod=resp.lastId; 
    }
    async alterar(db){
    
        await new ServicoDAO().alterar(this,db);
    }
    async adicionar(obs,db){
        this.observadores.push(obs);
        const resp=await new ObservadorDAO().gravar(this,obs,db);
        return resp;
    }
    async remover(obs,db){
        const index = this.observadores.indexOf(obs);
        this.observadores.splice(index, 1);
        const resp=await new ObservadorDAO().deletar(ser,obs,db);
        return resp;
    }
    async notificar(db){
        const observer=new ObservadorDAO();
        const resp=await observer.listar(this,db);
        
        let cliente=null;
        for(let i=0;i<resp.data.length;i++){
            this.observadores.push(await new Cliente().procurarCod(resp.data[i].cli_cod,db));
        }
        while(this.observadores.length>0){
            cliente=this.observadores.pop();
            observer.deletar(this,cliente,db);
            cliente.atualizar();
        }
    }
    async procurarCod(cod,db){
        const resp=await new ServicoDAO().procurarCod(cod,db);
        let carro=null;
        let funcionario=null;
        //Verifica se o campo do car_id do serviço está nulo, se não estiver eu procuro o carro
        if(resp.data[0].car_id!=null)
            carro=await new Carro().procurarCod(resp.data[0].car_id,db);
        //Verifica se o campo do fun_cod do serviço está nulo, se não estiver eu procuro o funcionario
        if(resp.data[0].fun_cod!=null)
            funcionario=await new Funcionario().procurarCod(resp.data[0].fun_cod,db);
        let servico=new Servico(resp.data[0].ser_cod,carro,await (new Cliente().procurarCod(resp.data[0].cli_cod,db)),
                        funcionario,resp.data[0].ser_descricao,resp.data[0].ser_maoObra,
                        resp.data[0].ser_inicio,resp.data[0].ser_status,resp.data[0].ser_fim);
        //Procuro as peças que o serviço usou
        servico.setPecas(await (new ServicoPeca().listar(cod,db)));
        //Listo as contas do serviço
        servico.setContas(await (new ContaReceber().listarContasServico(cod,db)));
        //Calculo o valor total do serviço
        servico.calcularTotal();
        return servico;
    }
   
    async listarPorCliente(cli,db){
        const resp=await new ServicoDAO().listarPorCliente(cli.getCod(),db);
        let carro=null;
        let cliente=null;
        let funcionario=null;
        let servicos=[];
        let ser=null;

        for(let i=0;i<resp.data.length;i++){
            if(resp.data[i].car_id!==null)
                carro=await new Carro().procurarCod(resp.data[i].car_id,db);
            if(resp.data[i].fun_cod!==null)
                funcionario=await new Funcionario().procurarCod(resp.data[i].fun_cod,db);
            cliente=await new Cliente().procurarCod(resp.data[i].cli_cod,db);

            servicos.push(new Servico(resp.data[i].ser_cod,
                carro,
                cliente,
                funcionario,
                resp.data[i].ser_descricao,
                resp.data[i].mao_obra,
                resp.data[i].ser_inicio,
                resp.data[i].ser_status,
                resp.data[i].ser_fim));
            carro=null;
            cliente=null;
            funcionario=null;
        }
        return servicos;
    }
    async excluir(db){
        const resp = await new ServicoDAO().excluir(this,db);
        return resp;
    }
    async listarFiltros(cli_nome,dt_inicio,dt_saida,car_placa,status,db){
        const sers = await new ServicoDAO().listarFiltros(cli_nome,dt_inicio,dt_saida,car_placa,status,db);
        let servicos=[];
        let carro=null;
        let cliente=null;
        let funcionario=null;
        let ser=null
        for(let i=0;i<sers.data.length;i++){
            cliente=await new Cliente().procurarCod(sers.data[i].cli_cod,db);
            if(sers.data[i].car_id!=null)
                carro=await new Carro().procurarCod(sers.data[i].car_id,db);
            if(sers.data[i].fun_cod!=null)
                funcionario=await new Funcionario().procurarCod(sers.data[i].fun_cod,db);
            

                servicos.push(new Servico(sers.data[i].ser_cod,
                carro,
                cliente,
                funcionario,
                sers.data[i].ser_descricao,
                sers.data[i].mao_obra,
                sers.data[i].ser_inicio,
                sers.data[i].ser_status,
                sers.data[i].ser_fim));
            
            carro=null;
            cliente=null;
            funcionario=null;
        }
     
        return servicos;
    }
    async listarPorCarro(car,db){
        const sers=await new ServicoDAO().listarPorCarro(car.getId(),db);
        let servicos=[];
        let carro=null;
        let cliente=null;
        let funcionario=null;
        let ser=null;
        for(let i=0;i<sers.data.length;i++){
            if(sers.data[i].car_id!=null)
                carro=await new Carro().procurarCod(sers.data[i].car_id,db);
            if(sers.data[i].fun_cod!=null)
                funcionario=await new Funcionario().procurarCod(sers.data[i].fun_cod,db);
            cliente=await new Cliente().procurarCod(sers.data[i].cli_cod,db);

            servicos.push(new Servico(sers.data[i].ser_cod,
                            carro,
                            cliente,
                            funcionario,
                            sers.data[i].ser_descricao,
                            sers.data[i].mao_obra,
                            sers.data[i].ser_inicio,
                            sers.data[i].ser_status,
                           sers.data[i].ser_fim));
            carro=null;
            cliente=null;
            funcionario=null;
        }
        return servicos;
    }
    async listarPorCarroNull(cod,db){
        const sers=await new ServicoDAO().listarPorCarroNull(cod,db);
        let servicos=[];
        let carro=null;
        let cliente=null;
        let funcionario=null;
        for(let i=0;i<sers.data.length;i++){
            if(sers.data[i].car_id!=null)
                carro=await new Carro().procurarCod(sers.data[i].car_id,db);
            if(sers.data[i].fun_cod!=null)
                funcionario=await new Funcionario().procurarCod(sers.data[i].fun_cod,db);
            cliente=await new Cliente().procurarCod(sers.data[i].cli_cod,db);

            servicos.push(new Servico(sers.data[i].ser_cod,
                carro,
                cliente,
                funcionario,
                sers.data[i].ser_descricao,
                sers.data[i].mao_obra,
                sers.data[i].ser_inicio,
                sers.data[i].ser_status,
                sers.data[i].ser_fim));
            carro=null;
            cliente=null;
            funcionario=null;
        }
        return servicos;
    }
    calcularTotal(){
        this.total=this.ser_maoObra;
        for(let i=0;i<this.pecas.length;i++){
            this.total+=this.pecas[i].getTotal();
        }
    }
}