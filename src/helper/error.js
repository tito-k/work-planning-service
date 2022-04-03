export class ApplicationError extends Error {
  constructor(statusCode, message = "an error occurred", errors) {
    super(message);
    this.statusCode = statusCode || 500;
    this.message = message;
    this.errors = errors;
  }
}
