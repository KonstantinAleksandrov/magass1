class ApiError extends Error {
    constructor(status,messange){
        super();
        this.status = status
        this.messange = messange
    }

    static badRequest(messange){
        return new ApiError(404,messange)
    }

    static internal(messange){
        return new ApiError(500,messange)
    }

    static forbidden(messange){
        return new ApiError(403,messange)
    }
}

module.exports = ApiError