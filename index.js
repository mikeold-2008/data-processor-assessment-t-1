const axios = require('axios')

function fetchData(){
    return axios.get("https://dummyjson.com/users")
    .then((response)=>{
        return response.data.users
    })
}

function parseData(rawUserData){
    
    let parsedUserArray = []
     rawUserData.map((user)=>{
        let dateOfBirth = new Date(user.birthDate)
        parsedUserArray.push(
            {
                "name": user.firstName + " " + user.lastName,
                "email": user.email,
                "age": user.age,
                "gender": user.gender[0].toUpperCase()+user.gender.slice(1),
                "phone": "+"+user.phone.replaceAll(/[^0-9]/g,""),
                "latitude": user.address.coordinates.lat,
                "longitude": user.address.coordinates.lng,
                 "dob": dateOfBirth.toLocaleDateString('en-GB')
            }
        )

        console.log(parsedUserArray)
     })
}




fetchData().then((rawUserData)=>{
    parseData(rawUserData)
})