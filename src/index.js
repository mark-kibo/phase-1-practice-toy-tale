let addToy = false;
let toyDiv = document.getElementById('toy-collection')
let form = document.querySelector("form");



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // add card  to our toy div
  let toys = getData()
  toys.then(data => {
    data.map((toy) => {
      let toyCard = document.createElement('div');
      toyCard.setAttribute('class', 'card')
      toyCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>
    `
      toyDiv.appendChild(toyCard);
      //  like image listener
      const likeButton = toyCard.querySelector('.like-btn');
     likeButton.addEventListener("click",(e)=>{
      let imageLike={"likes":toy.likes+1}
      console.log(patchData(imageLike, e.target.id));
     })
    })

  })

  // create a toy
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let toyObject = {}
    let nodeList = e.target.querySelectorAll("input.input-text");
    nodeList.forEach(element => {
      toyObject.name = element.name
      toyObject.imageUrl = element.value
    });
    let toyCreate = postData(toyObject);
    console.log(toyCreate);
    form.reset();
  })
  

  
}
);




// get data from server
const getData = async () => {
  try {
    // get data from server
    const response = await fetch('http://localhost:3000/toys');
    if (response.status != 200) {
      throw new Error("No data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// patch data to server(partially update)
const patchData = async (body, id) => {
  let passedData = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(body)
  }
  try {
    const response = await fetch(`http://localhost:3000/toys/${id}`, passedData);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }

}


