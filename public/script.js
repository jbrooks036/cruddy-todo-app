$(() => {
	const API_URL = "https://cruddy-todo-app-eaa32.firebaseio.com/task"
  let token = null

  // 'data-id' is js attribute, not css 'id'
  const addItemToTable = (item, id) => {
    const row = `<tr data-id="${id}">
      <td>${item.task}</td>
      <td>
        <button class="btn btn-success complete">Complete</button>
        <button class="btn btn-danger" delete>Delete</button>
      </td>
    </tr>`

    $('tbody').append(row)
  }

  // CREATE:  form submit event to POST data to firebase
  $('.new form').submit(() => {
    // $.ajax({
    //   url: API_URL.json, 
    //   method: 'POST',
    //   data: JSON.stringify({ task: 'I was posted!'}) // 'stringify' needed for Firebase
    // })
    // or use this instead: 
    $.post(`${API_URL}.json?auth=${token}`, 
      JSON.stringify({ task: 'I was posted!' })
    )
    // TODO:  Grab the form text
    $('.add-item').on("submit", (e) => {
      console.log("add-item button clicked")
      alert( "Handler for .add-item() called." );
      e.preventDefault();
    })
    // TODO: Make this not refresh the page
  })

  $('tbody').on('click', '.delete', (e) => {
    const row = $(e.target).closest('tr')
    const id = row.data('id')
    debugger
    
    // which button got clicked?
    $.ajax({
      url:`${API_URL}/${id}.json?auth=${token}`,
      method: 'DELETE'
    }).done(() => {
      row.remove()
    })
  })

  firebase.initializeApp({
    apiKey: "AIzaSyBu7HFGByove02FkMMcYtVd8SpuojM8KGU",
    authDomain: "cruddy-todo-app-eaa32.firebaseapp.com",
    databaseURL: "https://cruddy-todo-app-eaa32.firebaseio.com",
    storageBucket: "cruddy-todo-app-eaa32.appspot.com",
  })

  // both return promise like objects
  const login = (email, password) => (
    firebase.auth()
    .signInWithEmailAndPassword(email, password)
  )

  const register = (user, password) => (
    firebase.auth().createUserWithEmailAndPassword(user, password)
  )

  $('.login form').submit((e) => {
    const form = $(e.target)
    const email = form.find('input[type="text"]').val()
    const password = form.find('input[type="password"]').val()

    login(email, password)
    .then(console.log)
    .then(console.err)

    e.preventDefault()
  })

  $('input[value="Register"]').click((e) => {
    const form = $(e.target).closest('form')
    const email = form.find('input[type="text"]').val()
    const password = form.find('input[type="password"]').val()

    register(email, password)
      .then(() => login(email, password))
      .then(console.log)
      .catch(console.err)

    e.preventDefault()
  })

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //logged in
      $('.app').show()
      token = user._lat
      getTasks()
    }else {
      // not logged in
      $('.login').show()
    }
  })

  
// READ: GET data from firebase and display in table
  const getTasks = () => {
    $.get(`${API_URL}.json?auth=${token}`)
      .done((data) => {
        console.log("data = ", data)
        if (data) {
          // for (id in data) {
          //    add ItemToTable(data[id])
          // }

          Object.keys(data).forEach((id) => {
            addItemToTable(data[id], id)
          })
        }
        //TODO:  handle completed tasks
      })
  }
})

// CREATE(implement 2nd): form submit event to POST data to firebase

// READ(implement 1st): GET data from firebase and display in table

// UPDATE(implement 4th): click event on complete to send PUT/PATCH to firebase

// DELETE(implement 3rd): click event on delete to send DELETE to firebase 




