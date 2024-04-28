import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { User, UserInfo } from 'src/users/decorator/user.decorator';
import { CategoryDto } from './dto/category.dto';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService){}
    @ApiBadRequestResponse({
        description: 'Unable to create the record!'
    })
    @ApiOperation({ summary: 'Category information' })
    @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    schema: {
    properties: {
      name: { type: 'string', example: 'Pancrase', description: 'Category name' },
      deccription: { type: 'string', example: 'Pancrase', description: 'Category decription' },
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
                    example: "pancrase",
                    description: "Category name"
                },
                description: {
                    type: 'string',
                    example: "This is pancrase",
                    description: "category description"
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
    createCategory(@Body(new ValidationPipe()) @User() categoryDto: CategoryDto, User: UserInfo){
        return this.categoryService.createCategory(categoryDto)
    }

    @ApiBadRequestResponse({
        description: 'Unable to create the record!'
    })
    @ApiOperation({ summary: 'get Category information' })
    @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    schema: {
    properties: {
      name: { type: 'string', example: 'Pancrase', description: 'Category name' },
      decription: { type: 'string', example: 'Pancrase', description: 'Category description' }, 
    }
  }
})
    @Get('get/categories')
    getCategory(){
        return this.categoryService.getCategory()
    }
}
