export interface Task {
  id?: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  tags?: string[];
  estimatedHours?: number;
  actualHours?: number;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  status?: 'todo' | 'in-progress' | 'done';
  priority?: 'low' | 'medium' | 'high';
  assignedTo?: string;
  dueDate?: Date;
  tags?: string[];
  estimatedHours?: number;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: 'todo' | 'in-progress' | 'done';
  priority?: 'low' | 'medium' | 'high';
  assignedTo?: string;
  dueDate?: Date;
  tags?: string[];
  estimatedHours?: number;
  actualHours?: number;
}

export class TaskModel {
  static fromFirestore(id: string, data: any): Task {
    return {
      id,
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      assignedTo: data.assignedTo,
      createdBy: data.createdBy,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      dueDate: data.dueDate?.toDate(),
      tags: data.tags || [],
      estimatedHours: data.estimatedHours,
      actualHours: data.actualHours
    };
  }

  static toFirestore(task: Partial<Task>): any {
    const data: any = {};
    
    if (task.title !== undefined) data.title = task.title;
    if (task.description !== undefined) data.description = task.description;
    if (task.status !== undefined) data.status = task.status;
    if (task.priority !== undefined) data.priority = task.priority;
    if (task.assignedTo !== undefined) data.assignedTo = task.assignedTo;
    if (task.createdBy !== undefined) data.createdBy = task.createdBy;
    if (task.createdAt !== undefined) data.createdAt = task.createdAt;
    if (task.updatedAt !== undefined) data.updatedAt = task.updatedAt;
    if (task.dueDate !== undefined) data.dueDate = task.dueDate;
    if (task.tags !== undefined) data.tags = task.tags;
    if (task.estimatedHours !== undefined) data.estimatedHours = task.estimatedHours;
    if (task.actualHours !== undefined) data.actualHours = task.actualHours;

    return data;
  }
}
