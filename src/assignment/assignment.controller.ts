import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post()
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentService.create(createAssignmentDto);
  }

  @Get()
  findAll() {
    return this.assignmentService.findAll();
  }

  @Get('course/:id')
  findAllByCourseId(@Param('id') id: string) {
    return this.assignmentService.findAllByCourseId(id);
  }

  @Get('course/:id/student/:studentId')
  findAllByCourseWithOneStudentsGrades(@Param('id') id: string, @Param('studentId') studentId: string) {
    return this.assignmentService.findAllByCourseWithOneStudentsGrades(id, studentId);
  }

  @Get('course/:id/grades')
  findAllByCourseIdWithAllGrades(@Param('id') id: string) {
    return this.assignmentService.findAllByCourseIdWithAllGrades(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssignmentDto: UpdateAssignmentDto) {
    return this.assignmentService.update(id, updateAssignmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentService.remove(id);
  }
}
