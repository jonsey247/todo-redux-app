
const formatDate = (date) => {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

const validate = (nameKey, myArray) => {
    const checked = {}
    let date = formatDate(new Date())
    checked.title = myArray.find(x => x.title === nameKey.title) ? false : true;
    checked.day = myArray.find(x => x.day === nameKey.day) ? false : true;
    checked.date = myArray.find(x => x.date === date) ? false : true;
    return checked
  }
    
    export default validate