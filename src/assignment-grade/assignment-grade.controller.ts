import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssignmentGradeService } from './assignment-grade.service';
import { CreateAssignmentGradeDto } from './dto/create-assignment-grade.dto';
import { UpdateAssignmentGradeDto } from './dto/update-assignment-grade.dto';

@Controller('grade')
export class AssignmentGradeController {
  constructor(private readonly assignmentGradeService: AssignmentGradeService) {}

  @Post()
  create(@Body() createAssignmentGradeDto: CreateAssignmentGradeDto) {
    return this.assignmentGradeService.create(createAssignmentGradeDto);
  }

  @Get()
  findAll() {
    return this.assignmentGradeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentGradeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssignmentGradeDto: UpdateAssignmentGradeDto) {
    return this.assignmentGradeService.update(id, updateAssignmentGradeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentGradeService.remove(id);
  }
}
