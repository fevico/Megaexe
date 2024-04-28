import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { User, UserInfo } from 'src/users/decorator/user.decorator';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostDto } from './dto/post.dto';

@Controller('post')
export class PostController {
    constructor(private postService: PostService){}


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

    createPost(@Body(new ValidationPipe()) post: PostDto, @User() user: UserInfo){
        return this.postService.create(post, user.id, user.name)
    }

    @ApiBadRequestResponse({
        description: 'Unable to create the record!'
    })
    @ApiOperation({ summary: 'get users post information' })
    @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    schema: {
    properties: {
      title: { type: 'string', example: 'Pancrase', description: 'Post name' },
      owner: { type: 'string', example: 'Pancrase', description: 'onwer post' },
      categryId: { type: 'string', example: 'Pancrase', description: 'onwer post' },
    }
  }
})
    @Get('user/post')
    getUserPosts(@User() user: UserInfo){ 
        // console.log(user)
        return this.postService.getUserPosts(user.id)
    }
}
