import { Router } from "express";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import TaskService from "../../services/TaskService";

const router = Router();

router.post("/:id", AuthMiddleware, async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;

	const taskService = new TaskService();

	await taskService.updateTaskStatus(req["uid"], parseInt(id), status);
	res.status(200).send();
});

//--------------------------------
import { Request, Response } from "express";
import { User } from "../../models/User";
import { Task } from "../../models/Task";
import { Permissions } from "../../enums/Permissions";
import { Permission } from "../../models/Permission";

// Assign Task
export async function assignTask(req: Request, res: Response) {
    try {
        const { taskId, userId } = req.body;

        // Step 1: Validate inputs
        if (!taskId || !userId) {
            return res.status(400).json({ error: "Task ID and User ID are required." });
        }

        // Step 2: Verify the task exists
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ error: "Task not found." });
        }

        // Step 3: Verify the user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Step 4: Permission check
        const requestingUserId = req.user.id; // Assuming `req.user` contains the authenticated user
        const hasPermission = await Permission.findOne({
            where: {
                userId: requestingUserId,
                permission: Permissions.ASSIGN_TASKS,
            },
        });

        if (!hasPermission) {
            return res.status(403).json({ error: "You do not have permission to assign tasks." });
        }

        // Step 5: Assign the task to the user
        task.assignedTo = userId; // Assuming `assignedTo` exists in Task model
        await task.save();

        res.status(200).json({ message: "Task assigned successfully.", task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An unexpected error occurred." });
    }
}

// Unassign Task
export async function unassignTask(req: Request, res: Response) {
    try {
        const { taskId } = req.body;

        // Step 1: Validate input
        if (!taskId) {
            return res.status(400).json({ error: "Task ID is required." });
        }

        // Step 2: Verify the task exists
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ error: "Task not found." });
        }

        // Step 3: Permission check
        const requestingUserId = req.user.id; // Assuming `req.user` contains the authenticated user
        const hasPermission = await Permission.findOne({
            where: {
                userId: requestingUserId,
                permission: Permissions.ASSIGN_TASKS,
            },
        });

        if (!hasPermission) {
            return res.status(403).json({ error: "You do not have permission to unassign tasks." });
        }

        // Step 4: Unassign the task
        task.assignedTo = null; // Set the `assignedTo` field to null
        await task.save();

        res.status(200).json({ message: "Task unassigned successfully.", task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An unexpected error occurred." });
    }
}

export default router;