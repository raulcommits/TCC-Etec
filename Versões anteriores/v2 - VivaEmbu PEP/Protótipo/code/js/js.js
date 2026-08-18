function cadastro() {
    const name = document.getElementById("input_cadName").value;
    const cpf = document.getElementById("input_cadCPF").value;
    const email = document.getElementById("input_cadEmail").value;
    const password = document.getElementsById("input_cadPassword").value;  

    const data = {name, cpf, email, password}

    //fetch: executa a msm fnução que o insomnia
    fetch("http://localhost:3333/cadastro", {
        method: "POST",
        body: data
    }).then(() => {
        alert("Cadastrado com sucesso")
    }).catch((erro) => {
        alert("Erro ao cadastrar" + erro)
    })

}