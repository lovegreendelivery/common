import { PrismaClient } from "@prisma/client";
import { DatabaseExecutionError } from "../errors/DatabaseExecutionError";

const database = new PrismaClient();

type Query<T> = (db: PrismaClient) => Promise<T>;

async function runQuery<T>(query: Query<T>): Promise<T> {
  try {
    const result = await query(database);
    return result;
  } catch (err) {
    console.log(err);
    throw new DatabaseExecutionError();
  }
}

export { database, runQuery };
