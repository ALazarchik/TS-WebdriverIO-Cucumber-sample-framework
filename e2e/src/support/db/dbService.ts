import { Pool } from "pg";
import "dotenv/config";

const DB_CONNECTION = {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

class DBService {
    private pool;
    private result;
    private client;

    private setConnection() {
        this.pool = new Pool(DB_CONNECTION);
    }

    public async runQuery(query: string) {
        await this.setConnection();
        try {
            this.client = await this.pool.connect();
            this.result = await this.client.query(query);
        } catch (error) {
            throw new Error(`SQL error: ${error}\nSQL Query: ${query}`);
        } finally {
            this.client.release();
        }
        return this.result;
    }
}

export const dbService = new DBService();
