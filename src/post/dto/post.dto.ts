import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty({ example: 'Post title', description: 'Title of the post' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'This is the descrpition of the post', description: 'Content of the post' })
  @IsString()
  descrpition: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109ca', description: 'Category ID of the post' })
  @IsString()
  categoryId: string;
  
  @ApiProperty({ example: '60d0fe4f5311236168a109cb', description: 'User ID of the post' })
  @IsString()
  @IsOptional()
  userId?: string;
}
