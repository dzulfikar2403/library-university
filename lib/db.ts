import { neon } from "@neondatabase/serverless";
import config from "./config";

const sql = neon(config.env.databaseUrl!)

export default sql;