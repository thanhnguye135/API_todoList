import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  create(firstName: string, lastName: string, email: string, password: string, role: string) {
    const user = this.userRepository.create({firstName, lastName, email, password, role});

    return this.userRepository.save(user);

  //   const query = `
  //   INSERT INTO users (firstName, lastName, email, password, role)
  //   VALUES ('${firstName}', '${lastName}', '${email}', '${password}', '${role}');
  // `;

  //   return this.userRepository.query(query);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(email: string) {
    if(!email) return null;

    return this.userRepository.find({where: {email}});
  }

  findUserId(email: string){
    return this.findOne(email);
  }

  async update(email: string, attrs: Partial<User>) {
    let user = await this.findOne(email);
    if(!user){
      throw new NotFoundException('user not found');
    }

    Object.assign(user, attrs);    
    return this.userRepository.save(user);
  }

  async remove(email: string) {
    const user = await this.findOne(email);
    if(!user){
      throw new NotFoundException('user not found');
    }
    return this.userRepository.remove(user);
  }
}
