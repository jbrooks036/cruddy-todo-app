$(() => {
	const API_URL = "https://cruddy-todo-app-eaa32.firebaseio.com/task"

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

  // GET
  $.get(`${API_URL}.json`)
    .done((data) => {
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

    // CREATE:  form submit event to POST data to firebase
  $('form').submit(() =>
    // $.ajax({
    //   url: API_URL, 
    //   method: 'POST',
    //   data: JSON.stringify({ task: 'I was posted!'}) // needed for Firebase
    // })

    // or could use this instead: 
    $.post(`${API_URL}.JSON`, 
      JSON.stringify({ task: 'I was posted!' }))
    // TODO:  Grab the form text
    // TODO: Make this not refresh the page
  })

  $('tbody').on('click', '.delete', (e) => {
    const row = $(e.target).closest('tr')
    const id = row.data('id')
    debugger
       // which button got clicked?
    $.ajax({
      url:`${API_URL}/${id}.json`,
      method: 'DELETE'
    }).done(() => {
      row.remove()
    })
  })
})

// CREATE(implement 2nd): form submit event to POST data to firebase

// READ(implement 1st): GET data from firebase and display in table

// UPDATE(implement 4th): click event on complete to send PUT/PATCH to firebase

// DELETE(implement 3rd): click event on delete to send DELETE to firebase 




