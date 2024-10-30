import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddTaskModalComponent } from './add-task-modal.component';
import { TaskStatus } from './task-status';
import { AppService } from './app.service';
import Task from './models/task';
import { CreateTaskDto } from './models/create-task.dto';
import { UpdateTaskDto } from './models/update-task.dto';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    MatDialogModule,
  ],
  providers: [AppService],
})
export class AppComponent implements OnInit {
  TaskStatus = TaskStatus;
  tasks: Task[] = [];

  constructor(private appService: AppService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  async loadTasks() {
    try {
      const data = await firstValueFrom(this.appService.getTasks());
      this.tasks = data;
      console.log(this.tasks);
    } catch (err) {
      console.error('Erro ao buscar tarefas:', err);
    }
  }

  filterText: any;

  openAddTaskModal() {
    const dialogRef = this.dialog.open(AddTaskModalComponent);
    dialogRef.afterClosed().subscribe((result: CreateTaskDto) => {
      if (result) {
        const newTask: CreateTaskDto = {
          title: result.title,
          description: result.description,
          status: 0,
        };

        this.appService.createTask(newTask).subscribe({
          next: (createdTask) => {
            this.tasks.push(createdTask);
          },
          error: (err) => {
            console.error('Erro ao criar tarefa:', err);
          },
        });
      }
    });
  }

  filteredTasks(): Task[] {
    const lowerCaseFilter = this.filterText
      ? this.filterText.toLowerCase()
      : '';

    return this.tasks
      .filter((task) => task.title.toLowerCase().includes(lowerCaseFilter))
      .sort((a, b) => {
        if (a.status === TaskStatus.DONE && b.status === TaskStatus.TODO) {
          return 1;
        }
        if (a.status === TaskStatus.TODO && b.status === TaskStatus.DONE) {
          return -1;
        }
        return a.end && b.end ? b.end.getTime() - a.end.getTime() : 0;
      });
  }

  markAsDone(task: Task) {
    const updatedTask: UpdateTaskDto = { status: TaskStatus.DONE };

    this.appService.updateTask(task.id, updatedTask).subscribe({
      next: (updated) => {
        const index = this.tasks.findIndex((t) => t.id === task.id);
        if (index !== -1) {
          this.tasks[index] = updated;
        }
      },
      error: (err) => {
        console.error('Erro ao atualizar tarefa:', err);
      },
      complete: () => {
        this.loadTasks();
      },
    });
  }

  deleteTask(task: Task) {
    this.appService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
        console.log(`Tarefa ${task.id} deletada com sucesso.`);
      },
      error: (err) => {
        console.error('Erro ao deletar a tarefa:', err);
      },
    });
  }
}
