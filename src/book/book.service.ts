import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Book } from "./schemas/book.schema";
import * as mongoose from "mongoose";

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>
    ) {}

    async findAll(): Promise<Book[]>{
        const books = await this.bookModel.find()
        return books
    }

    async create(book: Book): Promise<Book>{
        const res = await this.bookModel.create(book)
        return res;
    }

    async findById(id: string): Promise<Book>{
        const res = await this.bookModel.findById(id)
        if(!res){
            throw new NotFoundException('Book not found')
        }
        return res
    }

    async delete(id: string): Promise<Book>{
        const res = await this.bookModel.findByIdAndDelete(id)
        if(!res){
            throw new NotFoundException("Book Not Found")
        }
        return res;
    }

    async update(id: string, book: Book): Promise<Book>{
        const res = await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true
        })
        if(!res){
            throw new NotFoundException("Book Not Found")
        }
        return res;
    }
}