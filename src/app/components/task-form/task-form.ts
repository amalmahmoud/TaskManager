import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { AvatarModule } from 'primeng/avatar';
import { assignees, priorities, status } from '../../core/models/task.model';
import { FormErrorComponent } from '../../shared/components/form-error/form-error';
import { englishOnlyValidator, futureDateValidator } from '../../shared/utilitis/validators-utilitis';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    DatePickerModule,
    AvatarModule,
    FormErrorComponent,
  ],
  templateUrl: './task-form.html',
})
export class TaskFormComponent {
  visible: boolean = false;
  taskForm: FormGroup;
  isEditMode: boolean = false;
  taskAdded = output<any>();
  taskEdited = output<any>();
  editingTaskId: number | null = null;
  minDate: Date = new Date();
  priorities = priorities;
  assignees = assignees;
  status = status;
  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, englishOnlyValidator()]],
      description: ['', [Validators.maxLength(100), englishOnlyValidator()]],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      dueDate: [null, [Validators.required, futureDateValidator()]],
      assignee: [null],
    });
    this.minDate.setHours(0, 0, 0, 0);
  }
  showDialog() {
    this.visible = true;
    this.isEditMode = false;
    if (!this.isEditMode) {
      this.taskForm.reset();
    }
  }

  openEdit(task: any) {
    this.isEditMode = true;
    this.editingTaskId = task.id;
    this.visible = true;

    this.taskForm.patchValue({
      ...task,
      assignee: task.assignee,
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
    });
    console.log(this.taskForm);
  }

  editTask() {
    if (this.taskForm.valid) {
      const payload = {
        ...this.taskForm.value,
        id: this.editingTaskId ,
      };
      this.taskEdited.emit(payload);
      this.close();
    }
  }
  addTask() {
    if (this.taskForm.valid) {
      this.taskAdded.emit(this.taskForm.value);
    }
    this.close();
  }

  close() {
    this.visible = false;
    this.taskForm.reset();
    this.isEditMode = false;
    this.editingTaskId = null;
  }
}
