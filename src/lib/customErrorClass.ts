export class NotFoundError extends Error {
    date: Date
    constructor(message?: string) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(message)
    
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotFoundError)
        }
    
        // Custom debugging information
        this.name = 'NotFound'
        this.date = new Date()
    }
}

export class ValidationFailError extends Error {
    date: Date
    constructor(message?: string) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(message)
    
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ValidationFailError)
        }
    
        // Custom debugging information
        this.name = 'ValidationFail'
        this.date = new Date()
    }
}

export class AlreadyExistError extends Error {
    date: Date
    constructor(message?: string) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(message)
    
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AlreadyExistError)
        }
    
        // Custom debugging information
        this.name = 'AlreadyExist'
        this.date = new Date()
    }
}

export class AuthError extends Error {
    date: Date
    constructor(message?: string) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(message)
    
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AuthError)
        }
    
        // Custom debugging information
        this.name = 'AuthError'
        this.date = new Date()
    }
}