import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import {Task} from './task.entity'
import { TaskStatus } from './taskstatusenum';
import {CreateTaskDto} from './dto/create-task.dto'
import { TaskStatusFilter } from './dto/taskstatus.filter.dto';

@Injectable()
export class TaskService {
   
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepositoy:TaskRepository){

    }

 //getTask(filterdto:TaskStatusFilter):Promise<Task>{
    
     
       
 //   }
    getTask():Promise<Task[]>{
         
        return Task.find()
    }

    async getTaskById(id:number):Promise<Task>{
        //const found=await this.taskRepositoy.findOne(id)
        //if(!found)throw new NotFoundException(`Task with Id "${id}" not found`)
        const found=await Task.findOne(id)
        if(!found)throw new NotFoundException(`Task with Id "${id}" not found`)
        return Task.findOne(id);
    }

    async createTask(createTaskDto:CreateTaskDto):Promise<Task>{
       return this.taskRepositoy.createTask(createTaskDto)
    }
    async deleteTask(id:number):Promise<void>{
     // const result= await this.taskRepositoy.delete(id);
      //console.log(result)
      const result=await Task.delete(id)
      if(result.affected===0){
          throw new NotFoundException(`Task with Id "${id}" not found`)
      }

    }

    async updateTaskStatus(id:number,status:TaskStatus):Promise<Task>{
        const task=await this.getTaskById(id)
        task.status=status
        await task.save()
        return task;

    }
}
