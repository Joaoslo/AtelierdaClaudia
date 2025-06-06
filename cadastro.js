document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("formCadastro");
    const alertBox = document.getElementById("alert");
    const cpfInput = document.getElementById("cpf");
    const celularInput = document.getElementById("celular");

cpfInput.addEventListener("input", () => {
    let value = cpfInput.value;

    value = value.replace(/\D/g, "");

    if (value.length > 11) {
        value = value.slice(0, 11);
    } 


    if (value.length > 9) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    } else if (value.length > 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else if (value.length > 3) {
        value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    }

    cpfInput.value = value;
});

    celularInput.addEventListener("input", () => {
        let value = celularInput.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length <= 10) {
            value = value.replace(/(\d{2})(\d)/, "($1) $2");
            value = value.replace(/(\d{4})(\d)/, "$1-$2");
        } else {
            value = value.replace(/(\d{2})(\d)/, "($1) $2");
            value = value.replace(/(\d{5})(\d)/, "$1-$2");
        }
        celularInput.value = value;
    });

  
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = form.nome.value.trim();
        const sobrenome = form.sobrenome.value.trim();
        const username = form.username.value.trim();
        const email = form.email.value.trim();
        const senha = form.senha.value.trim();
        const cpf = form.cpf.value.trim();

        if (nome.length < 2 || sobrenome.length < 2) {
            return showAlert("Nome e sobrenome devem ter pelo menos 2 letras.", "error");
        }

        if (email && email.includes("@gmail.com")) {
            return showAlert("Insira um e-mail válido.", "error");
        }

        if (senha.length < 6) {
            return showAlert("A senha deve ter pelo menos 6 caracteres.", "error");
        }

        if (cpf.length < 14) {
            return showAlert("CPF incompleto. Formato esperado: 000.000.000-00", "error");
        }

        // Enviar os dados
        const formData = new FormData(form);

        fetch("salvar_cliente.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showAlert(data.message || "Cadastro realizado com sucesso!", "success");
                setTimeout(() => window.location.href = "login.html", 2000);
            } else {
                showAlert(data.message || "Erro ao cadastrar. Tente novamente.", "error");
            }
        })
        .catch(() => {
            showAlert("Erro de rede. Verifique sua conexão ou tente mais tarde.", "error");
        });
    });

    function showAlert(message, type) {
        alertBox.textContent = message;
        alertBox.className = "alert alert-" + type;
        alertBox.style.display = "block";

        setTimeout(() => {
            alertBox.style.display = "none";
        }, 4000);
    }
});
