module.exports = {
    // Função logica para idade
    age: function (timestamp){
      const today = new Date()
      const birthDate = new Date(timestamp)
    
      let age = today.getFullYear() - birthDate.getFullYear()
      const month = today.getMonth() - birthDate.getMonth()
    
      if (month < 0 || month == 0 && today.getDate() - birthDate.getDate()) {
        age = age -1
      }
    
      return age
    },

    date: function(timestamp){
      const date = new Date(timestamp)

      //yyyy
      const year = date.getUTCFullYear()

      //mm
      const month = `0${date.getUTCMonth() + 1}`.slice(-2)

      //dd
      const day = `0${date.getUTCDate()}`.slice(-2)

      return {
        day,
        month,
        year,
        iso: `${year}-${month}-${day}`,
        birthDay: `${day}/${month}`,
      };
    },

    exam: function(select){
      if (select == "A+"){
        return 'A+'
      } 
      else if (select == "A-"){
        return 'A-'
      }
      else if (select == "B+") {
        return 'B+'
      }
      else if (select == "B-") {
        return 'B-'
      }
      else if (select == "AB+") {
        return 'AB+'
      }
      else if (select == "AB-") {
        return 'AB-'
      }
      else if (select == "O+") {
        return 'O+'
      }
      else if (select == "O-") {
        return 'O-'
      }
    },
    
}