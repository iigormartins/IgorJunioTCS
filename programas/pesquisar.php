<?php

	##RECEBE OS DADOS
	$tabela = $_POST['tabela'];
	$campos = $_POST['campos'];
	$condicao = $_POST['condicao'];
	
	$return = array(); ##RESPONSAVEL POR RETORNA O STATUS DA OPERAÇÃO SE FALHOU OU N

	##ABRE A CONEXÃO COM O BANCO DE DADOS
	try{
		$conexao = mysqli_connect('localhost','id5255737_root','igor12345', 'id5255737_maquinas');
	}catch(Exception $e){
		$return = FALSE;
	}

	##MONTA A QUERY
	$query = "SELECT ".$campos." FROM ".$tabela;
	if($condicao != ""){
		$query .= " WHERE ".$condicao;
	}

	$resultado = $conexao->query($query);

	if ($resultado->num_rows > 0) {
		while($row = $resultado->fetch_assoc()) {
			$return[] = $row;
		}
	}

	$conexao->close();	

	echo json_encode($return);

?>