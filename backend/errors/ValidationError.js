class ValidationError extends Error {
  constructor(message = 'Переданы некорректные данные') {
    super(message);
    this.statusCode = 400;
  }
}

export default ValidationError;
