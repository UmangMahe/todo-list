let popup_display;
let render;

let todo_list_id = {
    raw_id: "",
    hash_id: function(id) {
        if (this.raw_id) {
            return "#" + this.raw_id;
        }
        return "#" + id;
    }
}

var todo_card = {
    heading: "",
    heading_id: function() {

        return this.heading.slice(0, 6).split(" ").join("") + Math.floor(Math.random() * 10000);

    },
    item_id: function(name) {
        return name.slice(0, 6).split(" ").join("") + Math.floor(Math.random() * 10000);
    }

}


function popup() {
    clearTimeout(popup_display);
    $("#add-list").css({
        "pointerEvents": "none"
    })
    $(".todo-list-ops").css("pointerEvents", "none");
    $("#body-container").toggleClass("body-blur");
    $(".popup-container").css({
        "display": "block",
        "animation": "slide-up 0.3s ease forwards"
    })
}



$("#add-list").click(() => {
    $(".popup-box h3").text("Add New List");
    $(".popup-box input").attr("id", "input-list-add");
    $("#input-list-add").attr("placeholder", "Enter list name");
    popup();
});


function closeCta() {
    $(".popup-container").css("animation", "slide-down 0.2s ease forwards");
    $("#body-container").toggleClass("body-blur");
    if ($(".popup-container").css("display") != "none") {
        popup_display = setTimeout(() => {
            $(".popup-container").css("display", "none")
        }, 500)
    }
    $("#add-list").css({
        "pointerEvents": "auto"
    })
    $(".todo-list-ops").css("pointerEvents", "auto");
}

$(".popup-box .close-cta").click(closeCta);


function renderTodoCard(todoName, heading_id) {

    render = '<div id="' + heading_id + '"  class="todo-card"><div class="todo-delete"><span id="' + heading_id + '" onclick  = "deleteTodoCard(this.id)" class="close-cta fas fa-times-circle"></span></div><span id="' + heading_id + '" onclick="showFull(this.id)" class="todo-heading"><h2>' + todoName + '<hr class="header-border"></h2></span><div class="task-container"><div class="pending-task"></div></div><div class="ops-container"><div class="todo-list-ops"><span id="' + heading_id + '" onclick="addItem(this.id)" class="function-icon add">+</span><div id="' + heading_id + '" onclick="deleteTodoItem(this.id)" class="function-icon delete"><span class = "fa fa-trash-o"></span></div></div></div><div class="blur-overlay"></div></div></div>';

    $(".todo-card-container").append(render);

}

function showFull(headingId) {
    let id;
    id = todo_list_id.hash_id(headingId);
    console.log(id);
    $(".todo-card").css("display", "none")
    $("#body-container").addClass("full-width");
    $("#full-width-heading").css("display", "unset")
    $("#main-heading").css("display", "none");

    let headingName = $(id + " .todo-heading h2").text();
    $("#full-width-heading h1").text(headingName);
    $(id + ".todo-card").css("display", "inherit");


}


$("#back-normal-width").click(() => {
    $("#body-container").removeClass("full-width");
    $("#full-width-heading").css("display", "none");
    $("#main-heading").css("display", "inherit");
    $(".todo-card").css("display", "inherit")
})

function renderTodoItem(todoItem) {

    let hashId = todo_list_id.hash_id()
    console.log(hashId);
    let pendingId = "task-" + todo_card.item_id(todoItem);
    render = '<div id="todo-task" class="pending-task"><input type="checkbox" id="' + pendingId + '" name="pending-task"><label for="' + pendingId + '"><p>' + todoItem + '</p></label></div>';

    $(hashId + " .task-container").append(render);
    todo_list_id.raw_id = "";

}


$(".btn-add-cta").click(() => {

    if (($(".popup-box input").attr("id") == "input-item-add")) {

        let todoItem = $("#input-item-add").val();
        renderTodoItem(todoItem);
        closeCta();

    } else {
        let todoName = $("#input-list-add").val();
        if (!todoName) {
            alert("Please enter name");
        } else {
            todo_card.heading = todoName;
            let heading_id = todo_card.heading_id();
            renderTodoCard(todo_card.heading, heading_id);
            closeCta();
        }
    }

})


function addItem(clicked) {
    $(".popup-box h3").text("Add New Item");
    $(".popup-box input").attr("id", "input-item-add");
    $(".popup-box input").val("");
    $("#input-item-add").attr("placeholder", "Enter task name");
    todo_list_id.raw_id = clicked;
    popup();
}

function deleteTodoCard(clicked) {
    console.log(clicked);
    let id = todo_list_id.hash_id(clicked);
    if (confirm("Are you sure ? This will delete the todo contents")) {
        $(id).remove();
    }

}


function deleteTodoItem(clicked) {
    let id = todo_list_id.hash_id(clicked);
    let markedCheckBox = $(id + " input:checkbox[name=pending-task]:checked");
    if (markedCheckBox) {
        markedCheckBox.each(function() {
            $(this).parent(".pending-task").addClass("complete-task");
            $(this).parent(".pending-task").removeClass("pending-task");
            $(this).remove();


        })
    }

}