//? For check
const checkUsername = async (client, username) => {
    const result = await client.db("user-and-pet").collection("user").findOne({
        username: username
    });
    if (result == null) {
        return false;
    } else {
        return true;
    }
}
const checkPet = async (client, id) => {
    const result = await client.db("user-and-pet").collection("pet").findOne({
        id: id
    });
    if (result == null) {
        return false;
    } else {
        return true;
    }
}

//? For Create
const userCreate = async (client, data) => {
    const result = await client.db("user-and-pet").collection("user").insertMany(data)
    console.log(`${result.insertedCount} new listings created with following id (s)`);
    return;
}
const petCreate = async (client, data) => {
    const result = await client.db("user-and-pet").collection("pet").insertMany(data)
    console.log(`${result.insertedCount} new listings created with following id (s)`);
    return;
}

module.exports = { userCreate, petCreate, checkUsername, checkPet };