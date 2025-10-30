export interface Task {
  id: string;
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
