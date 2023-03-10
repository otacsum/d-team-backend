import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import {PersonService} from './person.service';
import {CreatePersonDto} from './dto/create-person.dto';
import {UpdatePersonDto} from './dto/update-person.dto';
import {LoginDto} from './dto/login.dto';

@Controller('person')
export class PersonController {
    constructor(private readonly personService: PersonService) {}

    @Post()
    create(@Body() createPersonDto: CreatePersonDto) {
        return this.personService.create(createPersonDto);
    }

    @Get('?')
    findAll(@Query('isActive') isActive:boolean = true) {
        return this.personService.findAll(isActive);
    }

    @Get('type/:personType')
    findAllByType(@Param('personType') personType: string) {
        return this.personService.findAllByType(personType);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.personService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
        return this.personService.update(id, updatePersonDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.personService.remove(id);
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto) {
        return this.personService.login(loginDto);
    }
}
