
const nomecainput = document.getElementById("nomecainput")
const emailinput = document.getElementById("emailinput");
const submitButton = document.getElementById("criacadas");
const alertBox = document.getElementById("alert");

submitButton.addEventListener("click", () => {

    const email = emailinput.value.trim();

        if (email && email.includes("@gmail.com")) {
            
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
    }, 10000); 
}