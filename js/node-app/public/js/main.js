$(document).ready(function(){
  $('.deleteUser').on('click', deleteUser)
})
$(document).ready(function(){
  $('.deleteAllUsers').on('click', deleteAllUsers)
})

function deleteUser(){
  const confirmation = confirm('Are you sure?')
  if(confirmation) {
    $.ajax({
      type: 'DELETE',
      url: '/delete_user/' + $(this).data('id')
    })
    window.location.replace('/users')
  }else{return false}
}
function deleteAllUsers(){
  const confirmation = confirm('Are you sure?')
  if(confirmation) {
    alert(2)
  }
}
