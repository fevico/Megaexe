import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt'
import * as jwt from "jsonwebtoken";
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly UserModel: Model<User>){}

    async create(userDto: CreateUserDto){
            const { name, password, email } = userDto;
            const hashpassword = await bcrypt.hash(password, 10); // Wait for the hash to resolve
            const newUser = await this.UserModel.create({
                name, email, password: hashpassword
            });
            return {user: {name: newUser.name, email: newUser.email}};  
         }

    async loginUser(user: any){
            const { password, email } = user;
            const userFound = await this.UserModel.findOne({email});
            if(!userFound){
                throw new UnauthorizedException('User not found')
            }
            const isPasswordValid = await bcrypt.compare(password, userFound.password);
            if(!isPasswordValid) throw new UnauthorizedException("Invalid credentials");
            const token = jwt.sign({id: userFound._id, name: userFound.name}, "secret", {expiresIn: '1h'})
            return {token}
         }
}
