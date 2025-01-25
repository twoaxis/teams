document.getElementById("username-btn").addEventListener("click", () => {

    if(document.getElementById("username").value === "") {
        alert("Please enter a username"); // TODO: Proper error handling
    }
    else document.querySelector("form div#slides").style.left = "100%";
});
document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username");
    const password = document.getElementById("password");

    if(password.value === "") {
        alert("Please enter your password"); // TODO: Proper error handling
    }
    else {

        username.disabled = true;
        password.disabled = true;

        try {
            await axios({
                method: "POST",
                url: "/api/auth/login",
                data: {
                    username: username.value,
                    password: password.value
                }
            });
            console.log("Successfully logged in");

            window.location.reload();
        }
        catch(err) {

            username.disabled = false;
            password.disabled = false;

            document.querySelector("form div#slides").style.left = "0%";

            if(err.status === 401) {
                alert("Invalid username or password");
            }
        }
    }

})