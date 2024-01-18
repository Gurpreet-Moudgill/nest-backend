import { Category } from "../schemas/book.schema";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, } from "class-validator";

export class updateBookDto{
    @IsOptional()
    @IsString()
    readonly title: string;
    @IsOptional()
    @IsString()
    readonly description: string;
    @IsOptional()
    @IsString()
    readonly author: string;
    @IsOptional()
    @IsNumber()
    readonly price: number;
    @IsOptional()
    @IsEnum(Category, {message: "please enter correct category(Adventure, Classics, Crime, Fantasy",})
    readonly category: Category;
}