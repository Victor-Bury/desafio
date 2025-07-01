import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responsePayload =
      exception instanceof HttpException ? exception.getResponse() : null;

    const mensagem =
      typeof responsePayload === 'object' && responsePayload !== null
        ? (responsePayload as any).message || 'Erro interno do servidor'
        : typeof responsePayload === 'string'
          ? responsePayload
          : 'Erro interno do servidor';

    response.status(status).json({
      codigoStatus: status,
      mensagem: mensagem,
      erro:
        exception instanceof HttpException
          ? exception.constructor.name
          : 'InternalServerError',
      caminho: request.url,
      dataHora: new Date().toISOString(),
    });
  }
}
