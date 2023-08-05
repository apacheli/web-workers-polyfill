class ErrorEvent extends Event {
  constructor(type, options) {
    super(type, options);

    this.message = options.message;
    this.filename = options.filename;
    this.lineno = options.lineno;
    this.colno = options.colno;
    this.error = options.error;
  }
}

exports.ErrorEvent = ErrorEvent;
