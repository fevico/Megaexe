import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './post.schema';
import { FormidableMiddleware } from 'src/middleware/fileParser';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UserSchema } from 'src/users/user.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name: "Post", schema: PostSchema},
    {name: "User", schema: UserSchema},
  ]),
  CloudinaryModule
],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
