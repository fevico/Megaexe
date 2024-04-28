import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class PostDto{
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly content: string;

    @IsNotEmpty()
    @IsString()
    readonly image: string;

    @IsNotEmpty()
    @IsString()
    readonly categoryId: string;

    @IsString()
    @IsOptional()
    readonly userId?: string;

    @IsString()
    @IsOptional()
    readonly owner?: string;
}