import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../taskstatusenum";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatus=[
        TaskStatus.OPEN,
        TaskStatus.PROGRES,
        TaskStatus.DONE
    ]
    transform(value:any){
        value=value.toUpperCase();

       // console.log('value',value)
        if(!this.isStatusValid(value)){
             throw new BadRequestException(`"${value}" is invalid status`)
        }
        
        return value;

    }

    private isStatusValid(status:any){
const d=this.allowedStatus.indexOf(status)
return d !==-1
    }
}