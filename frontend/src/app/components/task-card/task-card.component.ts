import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() taskUpdated = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<string>();

  constructor(private taskService: TaskService) {}

  onDragStart(event: DragEvent): void {
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('taskId', this.task.id);
    }
  }

  async deleteTask(): Promise<void> {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await this.taskService.deleteTask(this.task.id);
        this.taskDeleted.emit(this.task.id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  }

  getPriorityClass(): string {
    return `priority-${this.task.priority}`;
  }

  getPriorityLabel(): string {
    return this.task.priority.charAt(0).toUpperCase() + this.task.priority.slice(1);
  }

  formatDate(date?: Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString();
  }

  isOverdue(): boolean {
    if (!this.task.dueDate) return false;
    const today = new Date();
    const dueDate = new Date(this.task.dueDate);
    return dueDate < today && this.task.status !== 'done';
  }
}
