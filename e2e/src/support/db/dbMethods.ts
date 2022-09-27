import { LIST_OF_QUERIES } from "./dbQueries";
import { dbService } from "./dbService";

class DbMethods {
    // public async getRandomUserDisplayName(): Promise<GetUserDisplayName> {
    //     let result;
    //     const query = LIST_OF_QUERIES.GET_RANDOM_USER_DISPLAY_NAME();
    //     try {
    //         result = await dbService.runQuery(query);
    //     } catch (error) {
    //         throw new Error(`Error while executing next query: ${query}.\nError - ${error}`);
    //     }
    //     return result.rows[0];
    // }
}

export const dbMethods = new DbMethods();
