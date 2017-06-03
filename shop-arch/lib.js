//
//
// my little library


function $(selector) {
  if(document.querySelector(selector) === null) {
    console.log('Element was not found')
    return {
      click: function(arg) {
        console.log('click on non existing Element')
        return
      },
      append: function(arg) {
        console.log('click on non existing Element')
        return
      }
    }
  }
  const ELEMENT = document.querySelector(selector)
  ELEMENT.click = function(callback) {
    ELEMENT.addEventListener('click', callback)
  }
  ELEMENT.append = function(arg) {
    if(typeof arg === 'string') {
       if(arg.length === 0) {
        this.innerHTML = ''
      } else {
        this.innerHTML += arg
      }
    } else if(typeof arg === 'object') {
      this.appendChild(arg)
    } else {
      let type = typeof arg
      console.log(`ERROR at ELEMENT.append at $\nType of argument is ${type.toUpperCase()}`)
    }
  }
  return ELEMENT
}
//
//
//
