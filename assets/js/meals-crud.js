class Meal {
    constructor(id, name, description, price, picture) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.picture = picture;
    }
}

let file = undefined;

window.onload = () => {
    const reqOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({username: 'admin', password: 'ilikecats'})
    };


    fetch('https://soup-back.mybluemix.net/auth/login', reqOptions)
        .then(response => response.json())
        .then(json => {
            if (json.successful) {
                window.localStorage.setItem('token', json.result.token);
            }
        });
}

function postMeal() {
    const token = window.localStorage.getItem('token');

    if (!token) {
        return alert('You are not authenticated');
    }

    const reqOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        }
    };

    const meal = new Meal();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;

    meal.name = name;
    meal.description = description;
    meal.price = price;

    getRef("meals/" + file.name + "_" + Date.now()).then(ref => {
        const uploadTask = ref.put(file, {contentType: 'image/png'});

        uploadTask.on(
            'state_changed',
            null,
            (error) => console.error("There was an error", error),
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    meal.picture = url;
                    reqOptions.body = JSON.stringify(meal);

                    fetch('https://soup-back.mybluemix.net/meals/admin', reqOptions)
                        .then(response => response.json())
                        .then(json => {
                            if (json.successful) {
                                refreshMealsList();
                            }
                        });
                });
            },
        );
    }).catch(error => console.error(error));
}

function refreshMealsList() {
    let list = document.getElementById("meal-list");
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };

    list.innerHTML = "";
    fetch('https://soup-back.mybluemix.net/meals', options)
        .then(response => response.json())
        .then(json => {
            const meals = json.result.reverse();

            meals.forEach(meal => {
                list.innerHTML += `
                    <div class="list-tile">
                        <div class="leading"><img src="${meal.picture}" alt="thumbnail"></div>
                        <div class="content">
                            <p class="title">${meal.name}</p>
                            <p class="subtitle">${meal.description}</p>
                        </div>
                        <div class="trailing">
                            <span>$ ${meal.price}</span>
                        </div>
                    </div>
                `
            });
        });
}

function initListeners() {
    document.getElementById('picture').addEventListener('change', function (e) {
        file = e.target.files[0];
    });
}

initListeners();
refreshMealsList();

