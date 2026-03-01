import { AppError } from "./base.error";

export class DatabaseError extends AppError {
    constructor() {
        super(
            "Database operation failed",
            500,
            "DATABASE_ERROR"
        );
    }
}