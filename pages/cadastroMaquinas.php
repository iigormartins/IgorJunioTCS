<h2>Registro de Maquinas:</h2>
<table class="menuOperacao">
	<tr>
		<td class="opcaoOperacao selected" id="cadastrar"><p>Cadastrar</p></td>
		<td class="opcaoOperacao" id="atualizar"><p>Atualizar</p></td>
		<td class="opcaoOperacao" id="excluir"><p>Remover</p></td>
	</tr>
</table>
<form id="formMaquina">
  <div>
    <label>Nome da Maquina:</label>
    <input type="type" id="nomeMaquina" maxlength="100" size="85" style="margin-left: 40px;">
  </div>
  <div>
  	<label>Maquinas Cadastradas:</label>
  	<select id="maquinasCadastradas" disabled="disabled" style="width: 300px; margin-left: 14px;">
  		<option></option>
  	</select>
  </div>
  <div>
    <input type="button" id="gravarRegistro" value="Gravar">
    <input type="hidden" id="excluiRegistro" value="Excluir">
  </div>
</form>