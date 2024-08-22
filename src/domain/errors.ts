import { DomainError } from "@/core/domain-error";

type Resource = "Demo" | "Frame";

export class ValidationError extends DomainError {
  public error = "ValidationError" as const;
  public debug: object | null;

  constructor(debug?: object) {
    super("Os dados recebidos são inválidos.");

    this.debug = debug ?? null;
  }
}

export class ResourceNotFoundError extends DomainError {
  public error = "ResourceNotFoundError" as const;
  public debug = null;

  constructor(public resource: Resource) {
    super(`${resource} inexistente.`);
  }
}
