// USER MODULE
export const USER_ERRORS = {
  NOT_FOUND: { code: "USR_USER_NOT_FOUND", message: "User not found" },
  ALREADY_EXISTS: { code: "USR_USER_ALREADY_EXISTS", message: "User already exists" },
  INVALID_ID: { code: "USR_USER_INVALID_ID", message: "Invalid user ID" },
  DEACTIVATED: { code: "USR_USER_DEACTIVATED", message: "User account is deactivated" },
  ALREADY_DEACTIVATED: { code: "USR_USER_ALREADY_DEACTIVATED", message: "User account is already deactivated" },
  ALREADY_ACTIVATED: { code: "USR_USER_ALREADY_ACTIVATED", message: "User account is already activated" },
  SUSPENDED: { code: "USR_USER_SUSPENDED", message: "User account is suspended" },
  EMAIL_NOT_VERIFIED: { code: "USR_USER_EMAIL_NOT_VERIFIED", message: "Email not verified" },
  PROFILE_INCOMPLETE: { code: "USR_USER_PROFILE_INCOMPLETE", message: "Profile is incomplete" },
  EMAIL_DUPLICATE: { code: "USR_USER_EMAIL_DUPLICATE", message: "Email already exists" },
  PHONE_DUPLICATE: { code: "USR_USER_PHONE_DUPLICATE", message: "Phone already exists" },
  OPERATION_NOT_ALLOWED: { code: "USR_USER_OPERATION_NOT_ALLOWED", message: "Operation not allowed" },
} as const;

// AUTH MODULE

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: { code: "USR_AUTH_INVALID_CREDENTIALS", message: "Invalid credentials" },
  UNAUTHORIZED: { code: "USR_AUTH_UNAUTHORIZED", message: "Authentication required" },
  FORBIDDEN: { code: "USR_AUTH_FORBIDDEN", message: "Access forbidden" },
  TOKEN_EXPIRED: { code: "USR_AUTH_TOKEN_EXPIRED", message: "Token expired" },
  TOKEN_INVALID: { code: "USR_AUTH_TOKEN_INVALID", message: "Invalid token" },
  ACCOUNT_LOCKED: { code: "USR_AUTH_ACCOUNT_LOCKED", message: "Account locked" },
  ACCOUNT_BLOCKED: { code: "USR_AUTH_ACCOUNT_BLOCKED", message: "Account blocked" },
  TOO_MANY_ATTEMPTS: { code: "USR_AUTH_TOO_MANY_ATTEMPTS", message: "Too many attempts" },
  LOGIN_DISABLED: { code: "USR_AUTH_LOGIN_DISABLED", message: "Login disabled" },
  MFA_REQUIRED: { code: "USR_AUTH_MFA_REQUIRED", message: "MFA required" },
  MFA_FAILED: { code: "USR_AUTH_MFA_FAILED", message: "Invalid MFA code" },
  OAUTH_FAILED: { code: "USR_AUTH_OAUTH_FAILED", message: "OAuth failed" },
  SSO_FAILED: { code: "USR_AUTH_SSO_FAILED", message: "SSO failed" },
} as const;

// ORG MODULE
export const ORG_ERRORS = {
  NOT_FOUND: { code: "USR_ORG_NOT_FOUND", message: "Organization not found" },
  INACTIVE: { code: "USR_ORG_INACTIVE", message: "Organization inactive" },
  SUSPENDED: { code: "USR_ORG_SUSPENDED", message: "Organization suspended" },
  ACCESS_DENIED: { code: "USR_ORG_ACCESS_DENIED", message: "Access denied" },
  PERMISSION_DENIED: { code: "USR_ORG_PERMISSION_DENIED", message: "Permission denied" },
  USER_NOT_IN_ORG: { code: "USR_ORG_USER_NOT_IN", message: "User not in organization" },
  USER_ALREADY_IN_ORG: { code: "USR_ORG_USER_ALREADY_IN", message: "User already in organization" },
  USER_LIMIT_REACHED: { code: "USR_ORG_USER_LIMIT_REACHED", message: "User limit reached" },
  ADMIN_REQUIRED: { code: "USR_ORG_ADMIN_REQUIRED", message: "Admin required" },
  CREATE_FAILED: { code: "USR_ORG_CREATE_FAILED", message: "Failed to create organization" },
  UPDATE_FAILED: { code: "USR_ORG_UPDATE_FAILED", message: "Failed to update organization" },
  DELETE_FAILED: { code: "USR_ORG_DELETE_FAILED", message: "Failed to delete organization" },
  SWITCH_FAILED: { code: "USR_ORG_SWITCH_FAILED", message: "Failed to switch organization" },
  ISOLATION_VIOLATION: { code: "USR_ORG_ISOLATION_VIOLATION", message: "Cross-org access not allowed" },
} as const ;





export const BUSINESS_ERRORS = {
  CANNOT_DELETE_SELF: { code: "USR_BUSINESS_CANNOT_DELETE_SELF", message: "Cannot delete yourself" },
  CANNOT_DEACTIVATE_SELF: { code: "USR_BUSINESS_CANNOT_DEACTIVATE_SELF", message: "Cannot deactivate yourself" },
  CANNOT_UPDATE_SELF_ROLE: { code: "USR_BUSINESS_CANNOT_UPDATE_SELF_ROLE", message: "Cannot change own role" },
  LAST_ADMIN: { code: "USR_BUSINESS_LAST_ADMIN", message: "Cannot remove last admin" },
  EMAIL_IN_USE: { code: "USR_BUSINESS_EMAIL_IN_USE", message: "Email already in use" },
  PHONE_IN_USE: { code: "USR_BUSINESS_PHONE_IN_USE", message: "Phone already in use" },
  PASSWORD_POLICY_VIOLATION: { code: "USR_BUSINESS_PASSWORD_POLICY_VIOLATION", message: "Password too weak" },
  USERNAME_TAKEN: { code: "USR_BUSINESS_USERNAME_TAKEN", message: "Username already taken" },
  INVALID_STATE: { code: "USR_BUSINESS_INVALID_STATE", message: "Invalid state transition" },
  OPERATION_NOT_ALLOWED: { code: "USR_BUSINESS_OPERATION_NOT_ALLOWED", message: "Operation not allowed" },
  DEPENDENCY_EXISTS: { code: "USR_BUSINESS_DEPENDENCY_EXISTS", message: "Dependency exists" },
  RESOURCE_LOCKED: { code: "USR_BUSINESS_RESOURCE_LOCKED", message: "Resource is locked" },
} as const ;

export const SECURITY_ERRORS = {
  SUSPICIOUS_ACTIVITY: { code: "USR_SEC_SUSPICIOUS_ACTIVITY", message: "Suspicious activity detected" },
  TEMPORARY_BLOCK: { code: "USR_SEC_TEMPORARY_BLOCK", message: "Temporarily blocked" },
  PERMANENT_BLOCK: { code: "USR_SEC_PERMANENT_BLOCK", message: "Permanently blocked" },
  RATE_LIMIT: { code: "USR_SEC_RATE_LIMIT", message: "Rate limit exceeded" },
} as const;

export const SYSTEM_ERRORS = {
  INTERNAL_ERROR: { code: "USR_SYSTEM_INTERNAL_ERROR", message: "Something went wrong" },
  DATABASE_ERROR: { code: "USR_SYSTEM_DATABASE_ERROR", message: "Database error" },
  TIMEOUT: { code: "USR_SYSTEM_TIMEOUT", message: "Request timed out" },
  SERVICE_UNAVAILABLE: { code: "USR_SYSTEM_SERVICE_UNAVAILABLE", message: "Service unavailable" },
  CONFIG_MISSING: { code: "USR_SYSTEM_CONFIG_MISSING", message: "Missing configuration" },
} as const;

export const QUESTION_ERRORS = {
  NOT_FOUND: { code: "QST_QUESTION_NOT_FOUND", message: "Question not found" },
  ALREADY_EXISTS: { code: "QST_QUESTION_ALREADY_EXISTS", message: "Question already exists" },
  DUPLICATE: { code: "QST_QUESTION_DUPLICATE", message: "Duplicate question detected" },
  INVALID_ID: { code: "QST_QUESTION_INVALID_ID", message: "Invalid question ID" },
  INVALID_TYPE: { code: "QST_QUESTION_INVALID_TYPE", message: "Invalid question type" },
  INVALID_DIFFICULTY: { code: "QST_QUESTION_INVALID_DIFFICULTY", message: "Invalid difficulty level" },
  INVALID_SCORE: { code: "QST_QUESTION_INVALID_SCORE", message: "Invalid score value" },
  INVALID_CONFIGURATION: { code: "QST_QUESTION_INVALID_CONFIGURATION", message: "Question configuration is invalid" },
  INVALID_ANSWER_CONFIGURATION: { code: "QST_QUESTION_INVALID_ANSWER_CONFIGURATION", message: "Question answer configuration is invalid" },
  MISSING_CORRECT_ANSWER: { code: "QST_QUESTION_MISSING_CORRECT_ANSWER", message: "Question must contain at least one correct answer" },
  MULTIPLE_CORRECT_ANSWERS_NOT_ALLOWED: { code: "QST_QUESTION_MULTIPLE_CORRECT_ANSWERS_NOT_ALLOWED", message: "Multiple correct answers are not allowed for this question type" },
  OPTIONS_REQUIRED: { code: "QST_QUESTION_OPTIONS_REQUIRED", message: "Question options are required" },
  OPTIONS_NOT_ALLOWED: { code: "QST_QUESTION_OPTIONS_NOT_ALLOWED", message: "Question options are not allowed for this question type" },
  DOMAIN_NOT_FOUND: { code: "QST_DOMAIN_NOT_FOUND", message: "Domain not found" },
  CATEGORY_NOT_FOUND: { code: "QST_CATEGORY_NOT_FOUND", message: "Category not found" },
  CATEGORY_DOMAIN_MISMATCH: { code: "QST_CATEGORY_DOMAIN_MISMATCH", message: "Category does not belong to the specified domain" },
  QUESTION_BANK_NOT_FOUND: { code: "QST_QUESTION_BANK_NOT_FOUND", message: "Question bank not found" },
  VERSION_NOT_FOUND: { code: "QST_QUESTION_VERSION_NOT_FOUND", message: "Question version not found" },
  VERSION_ALREADY_PUBLISHED: { code: "QST_QUESTION_VERSION_ALREADY_PUBLISHED", message: "Question version is already published" },
  VERSION_ARCHIVED: { code: "QST_QUESTION_VERSION_ARCHIVED", message: "Question version is archived" },
  CANNOT_MODIFY_PUBLISHED_VERSION: { code: "QST_CANNOT_MODIFY_PUBLISHED_VERSION", message: "Published question versions cannot be modified" },
  CANNOT_DELETE_PUBLISHED_VERSION: { code: "QST_CANNOT_DELETE_PUBLISHED_VERSION", message: "Published question versions cannot be deleted" },
  ACTIVE_ASSESSMENT_REFERENCE: { code: "QST_ACTIVE_ASSESSMENT_REFERENCE", message: "Question is referenced by an active assessment" },
  ACTIVE_TEST_REFERENCE: { code: "QST_ACTIVE_TEST_REFERENCE", message: "Question is referenced by an active test" },
  ORGANIZATION_MISMATCH: { code: "QST_ORGANIZATION_MISMATCH", message: "Question does not belong to the specified organization" },
  IMPORT_FAILED: { code: "QST_IMPORT_FAILED", message: "Failed to import questions" },
  EXPORT_FAILED: { code: "QST_EXPORT_FAILED", message: "Failed to export questions" },
  UNSUPPORTED_FILE_FORMAT: { code: "QST_UNSUPPORTED_FILE_FORMAT", message: "Unsupported file format" },
  FILE_PROCESSING_FAILED: { code: "QST_FILE_PROCESSING_FAILED", message: "Failed to process uploaded file" },
  RANDOMIZATION_CONFIGURATION_INVALID: { code: "QST_RANDOMIZATION_CONFIGURATION_INVALID", message: "Randomization configuration is invalid" },
  OPERATION_NOT_ALLOWED: { code: "QST_OPERATION_NOT_ALLOWED", message: "Operation not allowed" },
} as const;