import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Task, TaskStatus, KanbanColumn, TaskPriority } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit, OnDestroy {
  columns: KanbanColumn[] = [
    { id: TaskStatus.TODO, title: 'To Do', tasks: [] },
    { id: TaskStatus.IN_PROGRESS, title: 'In Progress', tasks: [] },
    { id: TaskStatus.DONE, title: 'Done', tasks: [] }
  ];

  private tasksSubscription?: Subscription;
  isLoading = false;
  error: string | null = null;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  ngOnDestroy(): void {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }

  loadTasks(): void {
    this.isLoading = true;
    this.error = null;

    this.tasksSubscription = this.taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.organizeTasks(tasks);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.error = 'Failed to load tasks. Please try again.';
        this.isLoading = false;
      }
    });
  }

  organizeTasks(tasks: Task[]): void {
    // Reset all columns
    this.columns.forEach(column => column.tasks = []);

    // Distribute tasks to columns based on status
    tasks.forEach(task => {
      const column = this.columns.find(col => col.id === task.status);
      if (column) {
        column.tasks.push(task);
      }
    });
  }

  async drop(event: CdkDragDrop<Task[]>, targetStatus: TaskStatus): Promise<void> {
    if (event.previousContainer === event.container) {
      // Reorder within the same column
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Move to different column
      const task = event.previousContainer.data[event.previousIndex];
      
      try {
        // Update task status in Firestore
        if (task.id) {
          await this.taskService.updateTaskStatus(task.id, targetStatus);
        }

        // Update UI
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } catch (error) {
        console.error('Error updating task status:', error);
        this.error = 'Failed to update task. Please try again.';
      }
    }
  }

  openNewTaskDialog(): void {
    // TODO: Open dialog to create new task
    console.log('Open new task dialog');
  }

  openEditTaskDialog(task: Task): void {
    // TODO: Open dialog to edit task
    console.log('Edit task:', task);
  }

  async deleteTask(taskId: string | undefined): Promise<void> {
    if (!taskId) return;

    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await this.taskService.deleteTask(taskId);
      } catch (error) {
        console.error('Error deleting task:', error);
        this.error = 'Failed to delete task. Please try again.';
      }
    }
  }

  getConnectedLists(): string[] {
    return this.columns.map(col => col.id);
  }

  getPriorityClass(priority: TaskPriority): string {
    return `priority-${priority}`;
  }
}
