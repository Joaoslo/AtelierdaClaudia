
const submitButton = document.getElementById("submitButton");
const emailInput = document.getElementById("emailInput");
const alertBox = document.getElementById("alert");

submitButton.addEventListener("click", () => {

    const email = emailInput.value.trim();

        if (email && email.includes("@gmail.com")) {
            showAlert("Sucesso! Email enviado.", "success");
        } else {
            showAlert("Por favor, insira um e-mail válido.", "error");
    }

});


function showAlert(message, type) {
    alertBox.textContent = message;
    alertBox.className = "alert"; 
    alertBox.classList.add(`alert-${type}`);
    alertBox.style.display = "block";

       
    setTimeout(() => {
        alertBox.style.display = "none";
    }, 3000); // 3 segundos (milesegundos)
}