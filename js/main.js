import { getState, initializeState, getFormResponses, createForm } from "./store.js"

async function main() {
    configuerCreationForm ();
    await initializeState ();
    const state = getState();
    console.log(state.forms);
    state.forms.forEach(tableRaw);

}


main();



 async function tableRaw(item, index) {
    const tBody = document.getElementById("TBODY");
    const tRaw= document.createElement("TR");
    const tTitle = document.createElement("TD");
    const tLink = document.createElement("TD");
    const tLastUpdated = document.createElement("TD");
    const tResponses = document.createElement("TD");
    const tEdit = document.createElement("TD");
    const tDelete = document.createElement("TD");


    const tTitleText = document.createTextNode(item.title); 
    tTitle.appendChild(tTitleText);
    
    const tLinkText = document.createTextNode(item.self.href);
    tLink.appendChild(tLinkText);

    const tLastUpdatedText = document.createTextNode(item.last_updated_at);
    tLastUpdated.appendChild(tLastUpdatedText);

    const responses = await getFormResponses(item.id);
    const tResponsesText = document.createTextNode(responses.total_items);
    tResponses.appendChild(tResponsesText);
    
    const tEditLink = document.createElement("A"); 
    tEditLink.href = `pages/edit.html?id=${item.id}`
    tEdit.appendChild(tEditLink);

    const tEditLinkText = document.createTextNode("edit");
    tEditLink.appendChild(tEditLinkText);



    // Aqui se creo el buton delete
    const tDeleteButton = document.createElement("button");
    tDeleteButton.innerHTML = "REMOVE";
    tDelete.appendChild(tDeleteButton);
    tDelete.addEventListener("click", removeItem);


 

    
    tRaw.appendChild(tTitle);
    tRaw.appendChild(tLink);
    tRaw.appendChild(tLastUpdated);
    tRaw.appendChild(tResponses);
    tRaw.appendChild(tEdit);
    tRaw.appendChild(tDelete);
    tBody.appendChild(tRaw);
  }

  
  // Aqui se creo el funcion para eliminar celdas
  function removeItem(event) {
    const tDelete = event.target;
    tDelete.parentElement.parentElement.remove();
}

function configuerCreationForm (){
    const tSubmit = document.getElementById("submit");
    tSubmit.addEventListener("click", create);
}

async function create() {
  const titleInput = document.getElementById("title")
  const workspaceInput = document.getElementById("workspace");
  const dataJs = {
  title: titleInput.value, 
   /*
    workspace: {
     href: workspaceInput.value
    }
    */
  }
  try {
    await createForm(dataJs);
    location.reload();
  } catch (error) {
    alert(error); 
  }
}