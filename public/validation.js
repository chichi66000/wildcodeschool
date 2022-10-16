
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
            // console.log(list);
            // for (let i=0; i< list.length; i++) {
            //     argonautes.push(list[i].nom)
            // }
            localStorage.setItem('salut', JSON.stringify('hi'))
            localStorage.setItem('argonautes', JSON.stringify(list));
            showArgonautes()
            deleteArgonaute()
    })
    .catch(err=> {
        console.log(err);
        errorAPI.textContent = "Problème server, tenter plus tard!"
    })
}

// afficher la list des argonautes avec localStorage
function showArgonautes () {
    let noms = JSON.parse(localStorage.getItem('argonautes')) ;
    // replace ancien liste et update nouvelle liste
    const newList = document.createElement("div");
    newList.setAttribute('class', ' d-flex flex-column-reverse flex-sm-row justify-content-between flex-wrap border border-warning rounded p-1 m-1 bg-light')
    
    for (let y =  0; y < noms.length; y++) {
        let a = document.createElement('a');
        a.setAttribute('class', 'equipage text-break mx-1 p-2 btn');
        a.setAttribute('id', noms[y]._id);
        // a.addEventListener('click', deleteArgonaute())
        a.textContent = noms[y].nom;
        newList.appendChild(a);
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
                // showArgonautes();
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


// funtion delete One Argonaute
function deleteArgonaute () {
    // e.preventDefault();
    // swal("delete " , id);
    let equipage = document.querySelectorAll('a.equipage')
    
    equipage.forEach( function (item) {
        item.addEventListener('click', (e) => {
            let id = e.target.id;
            // console.log(e.target.textContent);
            // console.log(e.target.id);
            swal({
                title: "Vous voulez supprimer cet argonaute?",
                // text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                    //   send id to server backend to
                        fetch('/argonaute', {
                            method: 'DELETE',
                            body: new URLSearchParams({
                                'id': id
                            }),
                        })
                        .then( (response) => {
                            if(response.status === 200) {
                                getAllArgonautes()
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    }
                }) 
            
        })
        
    })
    // console.log("delete ");
    // event.preventDefault();
}


document.addEventListener("DOMContentLoaded", () => {
    getAllArgonautes();
});


// récupérer la liste auomatique chaque 30s
setInterval(function() {
    getAllArgonautes();
}, 10000)