
const clear= document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//classses
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//var
let LIST, id;

//links
res.render('index.ejs', { link: "<https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/solid.min.css>" });
res.render('index.ejs', { link: "<https://fonts.googleapis.com/css?family=Raleway|Sigmar+One>" });
res.render('index.ejs', { link: "<https://fonts.googleapis.com/css?family=Titillium+Web>" });
//get from localst
let data = localStorage.getItem("TODO");

//check if not empty
if (data){
    LIST = JSON.parse(data);
    id = LIST.length;// set id
    loadList(LIST);//load list onto interface
}else{
    LIST =[];
    id = 0;
}
//load task interf
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}
//clear  btn
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//show day 
const options = {weekday:"long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add a task 
function addToDo(toDo, id, done, trash){

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH :" ";

    const item = `
    <li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
    `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

//add task when enter
document.addEventListener("keyup", function(even){
    if(event.keyCode == 13){
        const toDo = input.value;

        //if the input have sthg
        if(toDo){
            addToDo(toDo, id, false, false);
            LIST.push({
                name:  toDo,
                id: id, 
                done: false,
                trash: false
            });
//add task from local
localStorage.setItem("TODO", JSON.stringify(LIST));
            id ++;
        }
        input.value = " ";
    }
});

//completed task
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST [element.id].done = LIST[element.id].done ? false : true;
}

//remove task
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//dynamic tasks

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    //add task from local
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

