import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt'
import * as jwt from "jsonwebtoken";
import { CreateUserDto } from './dto/users.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly UserModel: Model<User>,
    private readonly jwtService: JwtService
){}

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
            const payload = {
                email: userFound.email,
                id: userFound._id,
                name: userFound.name
              }
            const token = await this.jwtService.sign(payload, {secret: process.env.JWT_SECRET})
            return {token}
         }
}
