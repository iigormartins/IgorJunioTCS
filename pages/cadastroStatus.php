<h2>Registro de Status:</h2>
<table class="menuOperacao">
	<tr>
		<td class="opcaoOperacao selected" id="cadastrar"><p>Cadastrar</p></td>
		<td class="opcaoOperacao" id="atualizar"><p>Atualizar</p></td>
		<td class="opcaoOperacao" id="excluir"><p>Remover</p></td>
	</tr>
</table>
<form id="formStatus">
  <div>
    <label>Código do Status:</label>
    <input type="type" id="codStatus" maxlength="100" size="20" style="margin-left: 34px;">
  </div>
  <div>
    <label>Nome da Status:</label>
    <input type="type" id="nomeStatus" maxlength="100" size="85" style="margin-left: 40px;">
  </div>
  <div>
  	<label>Status Cadastrados:</label>
  	<select id="statusCadastrados" disabled="disabled" style="width: 300px; margin-left: 19px;">
  		<option value=""></option>
  	</select>
  </div>
  <div>
    <input type="button" id="gravarRegistro" value="Gravar">
    <input type="hidden" id="excluiRegistro" value="Excluir">
  </div>
</form>