
const submitButton = document.getElementById("submitButton");
const nameinput = document.getElementById("nameinput");
const senhaInput = document.getElementById("senhaInput");
const alertBox = document.getElementById("alert");

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const name = nameinput.value.trim();
    const senha = senhaInput.value.trim();

    if (!name) {
        showAlert("Por favor, insira um Usuário válido.", "error")
        return;
    }

    const erro = validarSenha(senha);

    if (erro.length > 0) {
    
        showAlert(erro.join(" \n"), "error");
        return;
    }

    showAlert(`Login realizado com sucesso! Usuário: ${name}`, "success");
    
    nameinput.value = "";
    senhaInput.value = "";




    //taina aqui em baixo a gente linka o back

});


function validarSenha(senha) {
    const regras = [
        { regex: /.{8,}/, msg: "A senha deve ter pelo menos 8 caracteres." },
        { regex: /[A-Z]/, msg: "A senha deve conter ao menos uma letra maiúscula." },
        { regex: /[a-z]/, msg: "A senha deve conter ao menos uma letra minúscula." },
        { regex: /[0-9]/, msg: "A senha deve conter ao menos um número." },
        { regex: /[!@#$%^&*(),.?":{}|<>]/, msg: "A senha deve conter ao menos um caractere especial." }
    ];

    const erros = regras
        .filter(regra => !regra.regex.test(senha))
        .map(regra => regra.msg);

    return erros;
}

function showAlert(message, type) {
    alertBox.textContent = message;
    alertBox.className = "alert"; 
    alertBox.classList.add(`alert-${type}`);
    alertBox.style.display = "block";

       
    setTimeout(() => {
        alertBox.style.display = "none";
    }, 10000);
}