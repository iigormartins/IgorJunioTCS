<?php

	##RECEBE OS DADOS
	$tabela = $_POST['tabela'];
	$campos = $_POST['campos'];
	$valores = $_POST['valores'];
	
	$return = TRUE; ##RESPONSAVEL POR RETORNA O STATUS DA OPERAÇÃO SE FALHOU OU N

	##ABRE A CONEXÃO COM O BANCO DE DADOS
	try{
		$conexao = mysqli_connect('localhost','id5255737_root','igor12345', 'id5255737_maquinas');
	}catch(Exception $e){
		$return = FALSE;
	}

	##MONTA A QUERY
	$query = "INSERT INTO ".$tabela." (".$campos.") VALUES (".$valores.")";
	
	##EXECUTA A QUERY
	try{
		mysqli_query($conexao, $query);	
	}catch(Exception $e){
		$return =  FALSE;
	}	

	$conexao->close();	

	echo json_encode($return);

?>