
const validate = (nameKey, myArray) => {
    const checked = {}
    checked.title = myArray.find(x => x.title === nameKey.title) ? false : true;
    checked.day = myArray.find(x => x.title === nameKey.day) ? false : true;
    return checked
  }
    
    export default validate