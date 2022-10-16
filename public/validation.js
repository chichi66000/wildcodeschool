
let errorAPI = document.getElementById('errorAPI');
if (errorAPI.textContent !== "") {
    errorAPI.classList.toggle('d-none');
}

function getAllArgonautes () {
    fetch('/argonaute')
    .then(res => {
        if (res.status>=200 && res.status <300) {
          return res.json()
        }else{
          throw new Error();
        }
    })
    .then(
        data=> {
            // console.log(data.argonautes)
            let list = data.argonautes;
            let argonautes = []
            for (let i=0; i< list.length; i++) {
                argonautes.push(list[i].nom)
            }
            localStorage.setItem('argonautes', JSON.stringify(argonautes));
            showArgonautes()
    })
    .catch(err=> {
        console.log(err);
        errorAPI.textContent = "Problème server, tenter plus tard!"
    })
}


// afficher la list des argonautes 
function showArgonautes () {
    let noms = JSON.parse(localStorage.getItem('argonautes')) ;
    
    // replace ancien liste et update nouvelle liste
    const newList = document.createElement("div");
    newList.setAttribute('class', 'd-flex flex-column-reverse flex-sm-row justify-content-between flex-wrap ')
    // newList.setAttribute('style', 'overflow-y: scroll;')
    for (let y =  0; y < noms.length; y++) {
        let p = document.createElement('p');
        p.setAttribute('class', 'text-break mx-1 p-2');
        // p.setAttribute('style', '');
        p.textContent = noms[y];
        newList.appendChild(p);
    }
    let listArgonautes = document.getElementById('list');
    const childDiv = listArgonautes.firstChild;
    listArgonautes.replaceChild(newList, childDiv);
}

// submit le formulaire
let btn = document.getElementById('btn');
btn.addEventListener('click', (e) => {
    e.preventDefault();
    // récupérer le champs de input name
    let error = document.getElementById('error');
    let input = document.getElementById('name')
    let inputName = input.value
    
    // validate ce champs: pas vide, au moins 2 characters, que des lettres et espace 
    let regex = /^[a-zA-Z\s,;:!.]+$/gi;
    let messageError = "";

    if (inputName === "") {
        messageError ="Veuillez remplir le champs";
    }
    else if (inputName.length < 2) {
        messageError = "Au moins 2 characters"
    }
    else if(regex.test(inputName) === false) {
        messageError = "Accept les characters A-Z, espace et (, ; : ! . ) seulement"
    }
    else {
        messageError = ""
        const options = {
            method: 'POST',
            body: new URLSearchParams({
                'nom': inputName
            }),
        }
        // request POST
        fetch('/argonaute', options)
        .then(response => {
            if(response.status === 200) {
                // recharger la list
                getAllArgonautes();
                showArgonautes();
            }
        })
        // reset input
        .then(() => {
            let form = document.getElementById('form');
            form.reset();
        })
        .catch(error => {
            console.log(error)
            errorAPI.innerHTML = "Problème server, tenter plus tard!"
        });
    }

    // afficher message error
    if (messageError !== "") {
        input.classList.add('is-invalid');
        error.classList.add('invalid-feedback');
        error.classList.remove('d-none');
        error.innerHTML = messageError
    }
    else {
        error.classList.add('d-none');
    }
})

document.addEventListener("DOMContentLoaded", () => {
    getAllArgonautes();
    
});

// récupérer la liste auomatique chaque 30s
// setInterval(function() {
//     getAllArgonautes();
// }, 10000)