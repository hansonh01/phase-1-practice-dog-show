document.addEventListener('DOMContentLoaded',()=>{
    fetchDogs();
    patchDogs();
})

const localHost = 'http://localhost:3000/dogs';

function fetchDogs(){
    fetch(localHost)
    .then(resp=>resp.json())
    .then(dogs=>{
        dogs.forEach((dog)=>{
            renderDogs(dog);
        })
    })
}

function renderDogs(dog){
    const tableBody = document.getElementById('table-body');
    const row = document.createElement('tr');

    const dogName = document.createElement('td');
    dogName.textContent = dog.name;
    row.appendChild(dogName);

    const dogBreed = document.createElement('td');
    dogBreed.textContent = dog.breed;
    row.appendChild(dogBreed);

    const dogSex = document.createElement('td');
    dogSex.textContent = dog.sex;
    row.appendChild(dogSex);

    const editButton = document.createElement('td');
    const button = document.createElement('button');
    button.textContent = 'Edit';
    button.addEventListener('click',()=>populateForm(dog));
    editButton.appendChild(button);
    row.appendChild(editButton);

    tableBody.appendChild(row);
}

function populateForm(dog){
    const dogForm = document.getElementById('dog-form');
    dogForm.elements.name.value = dog.name;
    dogForm.elements.breed.value = dog.breed;
    dogForm.elements.sex.value = dog.sex;
    dogForm.dataset.dogId = dog.id;
}

function patchDogs(){
    document.getElementById('dog-form').addEventListener('submit',(e)=>{
        e.preventDefault();
        const form = e.target;
        const dogId = form.dataset.dogId;

        fetch(`${localHost}/${dogId}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                name: form.elements.name.value,
                breed: form.elements.breed.value,
                sex: form.elements.sex.value,
            }),
        })
            .then(resp=>resp.json())
            .then(()=>{
                form.reset();
                form.removeAttribute('data-dog-id');
                const tableBody = document.getElementById('table-body');
                tableBody.innerHTML = '';
                fetchDogs();
            })
    })
}