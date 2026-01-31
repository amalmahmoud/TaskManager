import { formatDate } from "@angular/common";
import { statusLookup, Task } from "../../core/models/task.model";

  export function determineChange(oldTask: Task | undefined, newTask: Task): string {
    if (!oldTask) return 'Updated task details';
    if (oldTask.status !== newTask.status)
      return `Changed status to ${statusLookup[newTask.status].label}`;
    if (oldTask.assignee.name !== newTask.assignee.name)
      return `Changed assignee to ${newTask.assignee.name}`;
    if (oldTask.priority !== newTask.priority) return `Changed priority to ${newTask.priority}`;
    if (oldTask.dueDate !== newTask.dueDate) {
      const formattedDate = formatDate(newTask.dueDate, 'mediumDate', 'en-US');
      return `Changed Due Date to ${formattedDate}`;
    }
    if (oldTask.title !== newTask.title) return `Changed title to ${newTask.title}`;
    if (oldTask.description !== newTask.description)
      return `Changed description to ${newTask.description}`;

    return 'Edited task info';
  }