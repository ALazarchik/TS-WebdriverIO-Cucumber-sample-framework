// import { ResetPasswordEmail } from "./httpModels";
// import { HTTP } from "./http";
// import { AxiosResponse } from "axios";
//
// class HttpMethods extends HTTP {
//     getEmailMessageFromAddress = async (userName: string): Promise<ResetPasswordEmail> => {
//         let response: AxiosResponse<ResetPasswordEmail>;
//         try {
//             response = await this.get(`https://app.endtest.io/mailbox?email=${userName}&format=json`);
//         } catch (error) {
//             console.error(error);
//         }
//         return response.data[0];
//     };
// }
//
// export const httpMethods = new HttpMethods();
