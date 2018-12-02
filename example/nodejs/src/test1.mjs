import KintoClient from "kinto-http";

const kintoUrl = process.env.KINTO_URL
const client = new KintoClient(kintoUrl);

// const info = await client.fetchServerInfo([options]);
const info = await client.fetchServerInfo();

// const result = await client.createBucket("blog");


console.log(info)
