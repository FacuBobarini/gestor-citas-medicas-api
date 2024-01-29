import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpArgumentsHost, ValidationError } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { MongoError } from 'mongodb';
import { Error, MongooseError } from 'mongoose';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    switch (exception.code) {
      case 11000:
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const response: Response = ctx.getResponse<Response>();
        const status: number = 409;
        const message: string = 'Duplicate key'

    response
      .status(status)
      .json({
        statusCode: status,
        message:message,
      });
    }
  }
}
@Catch(MongooseError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: MongooseError, host: ArgumentsHost) {
    switch (exception.name) {
      case 'CastError':
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const response: Response = ctx.getResponse<Response>();
        const status: number = 400;
        const message: string = 'Invalid ID!'


    response
      .status(status)
      .json({
        statusCode: status,
        message:message,
      });
    }
  }
}

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: Error.ValidationError, host: ArgumentsHost) {
   switch (exception.name) {
      case 'ValidationError':
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const response: Response = ctx.getResponse<Response>();
        const status: number = 400;
        const message = exception.errors
        
        

    response
      .status(status)
      .json({
        statusCode: status,
        message:message,
      });
    }
  }
}