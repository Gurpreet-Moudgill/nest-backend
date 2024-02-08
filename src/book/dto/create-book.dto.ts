import { IsEnum, IsNotEmpty, IsNumber, IsString, } from "class-validator";
import { Category } from "../schemas/book.schema";

export class createBookDto{
    @IsNotEmpty()
    @IsString()
    readonly title: string;
    @IsNotEmpty()
    @IsString()
    readonly description: string;
    @IsNotEmpty()
    @IsString()
    readonly author: string;
    @IsNotEmpty()
    @IsString()
    readonly price: string;
    @IsNotEmpty()
    @IsEnum(Category, {message: "please enter correct category(Adventure, Classics, Crime, Fantasy",})
    readonly category: Category;
    // @IsNotEmpty()
    // @IsString()
    readonly image: string;
}