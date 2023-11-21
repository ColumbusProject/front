enum ResponseCode {

    // HTTP status 200
    SUCCESS = "SU",

    // HTTP status 400
    VALIDATION_FAILED = "VF",
    DUPLICATE_NICKNAME = "DN",
    DUPLICATE_EMAIL = "DE",
    DUPLICATE_TELEPHONE_NUMBER = "DT",
    NOT_EXISTED_USER = "NU",
    NOT_EXISTED_BOARD = "NB",
  
    // HTTP status 401
    SIGN_IN_FAIL = "SF",
    AUTHORIZATION_FAIL = "AF",
  
    // HTTP status 403
    NO_PERMISSION = "NP",
  
    // HTTP status 500
    DATABASE_ERROR = "DBE",


}

export default ResponseCode;