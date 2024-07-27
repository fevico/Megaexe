import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' }
    }),
    MongooseModule.forFeature([{name: "User", schema: UserSchema}])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
