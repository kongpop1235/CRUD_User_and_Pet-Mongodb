const userUpdate = async (client, find, update) => {
    const result = await client.db("user-and-pet").collection("user").updateOne(find, {$set: update});
    return result;
};

const petUpdate = async (client, find, update) => {
    const result = await client.db("user-and-pet").collection("pet").updateOne(find, {$set: update});
    return result;
};

module.exports = { userUpdate, petUpdate };