document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title");
    const description = document.getElementById("description");

    if(title.value === "" || description.value === "") {
        alert("Please fill all fields");
    }
    else {
        try {
            await axios({
                method: "PUT",
                url: "/api/tasks/" + userId,
                data: {
                    title: title.value,
                    description: description.value,
                }
            });

            window.location = "/manage-tasks/" + userId;
        }
        catch(error) {
            alert("Unknown error");
        }
    }
});