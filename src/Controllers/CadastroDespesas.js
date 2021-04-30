import api from '../../servicos/api';
import React,{useState,useEffect} from 'react';
import history from '../../history'
import './cadastroDespesas.css'
import '../../app.css'
import Header from '../../Components/Header'
function CadastroDespesa(){
    const[desc,setDesc]=useState('');
    const[valor,setValor]=useState('');
    const[codigo,setCod]=useState('');
    
    useEffect(()=>{
        setCod(localStorage.getItem('des_cod'));
        carregarDespesas();
    },[]);
    const carregarDespesas = async () => {
        const response= await api.get('/despesas/'+localStorage.getItem('des_cod'));
        setDespesas(response.data);
    }
    async function Excluir(codigo){
        await api.delete('/contato/'+codigo);
        setDespesas(despesas.filter(despesas=>despesas.des_cod!==codigo));
    }
    function vazio(valor){
        let v=''+valor;
        if(v.length<=0)
            return true;
        return false;
    }
    async function cadastrarDespesas(e){
        e.preventDefault();
        let mensagem = document.querySelector("#mensagem");
        mensagem.innerHTML="";

        if(!vazio(tipo)){
            
            await api.post('/despesas',{
                des_cod: cod,
                des_desc: desc,
                des_valor: valor

            })
            carregarDespesas();
            alert('Despesas cadastrado');
            setDesc('');
            setValor('');
        }
        else{
            if(vazio(tipo))
                mensagem.innerHTML+="<p>Escolha o tipo</p>";
        }
        
    }