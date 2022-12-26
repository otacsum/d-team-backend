import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeacherCredentialService } from './teacher-credential.service';
import { CreateTeacherCredentialDto } from './dto/create-teacher-credential.dto';
import { UpdateTeacherCredentialDto } from './dto/update-teacher-credential.dto';

@Controller('credential')
export class TeacherCredentialController {
  constructor(private readonly teacherCredentialService: TeacherCredentialService) {}

  @Post()
  create(@Body() createTeacherCredentialDto: CreateTeacherCredentialDto) {
    return this.teacherCredentialService.create(createTeacherCredentialDto);
  }

  @Get('teacher/:personId')
  findAllForTeacher(@Param('personId') personId: string) {
    return this.teacherCredentialService.findAllForTeacher(personId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherCredentialService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherCredentialDto: UpdateTeacherCredentialDto) {
    return this.teacherCredentialService.update(id, updateTeacherCredentialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherCredentialService.remove(id);
  }
}
