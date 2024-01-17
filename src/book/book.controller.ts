import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { createBookDto } from './dto/create-book.dto';

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
}
