console.log('client.js Initialized');

$(document).ready(onReady);

class Food {
    constructor(name, type) {
        this.name = name,
        this.type = type
    }
};

function onReady() {
    console.log('JQuery.js Initialized');
    $('#submitNameTypeButton').on('click', newFood);
    $('table').on('click', '.deleteButton', deleteItem);
    loadTable();
};

function deleteItem() {
    console.log($(this).data().id);
    $.ajax({
        url: '/restaurant/' + $(this).data().id,
        method: 'DELETE'
    }).then( function () {
        loadTable();
    });
};

function loadTable() {
    $.ajax({
        url: '/restaurant',
        method: 'GET'
    }).then((response) => {
        $('#restaurant').empty();
        response.forEach( function (food) {
        $('#restaurant').append(`
            <tr>
                <td>${food.name}</td>
                <td>${food.type}</td>
                <td><button class="deleteButton" data-id="${food.id}">X</button></td>
            </tr>
        `)});
    });
};

function newFood() {
    let thisNewFood = new Food($('#inputName').val(), $('#inputType').val());
    $.ajax({
        url: '/restaurant',
        method: 'POST',
        data: thisNewFood
    }).then( function () {
        $('.restaurantInput').val('');
        loadTable();
    })
};

