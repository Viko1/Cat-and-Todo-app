let button_generate = document.querySelector('.generate_btn');
let type_animal = document.querySelector('#animal_type');
let num_facts = document.querySelector('#num_facts');
let animal_value = type_animal.value.toLowerCase();



async function getInfo() {
   let url = `https://cat-fact.herokuapp.com/facts/random?animal_type=${type_animal.value.toLowerCase()}&amount=${num_facts.value}`;
   console.log(animal_value);
   try {
      let res = await fetch(url);
      console.log(res);
      return await res.json();
   } catch (error) {
      console.log(error);
   }

}


button_generate.addEventListener("click", function () {

   //max - min items
   if (parseInt(num_facts.value) > 100 || parseInt(num_facts.value) < 1) {
      alert("Maximum is 100, Minimum is 1")

   }

   //
   async function renderUsers() {
      let users = await getInfo();
      let html = '';
      console.log(users);
      users.forEach(user => {
         let htmlSegment = `
                    <tag class="col-sm-3">
                    <div class="card" style="width: 16.5rem; height: 25rem; margin-left: 5px; margin-top: 5px">
                                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/2fb65a85197371.5d7504d2d2114.gif" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h7 class="card-title">ID: ${user._id}</h7>
                                <p class="card-text">${user.text}</p>
                                <p class="card-text"><small class="text-muted">${user.createdAt}</small></p>
                        </div>
                    </div>
                    </tag>
                </div>`;

         html += htmlSegment;
      });

      let container = document.querySelector('.bootstrap-cards');
      container.innerHTML = html;
   }


   //sort btn
   let sortbtn = document.createElement("button");
   sortbtn.innerHTML = 'Sort by id';
   sortbtn.classList.add("btn");
   sortbtn.classList.add("btn-outline-success");
   const clear_sort_btn = document.querySelector('.btn-outline-success');
   sortbtn.addEventListener('click', function () {
      let list, i, switching, b, shouldSwitch;
      list = document.querySelector(".row");
      console.log(list);
      switching = true;
      /* Make a loop that will continue until
      no switching has been done: */
      while (switching) {
         // start by saying: no switching is done:
         switching = false;
         b = list.getElementsByTagName("tag");
         console.log(b)
         // Loop through all list-items:
         for (i = 0; i < (b.length - 1); i++) {
            // start by saying there should be no switching:
            shouldSwitch = false;
            console.log(b[i]);
            /* check if the next item should
            switch place with the current item: */
            if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
               /* if next item is alphabetically
               lower than current item, mark as a switch
               and break the loop: */
               console.log(b[i]);
               shouldSwitch = true;
               break;
            }
         }
         if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark the switch as done: */
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
            console.log(b[i]);
         }
      }
   });

   //Clear btn
   let btn = document.createElement("button");
   btn.innerHTML = 'Clear';
   btn.classList.add("btn");
   btn.classList.add("btn-danger");
   btn.classList.add("clear");
   let head = document.querySelector(".head");
   head.appendChild(btn);
   head.appendChild(sortbtn);

   const clear_btn = document.querySelector('.clear');
   clear_btn.addEventListener('click', function () {
      let facts = document.querySelector(".bootstrap-cards");
      facts.innerHTML = '';
      clear_btn.parentNode.removeChild(clear_btn);
      clear_sort_btn.parentNode.removeChild(clear_sort_btn);
   });

   renderUsers();


});

