class ResponseService {
  // Define status codes as a readonly property
  private readonly statusCodes = {
    ok: 200,
    created: 201,
    accepted: 202,
    noContent: 204,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    internalServerError: 500,
    serviceUnavailable: 503,
  };

  // Method to return a success response
  success(message: string, data?: any) {
    return {
      success: true,
      message,
      data,
      status: this.statusCodes.ok,
    };
  }

  // Method to return an error response
  error(message: string, error?: any) {
    return {
      success: false,
      message,
      error,
      status: this.statusCodes.badRequest,
    };
  }

  // Method for unauthorized error response
  unauthorizedError(message: string) {
    return {
      success: false,
      message,
      error: "Unauthorized",
      status: this.statusCodes.unauthorized,
    };
  }

  // Method for forbidden error response
  forbiddenError(message: string) {
    return {
      success: false,
      message,
      error: "Forbidden",
      status: this.statusCodes.forbidden,
    };
  }

  // Method for not found error response
  notFoundError(message: string) {
    return {
      success: false,
      message,
      error: "Not Found",
      status: this.statusCodes.notFound,
    };
  }

  // Method for internal server error response
  internalServerError(message: string, error: any) {
    return {
      success: false,
      message,
      error: error,
      status: this.statusCodes.internalServerError,
    };
  }

  // Method for service unavailable error response
  serviceUnavailableError(message: string) {
    return {
      success: false,
      message,
      error: "Service Unavailable",
      status: this.statusCodes.serviceUnavailable,
    };
  }
}

export default new ResponseService();
