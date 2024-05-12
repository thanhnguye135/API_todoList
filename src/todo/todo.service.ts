import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>){}

  create(title: string, user: User) {
    const todo = this.todoRepo.create({title});
    todo.user = user;

    return this.todoRepo.save(todo);
  }

  findAllTodoCompleted(email: string) {
    return this.todoRepo.find({
      relations: ['user'],
      where: {user: {email: email}, completed: true}
    });
  }

  findAllTodoNotCompleted(email: string) {
    return this.todoRepo.find({
      relations: ['user'],
      where: {user: {email: email}, completed: false}
    });
  }

  findOne(title: string) {
    if(!title) return null;

    return this.todoRepo.findOne({where: {title}});
  }

  async update(title: string) {
    let todo = await this.findOne(title);

    if(!todo) throw new NotFoundException('todo not found');

    Object.assign(todo, {completed: true});
    return this.todoRepo.save(todo);
  }

  async remove(title: string) {
    let todo = await this.findOne(title);

    if(!todo) throw new NotFoundException('todo not found');

    return this.todoRepo.remove(todo);
  }
}
