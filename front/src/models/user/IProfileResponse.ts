export interface IProfileResponse {
  status: string,
  message: string,
  body: {
    "email": string,
    "firstName": string,
    "lastName": string,
    "createdAt": string,
    "updatedAt": string,
    "id": string
  };
}