import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  // BONUS: Add a GET /users/:id/tasks cross-module route.
  exports: [TasksService],
})
export class TasksModule {}
