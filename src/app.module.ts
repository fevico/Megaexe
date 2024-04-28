import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './users/interceptor/user.interceptor';

@Module({
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({
      envFilePath: '.env', // Specify the path to your .env file
      isGlobal: true, // Make configuration global
    }),

    // Connect to MongoDB using Mongoose
    MongooseModule.forRoot(process.env.DB_URI),

    // Import feature modules
    UsersModule,
    CategoryModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: UserInterceptor
  }],
})
export class AppModule {}
