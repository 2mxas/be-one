// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 3-B  ·  Create UpdateUserDto
// ─────────────────────────────────────────────────────────────────────────────
// Same as CreateUserDto but every field is optional (PATCH semantics).
// ─────────────────────────────────────────────────────────────────────────────

// TODO: your code here

import {
  IsString,
  IsNumber,
  IsOptional,
  MinLength,
  MaxLength,
  IsEmail,
  Min,
  Max,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

const Role = ['student', 'teacher', 'admin'] as const;
type Role = (typeof Role)[number];

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(120)
  age?: number;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}