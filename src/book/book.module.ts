import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schemas/book.schema';
import { BookService } from './book.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema}])],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
