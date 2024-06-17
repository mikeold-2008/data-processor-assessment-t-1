const axios = require('axios')
const fs = require("fs")

function fetchData(){
    return axios.get("https://dummyjson.com/users")
    .then((response)=>{
        return response.data.users
    })
    .catch((error)=>{
        console.log("Error occured while fetching user data: ",error)
    })
}

function parseData(rawUserData){
    const parsedUserArray = []
    rawUserData.map((user)=>{
    const dateOfBirth = new Date(user.birthDate)
    parsedUserArray.push(
            {
            "Name": user.firstName + " " + user.lastName,
            "Email Address": user.email,
            "Age": user.age,
            "Gender": user.gender[0].toUpperCase()+user.gender.slice(1),
            "Phone": "+"+user.phone.replaceAll(/[^0-9]/g,""),
            "Latitude": user.address.coordinates.lat,
            "Longitude": user.address.coordinates.lng,
            "DOB": dateOfBirth.toLocaleDateString('en-GB')
            }
        )
     })
     return parsedUserArray
}

function exportToCSV(parsedUserArray){
    const rows = []
    const header = Object.keys(parsedUserArray[0])
    rows.push(header.join(","))
    for (const row of parsedUserArray){
        const values = header.map((head)=>{
            return row[head]
        })
        rows.push(values.join(","))
    }

    let output = rows.join("\n")

    fs.writeFile("users.xlsx",output.toString(), (error)=>{
        if(error){
            console.log("Error occured attempting to write user data to output file",error)
        }
        else{
            console.log("File output successful")
        }
    })
}




fetchData()
.then((rawUserData)=>{
    return parseData(rawUserData)
})
.then((parsedUserArray)=>{
    exportToCSV(parsedUserArray)
})
.catch((error)=>{
    console.log(error)
})