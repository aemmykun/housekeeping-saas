import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { getFirestore } from '../config/firebase';
import { Task, CreateTaskDto, UpdateTaskDto, TaskModel } from '../models/Task';

/**
 * Task Controller
 * Handles all task-related operations
 */

/**
 * Get all tasks
 * GET /api/tasks
 */
export async function getAllTasks(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const db = getFirestore();
    const tasksRef = db.collection('tasks');
    
    // Get query parameters for filtering
    const { status, assignedTo, priority } = req.query;
    
    let query: FirebaseFirestore.Query = tasksRef;
    
    if (status) {
      query = query.where('status', '==', status);
    }
    
    if (assignedTo) {
      query = query.where('assignedTo', '==', assignedTo);
    }
    
    if (priority) {
      query = query.where('priority', '==', priority);
    }
    
    const snapshot = await query.get();
    const tasks: Task[] = [];
    
    snapshot.forEach(doc => {
      tasks.push(TaskModel.fromFirestore(doc.id, doc.data()));
    });
    
    res.json({ success: true, data: tasks });
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
}

/**
 * Get a single task by ID
 * GET /api/tasks/:id
 */
export async function getTaskById(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const db = getFirestore();
    const taskRef = db.collection('tasks').doc(id);
    const doc = await taskRef.get();
    
    if (!doc.exists) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    
    const task = TaskModel.fromFirestore(doc.id, doc.data());
    res.json({ success: true, data: task });
  } catch (error) {
    console.error('Error getting task:', error);
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
}

/**
 * Create a new task
 * POST /api/tasks
 */
export async function createTask(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const taskData: CreateTaskDto = req.body;
    const userId = req.user?.uid;
    
    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }
    
    const now = new Date();
    const newTask: Omit<Task, 'id'> = {
      title: taskData.title,
      description: taskData.description,
      status: taskData.status || 'todo',
      priority: taskData.priority || 'medium',
      assignedTo: taskData.assignedTo,
      createdBy: userId,
      createdAt: now,
      updatedAt: now,
      dueDate: taskData.dueDate,
      tags: taskData.tags || [],
      estimatedHours: taskData.estimatedHours
    };
    
    const db = getFirestore();
    const taskRef = await db.collection('tasks').add(TaskModel.toFirestore(newTask));
    
    const createdTask: Task = {
      id: taskRef.id,
      ...newTask
    };
    
    res.status(201).json({ success: true, data: createdTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
}

/**
 * Update a task
 * PUT /api/tasks/:id
 */
export async function updateTask(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const updates: UpdateTaskDto = req.body;
    
    const db = getFirestore();
    const taskRef = db.collection('tasks').doc(id);
    const doc = await taskRef.get();
    
    if (!doc.exists) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    
    const updateData = {
      ...TaskModel.toFirestore(updates),
      updatedAt: new Date()
    };
    
    await taskRef.update(updateData);
    
    const updatedDoc = await taskRef.get();
    const updatedTask = TaskModel.fromFirestore(updatedDoc.id, updatedDoc.data());
    
    res.json({ success: true, data: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
}

/**
 * Delete a task
 * DELETE /api/tasks/:id
 */
export async function deleteTask(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const db = getFirestore();
    const taskRef = db.collection('tasks').doc(id);
    const doc = await taskRef.get();
    
    if (!doc.exists) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    
    await taskRef.delete();
    
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
}

/**
 * Get tasks by user
 * GET /api/tasks/user/:userId
 */
export async function getTasksByUser(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const { userId } = req.params;
    const db = getFirestore();
    const tasksRef = db.collection('tasks');
    
    const snapshot = await tasksRef.where('assignedTo', '==', userId).get();
    const tasks: Task[] = [];
    
    snapshot.forEach(doc => {
      tasks.push(TaskModel.fromFirestore(doc.id, doc.data()));
    });
    
    res.json({ success: true, data: tasks });
  } catch (error) {
    console.error('Error getting user tasks:', error);
    res.status(500).json({ error: 'Failed to retrieve user tasks' });
  }
}
