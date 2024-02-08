import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schemas/book.schema';
import { BookService } from './book.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Module({
  imports: [NestjsFormDataModule,
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema}]),
  MulterModule.register({
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const originalname = file.originalname.replace(/\s/g, ''); // Remove spaces
        const extension = extname(originalname);
        const filename = `${uniqueSuffix}${extension}`;
        callback(null, filename);
      },
  }),})],
  controllers: [BookController],
  providers: [BookService, JwtService]
})
export class BookModule {}
