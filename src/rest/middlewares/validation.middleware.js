function validationMiddleware (schema) {
    return (request, response, next) => {
      const { error } = schema.validate(request, {
        stripUnknown: true,
      });
  
      if (error) {
        return response.status(400).json(error.details.map(error => error.message));
      }
  
      next();
    }
  }
  
  export default validationMiddleware;