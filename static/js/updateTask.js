if(taskStatus !== "cancelled" && taskStatus !== "done")
document.getElementById("cancel").addEventListener("click", async () => {
    await axios({
        method: "POST",
        url: "/api/tasks/" + taskId,
        data: {
            status: "cancelled"
        }
    });

    window.location.reload();
});
if(taskStatus === "ready") {

    document.getElementById("in_progress").addEventListener("click", async () => {
        await axios({
            method: "POST",
            url: "/api/tasks/" + taskId,
            data: {
                status: "in_progress"
            }
        });

        window.location.reload();
    });
}
if(taskStatus === "in_progress") {
    document.getElementById("done").addEventListener("click", async () => {
        console.log("hello");
        await axios({
            method: "POST",
            url: "/api/tasks/" + taskId,
            data: {
                status: "done"
            }
        });

        window.location.reload();
    });
}