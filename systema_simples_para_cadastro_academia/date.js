function age (timestamp){
  const today = new Date()
  const birthDate = new Date(timestamp)

  //2021 - 1995 = idade
  let age = today.getFullYear() - birthDate.getFullYear()
  const month = today.getMonth() - birthDate.getMonth()

  if (month < 0 || month == 0 && today.getDate() - birthDate.getDate()) {
    age = age -1
  }

  return age
}


//Logica ano
//2021 - 1995 = idade

//Logica mês
//04 - 10 = -06
//04 - 04 = -0
//04 - 03 = 1

//Logica Dia
//11 - 20 = -10
//11 - 11 = 0
//11 - 10 = 1