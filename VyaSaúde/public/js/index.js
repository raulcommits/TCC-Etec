function quantidadeCaracteres() {
    if (input.value.length !== 11) {
      input.setCustomValidity("O CPF inserido precisa ser de 11 números válidos.");
    } else {
      input.setCustomValidity("");
    }
}









// testes.. ignorar.

function criar(rodape) {
    for (const r of rodapes) {
        var footer = document.createElement('footer');
        var p = document.createElement('p');
        p.innerHTML = 'Teste';
        
    }
}