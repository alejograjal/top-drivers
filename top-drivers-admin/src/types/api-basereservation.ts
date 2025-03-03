import { type components } from "api/top-drivers/api";

export type Course = components['schemas']['ResponseCourseDto']
export type CourseRequest = components['schemas']['RequestCourseDto']

export type LoginUserRequest = components['schemas']['RequestUserLoginDto']
export type UserTokenRefreshRequest = components['schemas']['TokenModel']
export type Authentication = components['schemas']['AuthenticationResult']

export type TopDriversErrorDetails = components['schemas']['ErrorDetails']