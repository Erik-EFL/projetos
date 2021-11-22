// exporta as functions para uma rota especificá no documento routs ou outro determinado
const fs = require('fs');
const data = require('../data.json')
const { date, exam } = require('../utils')


exports.index = function(req, res){

  return res.render("members/index", { members: data.members})
}

// CREATE/ POST
exports.create = function (req, res){
  return res.render("members/create")
}
exports.post =  function (req, res) {

  const keys = Object.keys(req.body)

  for (key of keys) {
    if( req.body[key] == ""){
      return res.send('Please, fill all fields')
    }
  }
 
  birth = Date.parse(req.body.birth)

  // Logica para fornecer ID para um member no array
  let id = 1
  const lastMember = data.members[data.members.length -1]

  //caso haja algum numero na variavel lastMember
  if (lastMember) {
    id = lastMember.id + 1 //cria o proximo ID
  }


  data.members.push({
    id,
    ...req.body,
    birth
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) return res.send("Write file error!")

    return res.redirect(`/members/${id}`)
  })

  //return res.send(req.body)
}

//SHOW
exports.show = function (req, res) {
  // função de validação de conteudo
  const { id } = req.params

  const fundId = data.members.find(function (member) {
    return member.id == id
  })

  if (!fundId) return res.send("member not fund!")



  //Desestruturação dos dados.
  const member = {
    ...fundId,
    birth: date(fundId.birth).birthDay,
    exam: exam(fundId.blood)
  }

  return res.render("members/show", { member })

}

//EDIT
exports.edit = function (req, res) { 

  const { id } = req.params

  const fundId = data.members.find(function (member) {
    return member.id == id
  })

  if (!fundId) return res.send("member not fund!")

  const member = {
    ... fundId,
    birth: date(fundId.birth).iso
  }

  return res.render("members/edit", {member})
}

//PUT
exports.put = function (req, res) {
  const { id } = req.body
  let index = 0

  const fundId = data.members.find(function (member, fundIndex) {
    if (id == member.id){
      index = fundIndex 
      return true
    }
  })

  if (!fundId) return res.send("member not fund!")

  const member = {
    ...fundId,
    ...req.body, 
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.members[index] = member

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Write file error!")

    return res.redirect(`/members/${id}`)
  })
}

//DELETES
exports.delete = function (req, res) {
  const {id} = req.body

  const filteredId = data.members.filter(function (member) {
    return member.id != id
  })

  data.members = filteredId

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Write file error!")

    return res.redirect("/members")
  })

}