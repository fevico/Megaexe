import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @ApiBadRequestResponse({
        description: 'Unable to create the record!'
    })
    @ApiOperation({ summary: 'Create user information' })
    @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    schema: {
    properties: {
      name: { type: 'string', example: 'John Doe', description: 'User name' },
      email: { type: 'string', example: 'john@example.com', description: 'User email' },
      password: { type: 'string', example: 'password', description: 'User password' }
    }
  }
})
    @Post('create')
    @ApiOperation({summary: "Create new record"})
    @ApiBody({
        schema:{
            type:'object',
            properties:{
                name: {
                    type: 'string',
                    example: "John doe",
                    description: "user's name"
                },
                email: {
                    type: 'string',
                    example: "user@example.com",
                    description: "user,s email"
                },
                password: {
                    type: 'string',
                    example: "user!237&",
                    description: "user's password"
                },
            }
        }
      })
      @ApiResponse({
        status: 200,
        description: 'The record has been successfully created'
      })
      @ApiResponse({
        status: 403,
        description: 'Forbidden'
      })

    createUser(@Body(new ValidationPipe()) userDto: CreateUserDto ){
    
        return this.userService.create(userDto)
    }

    @Post('login')
    @ApiOperation({summary: "Login a user"})
    @ApiBody({
        schema:{
            type:'object',
            properties:{
                email: {
                    type: 'string',
                    example: "user@example.com",
                    description: "user,s registered email"
                },
                password: {
                    type: 'string',
                    example: "user!237&",
                    description: "user's registered password"
                },
            }
        }
      })
      @ApiResponse({
        status: 200,
        description: 'user logged in sucessfully'
      })
      @ApiResponse({
        status: 403,
        description: 'Forbidden'
      })

    loginUser(@Body() user:any ){
    
        return this.userService.loginUser(user)
    }
}
