document.getElementById("manage_tasks").addEventListener("change", async function (event) {

    await axios({
        method: event.target.checked ? "PUT" : "DELETE",
        url: "/api/users/" + userId,
        data: {
            permission: "manage_tasks"
        }
    });
})
document.getElementById("manage_users").addEventListener("change", async function (event) {

    await axios({
        method: event.target.checked ? "PUT" : "DELETE",
        url: "/api/users/" + userId,
        data: {
            permission: "manage_users"
        }
    });
})