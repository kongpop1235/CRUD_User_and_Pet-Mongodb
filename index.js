var { MongoClient } = require('mongodb');
var express = require('express');
var bp = require('body-parser')
var app = express();
var PORT = process.env.PORT || 5000;

//importfile
var create = require('./route/create');
var read = require('./route/read');
var update = require('./route/update');
var deleteData = require('./route/delete');

//import template
const userTemplate = require('./modles/userModles');
const petTemplate = require('./modles/petModles');

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.listen(PORT, () => console.log(`server is running on port : ${PORT}`));

const main = async () => {
    const uri = "";

    const client = new MongoClient(uri);

    try {

        //* Create user and pet
        app.route('/create/:way').post(async (req, res) => {
            await client.connect();
            if (req.params.way == null) {
                res.send(`path null! use '/pet' or '/user'`);
            }
            //*Create user
            if (req.params.way == `user`) {
                //? Set value
                let createUser = [];
                let err = false;
                let errtext = '';

                for (x in req.body) {
                    errtext += `array[${parseInt(x) + 1}] required\n`;
                    //? Check username
                    if (await create.checkUsername(client, req.body[x].username)) {
                        err = true;
                        errtext += `Array ${x} : username is already used\n`;
                    }

                    //? User template
                    createUser.push(new userTemplate({
                        username: req.body[x].username,
                        fname: req.body[x].fname,
                        lname: req.body[x].lname,
                        age: req.body[x].age,
                        pet: req.body[x].pet
                    }));

                    //? Check for null
                    if (createUser[x].validateSync() != undefined) {
                        err = true;
                        if (createUser[x].validateSync().errors['username'] != undefined) {
                            errtext += `${createUser[x].validateSync().errors['username'].message}\n`;
                        }
                        if (createUser[x].validateSync().errors['fname'] != undefined) {
                            errtext += `${createUser[x].validateSync().errors['fname'].message}\n`;
                        }
                        if (createUser[x].validateSync().errors['lname'] != undefined) {
                            errtext += `${createUser[x].validateSync().errors['lname'].message}\n`;
                        }
                        if (createUser[x].validateSync().errors['age'] != undefined) {
                            errtext += `${createUser[x].validateSync().errors['age'].message}\n`;
                        }
                        if (createUser[x].validateSync().errors['pet'] != undefined) {
                            errtext += `${createUser[x].validateSync().errors['pet'].message}\n`;
                        }
                    }
                }

                //? Result error text
                if (err) {
                    res.send(errtext);
                } else {
                    create.userCreate(client, createUser);
                    res.send(createUser);
                }

                //*Create Pet
            } else {
                const createPet = [];
                let err = false;
                let errtext = '';

                for (x in req.body) {

                    //? Checck pet
                    if (await create.checkPet(client, req.body[x].id)) {
                        err = true;
                        errtext += `Array ${x} : \nid is already used\n`
                    }

                    //? Pet template
                    createPet.push(new petTemplate({
                        id: req.body[x].id,
                        name: req.body[x].name,
                        type: req.body[x].type
                    }));

                    //?Check for null
                    if (createPet[x].validateSync() != undefined) {
                        err = true;
                        if (createPet[x].validateSync().errors['id'] != undefined) {
                            errtext += `${createPet[x].validateSync().errors['id'].message}\n`;
                        }
                        if (createPet[x].validateSync().errors['name'] != undefined) {
                            errtext += `${createPet[x].validateSync().errors['name'].message}\n`;
                        }
                        if (createPet[x].validateSync[x].errors['type'] != undefined) {
                            errtext += `${createPet[x].validate().errors['type'].message}\n`;
                        }
                    }
                }

                //? Result error text
                if (err) {
                    res.send(errtext);
                } else {
                    create.petCreate(client, createPet);
                    res.send(`Create ${createPet.length} document : \n` + createPet);
                }
            }
        });

        //* Read user and pet
        app.route('/read/:way').get(async (req, res) => {
            await client.connect();
            if (req.params.way === null) {
                res.send(`path null! use '/pet' or '/user'`);
            }

            //*Read user
            if (req.params.way === `user`) {
                var username = req.query.username;
                var fname = req.query.fname;
                var lname = req.query.lname;
                if (
                    username === undefined &&
                    fname === undefined &&
                    lname === undefined &&
                    req.query.age === undefined &&
                    req.query.pet === undefined
                ) {
                    res.send(`query is null\nuse :\n'?username=_____'\n'?fname=_____'\n'?lname=_____'\n'?age=_____'\n'?pet=_____'`);
                    return;
                }

                var regexUsername = new RegExp(["^", username, "$"].join(""), "i");
                if (username === undefined) {
                    regexUsername = undefined;
                }

                var regexFname = new RegExp(["^", fname, "$"].join(""), "i");
                if (fname === undefined) {
                    regexFname = undefined;
                }
                var regexLname = new RegExp(["^", lname, "$"].join(""), "i");
                if (lname === undefined) {
                    regexLname = undefined;
                }
                const data = {
                    username: regexUsername || { $ne: null },
                    fname: regexFname || { $ne: null },
                    lname: regexLname || { $ne: null },
                    age: parseInt(req.query.age) || { $ne: null },
                    pet: parseInt(req.query.pet) || { $ne: null }
                }
                res.send(await read.userFind(client, data));
            }

            //*Read pet
            if (req.params.way === `pet`) {
                var name = req.query.name;
                var type = req.query.type;
                if (
                    req.query.id === undefined &&
                    name === undefined &&
                    type === undefined
                ) {
                    res.send(`query is null\nuse :\n?id=___\n?name=___\n?type=___`);
                }

                var regexName = new RegExp(["^", name, "$"].join(""), "i");
                if (name === undefined) {
                    regexName = undefined;
                }
                var regexType = new RegExp(["^", type, "$"].join(""), "i");
                if (type === undefined) {
                    regexType = undefined
                }

                const data = {
                    id: parseInt(req.query.id) || { $ne: null },
                    name: regexName || { $ne: null },
                    type: regexType || { $ne: null }
                }
                res.send(await read.petFind(client, data));
            }
        });

        //* Update user and pet
        app.route('/update/:way').post(async (req, res) => {
            await client.connect();
            if (req.params.way === null) {
                res.send(`path null! use '/pet' or '/user'`);
            }

            //*Update user
            if (req.params.way === `user`) {
                var username = req.body.username;
                var fname = req.body.fname;
                var lname = req.body.lname;
                if (
                    username === undefined &&
                    fname === undefined &&
                    lname === undefined &&
                    req.body.age === undefined &&
                    req.body.pet === undefined
                ) {
                    res.send(`body is null`);
                    return;
                }

                var regexUsername = new RegExp(["^", username, "$"].join(""), "i");
                if (username === undefined) {
                    regexUsername = undefined;
                }

                var regexFname = new RegExp(["^", fname, "$"].join(""), "i");
                if (fname === undefined) {
                    regexFname = undefined;
                }
                var regexLname = new RegExp(["^", lname, "$"].join(""), "i");
                if (lname === undefined) {
                    regexLname = undefined;
                }

                const data = {
                    username: regexUsername || { $ne: null },
                    fname: regexFname || { $ne: null },
                    lname: regexLname || { $ne: null },
                    age: parseInt(req.body.age) || { $ne: null },
                    pet: parseInt(req.body.pet) || { $ne: null }
                }
                const dataUpdate = {};
                if (req.body.setusername != undefined) {
                    dataUpdate.username = req.body.setusername;
                }
                if (req.body.setfname != undefined) {
                    dataUpdate.fname = req.body.setfname;
                }
                if (req.body.setlname != undefined) {
                    dataUpdate.lname = req.body.setlname;
                }
                if (req.body.setage != undefined) {
                    dataUpdate.setage = req.body.setage;
                }
                if (req.body.setpet != undefined) {
                    dataUpdate.setpet = req.body.setpet;
                }
                if (await update.userUpdate(client, data, dataUpdate)) {
                    res.send("Update succeed");
                }
            }

            //*Update pet
            if (req.params.way === `pet`) {
                var name = req.body.name;
                var type = req.body.type;
                if (
                    req.body.id === undefined &&
                    name === undefined &&
                    type === undefined
                ) {
                    res.send(`body is null`);
                    return;
                }

                var regexName = new RegExp(["^", name, "$"].join(""), "i");
                if (name === undefined) {
                    regexName = undefined;
                }
                var regexType = new RegExp(["^", type, "$"].join(""), "i");
                if (type === undefined) {
                    regexType = undefined;
                }

                const data = {
                    id: parseInt(req.body.id) || { $ne: null },
                    name: regexName || { $ne: null },
                    type: regexType || { $ne: null }
                }
                const dataUpdate = {};
                if (req.body.setname != undefined) {
                    dataUpdate.name = req.body.setname;
                }
                if (req.body.settype != undefined) {
                    dataUpdate.type = req.body.settype;
                }
                if (await update.petUpdate(client, data, dataUpdate)) {
                    res.send("Update succeed");
                }
            }
        });

        //*Delete user and pet
        app.route('/delete/:way').delete(async (req, res) => {
            await client.connect();
            if (req.params.way === null) {
                res.send(`path null! use '/pet' or '/user'`);
            }

            //*Delete user
            if (req.params.way === `user`) {
                if (req.body.username === undefined) {
                    res.send(`body is null`);
                    return;
                }

                if (await deleteData.deleteUser(client, { username: req.body.username })) {
                    res.send("Delete succeed");
                }
            }

            //*Delete pet
            if (req.body.id === undefined) {
                res.send(`body is null`);
            }

            if (await deleteData.deletePet(client, { id: parseInt(req.body.id) })) {
                res.send("Delete succeed");
            }
        });

    } catch (e) {
        console.log(e)
    } finally {
        await client.close();
    }

}

main().catch(console.error);