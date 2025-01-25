document.getElementById("autogenerate").addEventListener("change", function (event) {
    document.getElementById("password-div").style.display = "none";
    document.getElementById("password").value = "";
});
document.getElementById("manual").addEventListener("change", function (event) {
    document.getElementById("password-div").style.display = "block";
});

document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const reportingTo = document.getElementById("reportingTo");

    if(name.value === "" || username.value === "") {
        alert("Please fill all fields");
    }
    else {
        try {
            const { data } = await axios({
                method: "PUT",
                url: "/api/users",
                data: {
                    name: name.value,
                    username: username.value,
                    password: password.value === 0 ? null : password.value,
                    reportingTo: reportingTo.value === "" ? null : parseInt(reportingTo.value)
                }
            });

            alert(`Success!\n\nUsername: ${data.username}\nPassword: ${data.password}`);

            window.location = "/manage-users";
        }
        catch(error) {
            if(error.status === 409) {
                alert("Username already exists!");
            }
            else {
                alert("Unknown error");
            }
        }
    }
});