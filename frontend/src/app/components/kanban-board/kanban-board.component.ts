import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { Task, CreateTaskDto } from '../../models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit, OnDestroy {
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];
  
  private destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.subscribeToTasks();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async loadTasks(): Promise<void> {
    try {
      await this.taskService.loadTasks();
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  }

  private subscribeToTasks(): void {
    this.taskService.tasks$
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => {
        this.todoTasks = tasks.filter(task => task.status === 'todo');
        this.inProgressTasks = tasks.filter(task => task.status === 'in-progress');
        this.doneTasks = tasks.filter(task => task.status === 'done');
      });
  }

  async onTaskDrop(event: any, newStatus: 'todo' | 'in-progress' | 'done'): Promise<void> {
    // Handle drag and drop logic
    const taskId = event.dataTransfer.getData('taskId');
    if (taskId) {
      try {
        await this.taskService.updateTask(taskId, { status: newStatus });
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  async createTask(status: 'todo' | 'in-progress' | 'done'): Promise<void> {
    const user = this.authService.currentUserValue;
    if (!user) return;

    const newTask: CreateTaskDto = {
      title: 'New Task',
      description: '',
      status,
      priority: 'medium'
    };

    try {
      await this.taskService.createTask(newTask, user.uid);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }

  getPriorityClass(priority: string): string {
    return `priority-${priority}`;
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'todo': 'To Do',
      'in-progress': 'In Progress',
      'done': 'Done'
    };
    return labels[status] || status;
  }
}
