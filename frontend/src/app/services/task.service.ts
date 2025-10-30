import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseService } from './firebase.service';
import { Task, CreateTaskDto, UpdateTaskDto } from '../models/task.model';
import { where, orderBy } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject: BehaviorSubject<Task[]>;
  public tasks$: Observable<Task[]>;

  constructor(private firebaseService: FirebaseService) {
    this.tasksSubject = new BehaviorSubject<Task[]>([]);
    this.tasks$ = this.tasksSubject.asObservable();
  }

  async loadTasks(): Promise<void> {
    try {
      const tasks = await this.firebaseService.getDocuments('tasks');
      const mappedTasks: Task[] = tasks.map(task => ({
        ...task,
        createdAt: task.createdAt?.toDate ? task.createdAt.toDate() : new Date(task.createdAt),
        updatedAt: task.updatedAt?.toDate ? task.updatedAt.toDate() : new Date(task.updatedAt),
        dueDate: task.dueDate?.toDate ? task.dueDate.toDate() : task.dueDate
      } as Task));
      this.tasksSubject.next(mappedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
      throw error;
    }
  }

  async getTaskById(id: string): Promise<Task | null> {
    try {
      const task = await this.firebaseService.getDocumentById('tasks', id);
      if (!task) return null;
      
      return {
        ...task,
        createdAt: task.createdAt?.toDate ? task.createdAt.toDate() : new Date(task.createdAt),
        updatedAt: task.updatedAt?.toDate ? task.updatedAt.toDate() : new Date(task.updatedAt),
        dueDate: task.dueDate?.toDate ? task.dueDate.toDate() : task.dueDate
      } as Task;
    } catch (error) {
      console.error('Error getting task:', error);
      throw error;
    }
  }

  async createTask(taskData: CreateTaskDto, userId: string): Promise<Task> {
    try {
      const now = new Date();
      const newTask = {
        ...taskData,
        status: taskData.status || 'todo',
        priority: taskData.priority || 'medium',
        createdBy: userId,
        createdAt: now,
        updatedAt: now
      };

      const docRef = await this.firebaseService.addDocument('tasks', newTask);
      const createdTask: Task = {
        id: docRef.id,
        ...newTask
      } as Task;

      // Update local state
      const currentTasks = this.tasksSubject.value;
      this.tasksSubject.next([...currentTasks, createdTask]);

      return createdTask;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async updateTask(id: string, updates: UpdateTaskDto): Promise<void> {
    try {
      const updateData = {
        ...updates,
        updatedAt: new Date()
      };

      await this.firebaseService.updateDocument('tasks', id, updateData);

      // Update local state
      const currentTasks = this.tasksSubject.value;
      const updatedTasks = currentTasks.map(task =>
        task.id === id ? { ...task, ...updateData } : task
      );
      this.tasksSubject.next(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      await this.firebaseService.deleteDocument('tasks', id);

      // Update local state
      const currentTasks = this.tasksSubject.value;
      const filteredTasks = currentTasks.filter(task => task.id !== id);
      this.tasksSubject.next(filteredTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  async getTasksByStatus(status: string): Promise<Task[]> {
    try {
      const db = this.firebaseService.getFirestore();
      const tasksRef = (await import('firebase/firestore')).collection(db, 'tasks');
      const q = (await import('firebase/firestore')).query(
        tasksRef,
        (await import('firebase/firestore')).where('status', '==', status)
      );
      const querySnapshot = await (await import('firebase/firestore')).getDocs(q);
      
      const tasks: Task[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tasks.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt),
          dueDate: data.dueDate?.toDate ? data.dueDate.toDate() : data.dueDate
        } as Task);
      });
      
      return tasks;
    } catch (error) {
      console.error('Error getting tasks by status:', error);
      throw error;
    }
  }

  async getTasksByAssignee(userId: string): Promise<Task[]> {
    try {
      const db = this.firebaseService.getFirestore();
      const tasksRef = (await import('firebase/firestore')).collection(db, 'tasks');
      const q = (await import('firebase/firestore')).query(
        tasksRef,
        (await import('firebase/firestore')).where('assignedTo', '==', userId)
      );
      const querySnapshot = await (await import('firebase/firestore')).getDocs(q);
      
      const tasks: Task[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tasks.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt),
          dueDate: data.dueDate?.toDate ? data.dueDate.toDate() : data.dueDate
        } as Task);
      });
      
      return tasks;
    } catch (error) {
      console.error('Error getting tasks by assignee:', error);
      throw error;
    }
  }
}
