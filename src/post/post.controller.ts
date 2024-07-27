import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { User, UserInfo } from 'src/users/decorator/user.decorator';
import { ApiOperation, ApiBody, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { PostDto } from './dto/post.dto';
import { Request, Response } from 'express';
import * as formidable from 'formidable';
import { AuthenitcationGuard } from 'src/guard/authentication';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('create')
  @UseGuards(AuthenitcationGuard)
  @ApiOperation({ summary: "Create new record" })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: "Post title",
          description: "Title of the post",
        },
        content: {
          type: 'string',
          example: "This is the content of the post",
          description: "Content of the post",
        },
        categoryId: {
          type: 'string',
          example: "60d0fe4f5311236168a109ca",
          description: "Category ID of the post",
        },
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
          description: "Files for the post",
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async createPost(@User() user: UserInfo, @Req() req: Request, @Res() res: Response) {
    const userId = req.userId;
    const files = Object.values(req.files).flat() as formidable.File[];
    const fields = req.body as PostDto;

    console.log(fields);
    console.log(files);

    // Ensure content is a string
       // Convert all array fields to strings if they are arrays
       for (const key in fields) {
        if (Array.isArray(fields[key])) {
          fields[key] = fields[key].join(' '); 
        }
      }

    try {
      // Handle the file uploads
      const uploadPromises = files.map(file => this.postService.uploadFile(file));
      const fileUrls = await Promise.all(uploadPromises);

      // Now create the post with both file URLs and other fields
      const post = {
        ...fields,
        image: fileUrls[0], // Assuming you want to store the first file URL
        userId: userId,
      };

      const createdPost = await this.postService.create(post);

      return res.status(200).json(createdPost);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating post', error });
    }
  }

  @ApiBadRequestResponse({
    description: 'Unable to create the record!',
  })
  @ApiOperation({ summary: 'Get user\'s post information' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
    schema: {
      properties: {
        title: { type: 'string', example: 'Pancrase', description: 'Post name' },
        owner: { type: 'string', example: 'Pancrase', description: 'Post owner' },
        categoryId: { type: 'string', example: 'Pancrase', description: 'Category ID' },
      },
    },
  })

  @Get('user/post')
  @UseGuards(AuthenitcationGuard)
  getUserPosts(@Req() req: Request) {
    const userId = req.userId;
    return this.postService.getUserPosts(userId);
  }

  @Get('/posts')
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Patch('update/:id')
  updatePost(@Param('id') id: string, @Body() postDto: PostDto) {
  
}

@Delete('delete/:id')
@UseGuards(AuthenitcationGuard)
deletePost(@Param('id') id: string, @Req() req: Request) {
  const userId = req.userId;
  return this.postService.deletePost(id, userId);
}
}
