import { getListBorrowRequest } from "@/action/user";

const dayjs = require('dayjs')
var utc = require("dayjs/plugin/utc");

// dayjs.extend(utc)

// const tes = dayjs().unix() * 1000;
// console.log(tes);

const tesfunc = async () => {
    const {data} = await getListBorrowRequest();
    console.log(data);
}

tesfunc();
