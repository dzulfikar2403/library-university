import { Resend } from "resend";
import config from "./config";

const resend = new Resend(config.env.resend.ApiKey);

export default resend;