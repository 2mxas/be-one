// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 3-D  ·  Implement UsersController
// ─────────────────────────────────────────────────────────────────────────────
// Wire up ALL 5 endpoints under the '/users' path.
// Use ParseIntPipe for the :id param in every route that needs it.
//
//   GET    /users
//   GET    /users/:id
//   POST   /users          (201)
//   PATCH  /users/:id
//   DELETE /users/:id
// ─────────────────────────────────────────────────────────────────────────────

// TODO: import all decorators and pipes you need
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { TasksService } from 'src/tasks/tasks.service';
// TODO: import your DTOs
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    // BONUS: Add a GET /users/:id/tasks cross-module route.
    private readonly tasksService: TasksService,
  ) {}

  // TODO: implement the 5 route handlers

    // GET /users
    // BONUS: Add GET /users/search?email=maria@example.com.
    @Get()
    findAll(@Query('email') email?: string) {
      return this.usersService.findAll(email);
    }
  
    // GET /users/:id
    // ParseIntPipe converts the string param to a number and throws 400 if invalid
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.findOne(id);
    }

    // BONUS: Add a GET /users/:id/tasks cross-module route.
    @Get(':id/tasks')
    getUserTasks(@Param('id', ParseIntPipe) id: number) {
      const user = this.usersService.findOne(id);

      if (!user) {
        throw new NotFoundException(`User ${id} not found`);
      }

      return this.tasksService.findByUserName(user.name)
    }
  
    // POST /users
    // @Body() extracts the request body; ValidationPipe validates it against CreateUserDto
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
    }
  
    // PATCH /users/:id
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateUserDto: UpdateUserDto,
    ) {
      return this.usersService.update(id, updateUserDto);
    }
  
    // DELETE /users/:id
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.remove(id);
    }
}
