document.getElementById("email-btn").addEventListener("click", () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailRegex.test(document.getElementById("email").value)) {
        alert("Please enter a valid email"); // TODO: Proper error handling
    }
    else document.querySelector("form div#slides").style.left = "100%";
});
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if(password.value === "") {
        alert("Please enter your password"); // TODO: Proper error handling
    }
    else {

        email.disabled = true;
        password.disabled = true;

        // Send request here.

        /*
            If invalid email or password:

            document.querySelector("form div#slides").style.left = "0%";
            email.disabled = false;
            password.disabled = false;

         */
    }

})