import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schemas/book.schema';
import { BookService } from './book.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema}])],
  controllers: [BookController],
  providers: [BookService, JwtService]
})
export class BookModule {}
