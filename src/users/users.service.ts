// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 3-C  ·  Implement UsersService
// ─────────────────────────────────────────────────────────────────────────────
// Create an in-memory service following the same pattern as ProductsService.
//
// Requirements:
//   - Store users in a private array
//   - Pre-populate with at least 2 seed users
//   - Implement: findAll, findOne(id), create(dto), update(id, dto), remove(id)
//   - findOne must throw NotFoundException when user is not found
//
// Interface to use:
//   export interface User {
//     id: number;
//     name: string;
//     email: string;
//     age: number;
//     role: string;
//   }
// ─────────────────────────────────────────────────────────────────────────────

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
// TODO: import NotFoundException and your DTOs
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: 'student' | 'teacher' | 'admin';
}

@Injectable()
export class UsersService {
  // TODO: implement the service
  // In-memory "database" – a plain array
  private users: User[] = [
    { id: 1, name: 'Tapir', email: 'z.montoya@uniandes.edu.co', age: 20, role: 'admin'},
    { id: 2, name: 'Mouse', email: 'm.ouse@uniandes.edu.co', age: 21, role: 'student'},
  ];
  private nextId = 3;

    // BONUS: Add GET /users/search?email=maria@example.com.
    findAll(email?: string): User[] {
      if (!email) return this.users;

      const result = this.users.filter(user => user.email === email);

      if (result.length === 0) {
        throw new NotFoundException(`User with email ${email} not found`);
      }

      return result;
    }
  
    findOne(id: number): User {
      const user = this.users.find((u) => u.id === id);
      if (!user) {
        throw new NotFoundException(`User #${id} not found`);
      }
      return user;
    }
    
    // BONUS: In UsersService.create(), check if an email already exists in the array.
    create(dto: CreateUserDto): User {
      if (this.users.find(u => u.email === dto.email)) {
        throw new ConflictException('Email already registered');
      }

      const user: User = {
        id: this.nextId++,
        name: dto.name,
        email: dto.email,
        age: dto.age,
        role: dto.role ?? 'student',
      };

      this.users.push(user);
      return user;
    }
  
    update(id: number, dto: UpdateUserDto): User {
      const user = this.findOne(id); // reuses findOne – throws if not found
      Object.assign(user, dto);
      return user;
    }
  
    remove(id: number): User {
      const user = this.findOne(id);
      this.users = this.users.filter((u) => u.id !== id);
      return user;
    }
  }
