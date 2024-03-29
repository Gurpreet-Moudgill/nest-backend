import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Book } from "./schemas/book.schema";
import * as mongoose from "mongoose";
import {Query} from "express-serve-static-core";

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>
    ) {}

    async findAll(query: Query): Promise<Book[]>{
        const resPerPage = 2;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1)

        const keyword = query.keyword ? {
            title: {
                $regex: query.keyword,
                $options: 'i'
            }
        } : {};
        const books = await this.bookModel.find({...keyword}).limit(resPerPage).skip(skip);
        return books
    }

    async create(book: Book): Promise<Book>{
        const res = await this.bookModel.create(book)
        return res;
    }

    async fileUp(id: string, image: object): Promise<Book>{
        const res = await this.bookModel.findByIdAndUpdate(id, image, {
            new: true,
            runValidators: true
        })
        if(!res){
            throw new NotFoundException("Book Not Found")
        }
        return res;
    }

    async findById(id: string): Promise<Book>{

        const isValid = mongoose.isValidObjectId(id);

        if(!isValid){
            throw new BadRequestException("Please enter correct Id")
        }
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