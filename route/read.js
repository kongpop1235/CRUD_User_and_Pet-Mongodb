const userFind = async (client, data) => {
    const cursor = await client.db("user-and-pet").collection("user").find(data).sort({ fname: 1 });
    const result = await cursor.toArray();
    return result;
}
const petFind = async (client, data) => {
    const cursor = await client.db("user-and-pet").collection("pet").find(data).sort({ id : 1 });
    const result = await cursor.toArray();
    return result;
}

module.exports = { userFind, petFind};