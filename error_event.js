class ErrorEvent extends Event {
  constructor(type, eventInitDict = {}) {
    super(type, eventInitDict);

    this.colno = eventInitDict.colno ?? 0;
    this.error = eventInitDict.error;
    this.filename = eventInitDict.filename ?? "";
    this.lineno = eventInitDict.lineno ?? 0;
    this.message = eventInitDict.message ?? "";
  }
}

module.exports = ErrorEvent;
