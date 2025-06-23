import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

// Puedes exportar varias conexiones si tienes varias bases de datos
const productsClient = createClient({ url: process.env.PRODUCTS_DB_FILE! });
export const productsDb = drizzle(productsClient, { schema });

// Si tienes users:
// const usersClient = createClient({ url: process.env.USERS_DB_FILE! });
// export const usersDb = drizzle(usersClient, { schema: usersSchema });
