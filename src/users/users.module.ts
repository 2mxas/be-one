// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 3-E  ·  Register the module
// ─────────────────────────────────────────────────────────────────────────────
// Wire controller and service together inside the @Module decorator,
// exactly as done in ProductsModule and TasksModule.
// ─────────────────────────────────────────────────────────────────────────────

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  // TODO: register the controller and the service
  // BONUS: Add a GET /users/:id/tasks cross-module route.
  imports: [TasksModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
