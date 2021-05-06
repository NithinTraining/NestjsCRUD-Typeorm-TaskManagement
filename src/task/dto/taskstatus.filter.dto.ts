import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../taskstatusenum";



export class TaskStatusFilter {
    @IsOptional()
    @IsIn([TaskStatus.OPEN,TaskStatus.PROGRES,TaskStatus.DONE])
    status:TaskStatus

    @IsOptional()
    
    search:string
}