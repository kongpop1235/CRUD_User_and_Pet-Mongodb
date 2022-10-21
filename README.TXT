'nodemon index.js' to start

in index.js file line 23 const uri use your mongodb link. 

Check Modles for Create in ../modles/petModles.js or userModles.js

How to :
    POST.Create :
        User : 
            path : create/user
            use body(JSON) for send data
            Ex. 
                [
                    {
                        "username": "your username",
                        "fname": "first name",
                        "lname": "last name",
                        "age": 18,
                        "pet": 1
                    },
                    {
                        "username": "your username",
                        "fname": "first name",
                        "lname": "last name",
                        "age": 18,
                        "pet": 1
                    },
                    ...
                ]
        Pet : 
            path : create/pet
            use body(JSON) for sent data
            Ex. 
                [
                    {
                        "id": 0,
                        "name": "first name",
                        "type": "last name",
                    },
                    {
                        "id": 1,
                        "name": "pet name",
                        "type": "type of pet",
                    }
                    ...
                ]
    POST.Update : 
        User :
            path : update/user 
            use body(JSON) for sent data
            Ex1.
                {
                    "username": "your username",
                    "fname": "first name",
                    "lname": "last name",
                    "age": 18,
                    "pet": 1,
                    //this below is data for update but don't need to use all of them. you can use some of them.
                    "setfname": "first name update",
                    "setlname": "last name update",
                    "setage": 18,
                    "setpet": 1
                }
            Ex2.
                {
                    "username": "your username"
                    //this below is data for update but don't need to use all of them. you can use some of them.
                    "setage": 18,
                    "setpet": 1
                }
        Pet : 
            path : update/pet
            use body(JSON) for sent data
            Ex1.
                {
                    "id" : 1,
                    "name" : "pet name",
                    "type" : "pet type",
                    //this below is data for update but don't need to use all of them. you can use some of them.
                    "setname" : "pet name update",
                    "settype" : "pet type update"
                }
            Ex2.
                {
                    "id" : 1,
                    //this below is data for update but don't need to use all of them. you can use some of them.
                    "setname" : "pet name update"
                }
    GET.View :
        User : 
            path : read/user
            use query for sent data
            Ex1.
                "read/user/?username=______&fname=______&lname=______&age=___&pet___"
            Ex2.
                "read/user/?age=___"
        Pet :
            path : read/pet
            use query for sent data
            Ex1.
                "read/pet/?id=___&name=______&type=______"
            Ex2.
                "read/pet/?type=_____"
    DELETE.Delete :
        User :
            path delete/user
            Ex.
                {
                    "username" : "your username"
                }
        Pet :
            path delete/pet
            Ex.
                {
                    "id" : 1
                }