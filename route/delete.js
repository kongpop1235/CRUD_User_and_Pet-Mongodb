const deleteUser = async (client, data) => {
    const result = await client.db("user-and-pet").collection("user").deleteOne(data);
    return result;
}

const deletePet = async (client, data) => {
    const result = await client.db("user-and-pet").collection("pet").deleteOne(data);
    return result;
}

module.exports = { deleteUser, deletePet };