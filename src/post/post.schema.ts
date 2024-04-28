import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Post {
    @Prop()
    title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  categoryId: string; 

  @Prop({ required: true })
  userId: string;

  @Prop()
  image: string;

  @Prop({required: true})
  owner: string

  @Prop({ type: [String], default: [] })
  comments: string[];

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
