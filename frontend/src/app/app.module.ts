import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FirebaseService } from './services/firebase.service';
import { AuthService } from './services/auth.service';
import { TaskService } from './services/task.service';

import { NavbarComponent } from './components/navbar/navbar.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: KanbanBoardComponent },
  { path: 'tasks', component: KanbanBoardComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NavbarComponent,
    KanbanBoardComponent,
    TaskCardComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    FirebaseService,
    AuthService,
    TaskService
  ],
  bootstrap: []
})
export class AppModule { }
