document.getElementById("logout").addEventListener("click", async () => {
    await axios({
        method: "POST",
        url: "/api/auth/logout"
    });

    window.location = "/";
});