import { DomainError } from "@/core/domain-error";
import { ResourceNotFoundError } from "@/domain/errors";
import { ErrorPresenter } from "@/infra/presenters/error.presenter";
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { FastifyReply } from "fastify";
import { InternalServerError } from "../internal-server.error";

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    let httpException: HttpException;

    switch (exception.constructor) {
      case ResourceNotFoundError:
        httpException = new BadRequestException(
          ErrorPresenter.toHttp(400, exception),
        );
        break;

      default:
        httpException = new InternalServerError(exception.message);
    }

    console.error(exception);

    response
      .status(httpException.getStatus())
      .send(httpException.getResponse());
  }
}
