import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import {CreateTaskDto} from './dto/create-task.dto'
import { TaskStatusValidationPipe } from './pipes/TaskStatusValidation.pipe';
import { TaskStatus } from './taskstatusenum';
import {TaskStatusFilter} from '../task/dto/taskstatus.filter.dto'

@Controller('task')
export class TaskController {
    constructor(private taskService:TaskService){}

  /* @Get()
   getTask(@Query(ValidationPipe)filterdto:TaskStatusFilter):Promise<Task[]>{
       
       return this.taskService.getTask(filterdto)
       

   }*/

  @Get()
   getTask():Promise<Task[]>{
       return this.taskService.getTask()
   }


    @Get('/:id')
    getTaskById(@Param('id',ParseIntPipe)id:number):Promise<Task>{
        return this.taskService.getTaskById(id)
    }

    @Post()
    createTask(@Body()createTaskDto:CreateTaskDto):Promise<Task>{
        return this.taskService.createTask(createTaskDto)
    }

    @Delete('/:id')
    deleteTask(@Param('id',ParseIntPipe)id:number):Promise<void>{
       return this.taskService.deleteTask(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id',ParseIntPipe)id:number,
        @Body('status',TaskStatusValidationPipe)status:TaskStatus):Promise<Task>{
            return this.taskService.updateTaskStatus(id,status)
        }

    
}
