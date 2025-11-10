class Task {
  constructor(data) {
    this.title = data.title;
    this.description = data.description;
    this.status = data.status || 'todo';
    this.assignedTo = data.assignedTo || null;
    this.assignedToName = data.assignedToName || null;
    this.createdBy = data.createdBy;
    this.createdByName = data.createdByName || null;
    this.priority = data.priority || 'medium';
    this.dueDate = data.dueDate || null;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  // Validation
  static validate(data) {
    const errors = [];

    if (!data.title || data.title.trim() === '') {
      errors.push('Title is required');
    }

    if (!data.description || data.description.trim() === '') {
      errors.push('Description is required');
    }

    if (data.status && !['todo', 'in-progress', 'done'].includes(data.status)) {
      errors.push('Invalid status. Must be: todo, in-progress, or done');
    }

    if (data.priority && !['low', 'medium', 'high'].includes(data.priority)) {
      errors.push('Invalid priority. Must be: low, medium, or high');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Convert to plain object
  toJSON() {
    return {
      title: this.title,
      description: this.description,
      status: this.status,
      assignedTo: this.assignedTo,
      assignedToName: this.assignedToName,
      createdBy: this.createdBy,
      createdByName: this.createdByName,
      priority: this.priority,
      dueDate: this.dueDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Task;
