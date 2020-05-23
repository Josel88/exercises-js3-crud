let state = {forms: []}
export function getState (){
    return state;
}


export function setForms (forms) {
    state = {...state, forms};
    console.log(state); 
}

export function getFormById (id) {
    console.log(state);
    let result = state.forms.filter(item => item.id == id);
    if(result == null){
        return null;
    }
    return result[0];
}

function getFormList () {
    const url = 'https://api.typeform.com/forms'
  return fetch(url, {
    headers: {
      Authorization: "Bearer 6e37Df6aMR8H9scRiB5xSTDrqpPA6ETkybdzAnddJKGt"
    }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(response.status);
      }
      return response.json();
  })
      
 }

 export async function initializeState () {
    const result = await getFormList();
    console.log(result.items);
    setForms (result.items);
 }

 export function getFormResponses (formId) {
    const url = `https://api.typeform.com/forms/${formId}/responses`
  return fetch(url, {
    headers: {
      Authorization: "Bearer 6e37Df6aMR8H9scRiB5xSTDrqpPA6ETkybdzAnddJKGt"
    }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(response.status);
      }
      console.log(response);
      return response.json();
  })
      
 }

 export function createForm (data) {
    const url = `https://api.typeform.com/forms`
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json',
        
      Authorization: "Bearer 6e37Df6aMR8H9scRiB5xSTDrqpPA6ETkybdzAnddJKGt"
    }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(response.status);
      }
      console.log(response);
      return response.json();
  })
      
 }