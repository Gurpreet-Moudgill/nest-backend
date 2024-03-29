import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { createBookDto } from './dto/create-book.dto';
import { updateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery} from 'express-serve-static-core';
import { AuthGuard } from 'src/auth/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('books')
export class BookController {
    constructor(private bookService: BookService) {}

    @UseGuards(AuthGuard)
    @Get()
    async getAllBooks( @Query()
    query: ExpressQuery): Promise<Book[]>{
        const books = this.bookService.findAll(query);
        return books;
    }

    @UseGuards(AuthGuard)
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

    @UseGuards(AuthGuard)
    @Put('image/:id')
    @UseInterceptors(FilesInterceptor('file'))
    async updateImage(
        @Param('id')
        id: string,
        @UploadedFiles()
        file: Array<Express.Multer.File>
    ): Promise<Book>{
        try{
            const files = file[0].originalname
            const res = this.bookService.fileUp(id, {image: files})
            return res
        }
        catch(error){
            console.error("Error", error)
        }
    }

    @UseGuards(AuthGuard)
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
    
    @UseGuards(AuthGuard)
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

    @UseGuards(AuthGuard)
    @Put(':id')
    @UseInterceptors(FilesInterceptor('file'))
    async updateBook(
        @Param('id')
        id: string,
        @Body()
        book: updateBookDto,
        @UploadedFiles()
        file: Array<Express.Multer.File>
    ): Promise<Book>{
        try{
            const files = file[0].path
            const res = this.bookService.update(id, book)
            const image = this.bookService.fileUp(id, {image: files})
            return image
        }
        catch(error){
            console.error("Error", error)
        }
    }
}
