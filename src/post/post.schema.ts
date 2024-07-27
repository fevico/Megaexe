import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";


@Schema({
    timestamps: true
})
export class Post {
    @Prop({ type: String })
    title: string;

  @Prop({ type: String})
  descrpition: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' }) // Specify ref option
  categoryId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({type: String})
  image: string;

  @Prop({ type: [String], default: [] })
  comments: string[];

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
