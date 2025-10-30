import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc, query, where, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task, TaskStatus } from '../models/task.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksCollection = collection(this.firestore, 'tasks');

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {}

  getTasks(): Observable<Task[]> {
    const user = this.authService.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Query tasks where user is creator or assignee
    const q = query(
      this.tasksCollection,
      orderBy('createdAt', 'desc')
    );

    return collectionData(q, { idField: 'id' }) as Observable<Task[]>;
  }

  getTaskById(id: string): Observable<Task> {
    const taskDoc = doc(this.firestore, `tasks/${id}`);
    return docData(taskDoc, { idField: 'id' }) as Observable<Task>;
  }

  async createTask(task: Partial<Task>): Promise<any> {
    const user = this.authService.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const newTask = {
      ...task,
      createdBy: user.uid,
      createdByName: user.displayName || user.email,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: task.status || TaskStatus.TODO
    };

    return await addDoc(this.tasksCollection, newTask);
  }

  async updateTask(id: string, task: Partial<Task>): Promise<void> {
    const taskDoc = doc(this.firestore, `tasks/${id}`);
    const updateData = {
      ...task,
      updatedAt: new Date()
    };
    return await updateDoc(taskDoc, updateData);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<void> {
    const taskDoc = doc(this.firestore, `tasks/${id}`);
    return await updateDoc(taskDoc, {
      status,
      updatedAt: new Date()
    });
  }

  async deleteTask(id: string): Promise<void> {
    const taskDoc = doc(this.firestore, `tasks/${id}`);
    return await deleteDoc(taskDoc);
  }
}
