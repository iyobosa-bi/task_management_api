
const sendSuccessResponse = (res, data,message, statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        message: message || "Request successful",
        data: data
    });
}


 const sendErrorResponse = (res,errorMessage,generalMessage,statusCode = 500) => {
    res.status(statusCode).json({
        success: false,
        message: generalMessage || "An error occurred",
        error: errorMessage
    });
}

export {sendSuccessResponse,sendErrorResponse};