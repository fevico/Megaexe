// post.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';
import { CloudinaryProvider } from '../cloudinary/cloudinary';
import * as formidable from 'formidable';
import { User } from 'src/users/user.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
    private cloudinaryProvider: CloudinaryProvider,
  ) {}

  async uploadFile(file: formidable.File): Promise<string> {
    return this.cloudinaryProvider.uploadFile(file);
  }

  async create(post: any): Promise<Post> {
    const user = await this.userModel.findById(post.userId).exec();
    if(!user) throw new UnauthorizedException('User not found');
    const createdPost = new this.postModel({
      ...post,
    });
    return createdPost.save();
  }

  async getUserPosts(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    if(!user) throw new UnauthorizedException('User not found');
    const posts = await this.postModel.find({ userId }).exec();
    if(!posts) throw new UnauthorizedException('no post found for this user');
    return posts
  }

  async getAllPosts(){
    const posts = await this.postModel.find().exec();
    if(!posts) throw new UnauthorizedException('no post found');
    return posts
  }

  async deletePost(postId: string, userId: string) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    
    const post = await this.postModel.findOne({ _id: postId, userId }).exec();
    if (!post) {
      throw new UnauthorizedException('Post not found, or you are not the owner of this post');
    }
    
    await this.postModel.deleteOne({ _id: postId }).exec();
    
    return { message: 'Post deleted successfully' };
  }
  
}
