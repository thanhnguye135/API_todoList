import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UserService } from 'src/user/user.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService, private readonly userService: UserService) {}

  @Post(':email')
  async create(@Body() createTodoDto: CreateTodoDto,@Param('email') email: string) {
    const user = await this.userService.findUserId(email);
    console.log(user);
    return this.todoService.create(createTodoDto.title, user[0]);
  }

  @Get('/findAllTodoNotCompleted/:email')
  findAllTodoNotCompleted(@Param('email') email: string ) {
    return this.todoService.findAllTodoNotCompleted(email);
  }

  @Get('/findAllTodoCompleted/:email')
  findAllTodoCompleted(@Param('email') email: string ) {
    return this.todoService.findAllTodoCompleted(email);
  }

  @Get(':title')
  findOne(@Param('title') title: string) {
    return this.todoService.findOne(title);
  }

  @Patch(':title')
  update(@Param('title') title: string) {
    return this.todoService.update(title);
  }

  @Delete(':title')
  remove(@Param('title') title: string) {
    return this.todoService.remove(title);
  }
}
