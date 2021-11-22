// exporta as functions para uma rota especificá no documento routs ou outro determinado
const fs = require('fs');
const data = require('../data.json')
const {age, date} = require('../utils')


exports.redirect = function(req, res){

  return res.redirect("instructors")
}
exports.index = function(req, res){

  return res.render("instructors/index", { instructors: data.instructors})
}

// CREATE/ POST
exports.create = function (req, res){
  return res.render("instructors/create")
}
exports.post =  function (req, res) {

  const keys = Object.keys(req.body)

  for (key of keys) {
    if( req.body[key] == ""){
      return res.send('Please, fill all fields')
    }
  }
  // desestruturação do req.body, ou seja, pegando as informações um por uma para poder passalas
  // separadamente para o array e construir o objeto
  let {avatar_url, name, birth, gender, services} = req.body

  birth = Date.parse(birth)

  const id = Number(data.instructors.length + 1)
  const created_at = Date.now()
  


  data.instructors.push({
    id,
    name, 
    avatar_url,
    birth, 
    gender, 
    services,
    created_at    
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) return res.send("Write file error!")

    return res.redirect("/instructors")
  })

  //return res.send(req.body)
}

//SHOW
exports.show = function (req, res) {
  // função de validação de conteudo
  const { id } = req.params

  const fundId = data.instructors.find(function (instructor) {
    return instructor.id == id
  })

  if (!fundId) return res.send("Instructor not fund!")



  //Desestruturação dos dados.
  const instructor = {
    ...fundId,
    age: age(fundId.birth),
    services: fundId.services.split(","),
    created_at: new Intl.DateTimeFormat("pt-BR").format(fundId.created_At)
  }

  return res.render("instructors/show", { instructor })

}

//EDIT
exports.edit = function (req, res) { 

  const { id } = req.params

  const fundId = data.instructors.find(function (instructor) {
    return instructor.id == id
  })

  if (!fundId) return res.send("Instructor not fund!")

  const instructor = {
    ... fundId,
    birth: date(fundId.birth).iso
  }

  return res.render("instructors/edit", {instructor})
}

//PUT
exports.put = function (req, res) {
  const { id } = req.body
  let index = 0

  const fundId = data.instructors.find(function (instructor, fundIndex) {
    if (id == instructor.id){
      index = fundIndex 
      return true
    }
  })

  if (!fundId) return res.send("Instructor not fund!")

  const instructor = {
    ...fundId,
    ...req.body, 
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.instructors[index] = instructor

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Write file error!")

    return res.redirect(`/instructors/${id}`)
  })
}

//DELETES
exports.delete = function (req, res) {
  const {id} = req.body

  const filteredId = data.instructors.filter(function (instructor) {
    return instructor.id != id
  })

  data.instructors = filteredId

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Write file error!")

    return res.redirect("/instructors")
  })

}