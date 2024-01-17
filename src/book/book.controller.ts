import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { createBookDto } from './dto/create-book.dto';
import { updateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BookController {
    constructor(private bookService: BookService) {}

    @Get()
    async getAllBooks(): Promise<Book[]>{
        const books = this.bookService.findAll();
        return books;
    }

    @Post()
    async createBook( 
        @Body()
        book : createBookDto
        ): Promise<Book>
    {
        try{
        const res =  this.bookService.create(book);
        return res;
        }
        catch(error){
            console.error("Error", error)
        }
    }

    @Get(':id')
    async getBook(
        @Param('id')
        id: string,
    ): Promise<Book>{
        try{
            const res = this.bookService.findById(id)
            return res;
        }
        catch(error){
            console.error("Error", error)
        }
    }
    
    @Delete(':id')
    async deleteOne(
        @Param('id')
        id: string,
    ): Promise<Book>{
        try{
            const res = this .bookService.delete(id)
            return res;
        }
        catch(error){
            console.error("Error", error)
        }
    }

    @Put(':id')
    async updateBook(
        @Param('id')
        id: string,
        @Body()
        book: updateBookDto
    ): Promise<Book>{
        try{
            const res = this.bookService.update(id, book)
            return res
        }
        catch(error){
            console.error("Error", error)
        }
    }
}
