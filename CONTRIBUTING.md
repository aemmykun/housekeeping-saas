# Contributing to Housekeeping SaaS

Thank you for your interest in contributing to this project! This guide will help you get started.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Give and receive constructive feedback gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear title and description
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, Node version)

### Suggesting Features

Feature requests are welcome! Please create an issue with:
- Clear description of the feature
- Use cases and benefits
- Any mockups or examples
- Implementation ideas (optional)

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write or update tests if applicable
5. Update documentation
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Development Setup

See the [QUICKSTART.md](QUICKSTART.md) guide for detailed setup instructions.

Quick version:
```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/housekeeping-saas.git
cd housekeeping-saas

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Set up environment files
cd ../backend && cp .env.example .env
# Update .env with your Firebase credentials

# Start development servers
cd backend && npm run dev  # Terminal 1
cd frontend && ng serve    # Terminal 2
```

## Project Structure

### Frontend (Angular)
```
frontend/src/app/
├── components/     # UI components
├── services/       # Business logic and API calls
├── models/         # TypeScript interfaces
├── guards/         # Route protection
└── app.module.ts   # Main module
```

### Backend (Node.js)
```
backend/src/
├── controllers/    # Request handlers
├── services/       # Business logic
├── models/         # Data models
├── routes/         # API routes
├── middleware/     # Express middleware
├── config/         # Configuration
└── server.js       # App entry point
```

## Coding Standards

### General
- Use meaningful variable and function names
- Write comments for complex logic
- Keep functions small and focused
- Follow DRY (Don't Repeat Yourself) principle
- Write self-documenting code

### Frontend (TypeScript/Angular)
- Follow [Angular Style Guide](https://angular.io/guide/styleguide)
- Use TypeScript strict mode
- Use async/await for promises
- Use RxJS observables for reactive programming
- Use Angular Material components consistently
- Component naming: `feature-name.component.ts`
- Service naming: `feature-name.service.ts`

Example component:
```typescript
@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss']
})
export class MyComponent implements OnInit {
  // Public properties first
  public items: Item[] = [];
  
  // Private properties
  private subscription?: Subscription;

  constructor(
    private myService: MyService
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private loadItems(): void {
    // Implementation
  }
}
```

### Backend (JavaScript/Node.js)
- Use async/await for asynchronous operations
- Use meaningful error messages
- Always handle errors properly
- Use middleware for common functionality
- Follow RESTful API conventions
- Use descriptive route names

Example controller:
```javascript
async function createItem(req, res, next) {
  try {
    const itemData = {
      ...req.body,
      createdBy: req.user.uid,
      createdAt: new Date().toISOString()
    };

    const item = await itemService.create(itemData);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}
```

## Testing

### Frontend Tests
```bash
cd frontend
ng test
```

### Backend Tests
```bash
cd backend
npm test
```

## Documentation

- Update README.md if you change setup steps
- Update API documentation for new endpoints
- Add JSDoc comments for complex functions
- Update QUICKSTART.md if needed

## Git Commit Messages

Write clear commit messages:
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- First line: brief summary (50 chars or less)
- Add detailed description if needed

Good examples:
```
Add drag-and-drop functionality to task cards
Fix authentication bug in login component
Update README with deployment instructions
Refactor task service to use async/await
```

## Adding New Features

### Example: Adding a "Priority" Filter to Kanban Board

1. **Update the model** (if needed)
```typescript
// frontend/src/app/models/task.model.ts
export interface TaskFilter {
  status?: TaskStatus;
  priority?: TaskPriority;
  assignedTo?: string;
}
```

2. **Update the service**
```typescript
// frontend/src/app/services/task.service.ts
getFilteredTasks(filter: TaskFilter): Observable<Task[]> {
  // Implementation
}
```

3. **Update the component**
```typescript
// frontend/src/app/components/kanban-board/kanban-board.component.ts
filterByPriority(priority: TaskPriority): void {
  this.currentFilter = { priority };
  this.loadTasks();
}
```

4. **Update the template**
```html
<!-- frontend/src/app/components/kanban-board/kanban-board.component.html -->
<mat-select (selectionChange)="filterByPriority($event.value)">
  <mat-option value="high">High Priority</mat-option>
  <mat-option value="medium">Medium Priority</mat-option>
  <mat-option value="low">Low Priority</mat-option>
</mat-select>
```

5. **Add backend endpoint** (if needed)
```javascript
// backend/src/controllers/task.controller.js
async function getFilteredTasks(req, res, next) {
  try {
    const { priority } = req.query;
    // Implementation
  } catch (error) {
    next(error);
  }
}
```

6. **Write tests**
```typescript
// frontend/src/app/components/kanban-board/kanban-board.component.spec.ts
it('should filter tasks by priority', () => {
  // Test implementation
});
```

## Review Process

1. All submissions require code review
2. Maintainers will review your PR
3. Address any feedback or requested changes
4. Once approved, your PR will be merged

## Questions?

- Open an issue for questions
- Check existing issues and PRs first
- Be patient and respectful

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
