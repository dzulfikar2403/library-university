import { getBook } from "@/action/book";

const dayjs = require('dayjs')
var utc = require("dayjs/plugin/utc");

dayjs.extend(utc)

const tes = dayjs().unix() * 1000;
console.log(tes);

const tesfunc = async () => {
    const {data} = await getBook();
    console.log(data);
}

tesfunc();
