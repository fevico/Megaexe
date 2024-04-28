import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';
import { PostDto } from './dto/post.dto';

interface PostInfo {
    owner: string;
    title: string;
    image: string;
    content: string
}

@Injectable()
export class PostService {
    constructor(@InjectModel('Post') private readonly PostModel: Model<Post>){}

    async create(post: PostDto, id: string, name: string) {
        const { title, owner, content, image, userId, categoryId } = post;
        const newPost = new this.PostModel({ title, owner: name, content, image, userId: id, categoryId });
        await newPost.save();
        return newPost;
    }

    async getUserPosts( id: string) {
        const user = await this.PostModel.find({userId:id}).sort({ timestamp: -1 });
        if(!user) throw new UnprocessableEntityException('This user does not have a post')
        return user;
    }
}
