const form = document.getElementById("loginForm");
const submitButton = document.getElementById("submitButton");
const nameinput = document.getElementById("nameinput");
const senhaInput = document.getElementById("senhaInput");
const alertBox = document.getElementById("alert");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = nameinput.value.trim();
    const senha = senhaInput.value.trim();

    // Validação básica do frontend
    if (!username) {
        showAlert("Por favor, insira um Usuário válido.", "error");
        return;
    }

    if (!senha) {
        showAlert("Por favor, insira sua senha.", "error");
        return;
    }

    // Validação mais complexa da senha (opcional)
    const errosSenha = validarSenha(senha);
    if (errosSenha.length > 0) {
        showAlert(errosSenha.join(" \n"), "error");
        return;
    }

    try {
        // Envia os dados para o backend
        const response = await fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${encodeURIComponent(username)}&senha=${encodeURIComponent(senha)}`
        });

        const data = await response.json();

        if (data.success) {
            showAlert(`Login realizado com sucesso! Redirecionando...`, "success");
            
            // Limpa os campos
            nameinput.value = "";
            senhaInput.value = "";
            
            // Redireciona após 2 segundos
            setTimeout(() => {
                window.location.href = "index.html"; // Ou para a página de dashboard
            }, 2000);
        } else {
            showAlert(data.message || "Credenciais inválidas", "error");
        }
    } catch (error) {
        console.error('Erro:', error);
        showAlert("Erro ao conectar com o servidor", "error");
    }
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
    }, 3000);
}