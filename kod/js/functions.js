
// G
// CODE According to specification
function click_filter_element (event) {

  /*
    ARGUMENTS
      event: event-object created when user clicks on one of the filter elements.

    SIDE-EFFECTS
      Marks the clicked filter element as selected / unselected.
      Since a filter element will have changed after the click, the list of
      programmes must be updated.

      Attention VG
        Careful with the propagation of the click-event

    NO RETURN VALUE

  */
  event.stopPropagation();
  const clicked = event.currentTarget;
  clicked.classList.toggle("selected");
  
  update_programmes();

}


// G
// CODE according to specification
function create_filter_element (data) {

  /*
    ARGUMENTS
      data: object that contains the following keys:
        class (string): a class-name given to the created element
        textContent (string): the text that the element contains
        parent (reference to HTML-element): the HTML-element that is the parent of the created element

      No control of arguments.

    SIDE-EFFECTS
      Creates a new dom-element with the tag "li".
      Gives the new dom-element the class contained in data.class
      Appends the new dom-element to the element referenced in data.parent
      Sets the text content of the new dom-element to data.textContent
      Sets the function click_filter_element as a listener to "click" for the new dom-element

    RETURN VALUE
      Returns a reference to the new dom-element
  */

  const parent = data.parent;
     
  const new_dom_element = document.createElement("li");
  new_dom_element.classList.add(data.class);
  parent.appendChild(new_dom_element);
    
  new_dom_element.textContent = data.textContent;
  new_dom_element.addEventListener("click", click_filter_element);
      
  return new_dom_element;

}


// VG
// CODE according to specification
function add_group_toggling (filter_container_dom) {

  /*
    ARGUMENT
      filter_container_dom: reference to a HTML-element that contains a set of fliter_elements
            Exempel: the <ul> that contains the filters for Language.

    SIDE EFFECTS
      The function makes sure that when the user clicks on filter_container_dom, all the
      filter_elements that it contains are selected / unselected.
      Since some filter elements will have changed after the click, the list of
      programmes must be updated.

    NO RETURN VALUE

  */
  
 const first_list_element = filter_container_dom.querySelector("li");
 const all_list_elements = filter_container_dom.querySelectorAll("li");
 const parent = filter_container_dom.parentNode;

 parent.addEventListener("click", toggle_selected_unselected)

function toggle_selected_unselected(event){
  event.stopPropagation();
  if(first_list_element.classList.contains("selected")){
    array_each(all_list_elements, unselect_all);
    update_programmes();
   }else{
    array_each(all_list_elements, select_all)
   }
}

function unselect_all(element){
  if(element.classList.contains("selected")){
    element.classList.remove("selected");
    update_programmes();
  }else{
    return;
  }
}

function select_all(element){
  if(element.classList.contains("selected")){
    return;
  }else{
    element.classList.add("selected");
    update_programmes();
  }
}


}


// VG
// CODE according to specifications
function toggle_cities () {

  /*

    ARGUMENTS
      This function does not take any arguments

    SIDE EFFECTS
      This function checks the state of the first city-filter-element (Madrid).
      If it is selected then it de-selects ALL city-filter-elements
      If it is de-selected then it selects ALL city-filter-elements 

    NO RETURN VALUE

  */
  

    let first_city = document.querySelector("#country_filter > ul > #country_0 > ul > li");
    all_cities = document.querySelectorAll(".country .filter_list > li");

    if(first_city.classList.contains("selected")){
      array_each(all_cities, unselect_all);
      function unselect_all(element){
        if(element.classList.contains("selected")){
          element.classList.remove("selected");
          update_programmes();
        }else{
          return
        }
      }
    }else{
      array_each(all_cities, select_all);
      function select_all(element){
        if(element.classList.contains("selected")){
          return 
        }else{
          element.classList.add("selected");
          update_programmes();
        }
      }
    }
}


// WRITE SPECIFICATION
// ATTENTION: You need to write the specification of all three functions:
//            create_countries_cities_filters, create_country and create_city
function create_countries_cities_filters () {
   /*

    ARGUMENTS
      This function does not take any arguments

    SIDE EFFECTS
      This function make sure all country-objects in COUNTRIES is 
      called as an argument in the function create_country

    NO RETURN VALUE

  */

  function create_country (country) {
 /*

    ARGUMENTS
      country: object from the array COUNTRIES that contains the following keys,
      id (number): the country id
      name (string): the country name
      imagesNormal (array of strings): country images

    SIDE EFFECTS
      The function creates a new dom-element with the tag "div" 
      Gives the new dom-element the class "country" and "filter_container"
      Changes the new dom-element id to "country" + country.id"
      Appends the new dom-element to "#country_filter > ul"
      Sets the html content of the new dom-element to the country name and a ul
      
      Make sure all cities in the array CITIES that are in the country are called as an 
      argument in the function create_city

    NO RETURN VALUE

  */
    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);
    
    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;
    
    const cities = array_filter(CITIES, test_function);
    function test_function (city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  }

  function create_city (city) {
    /*

    ARGUMENTS
      city: object from the array cities that contains the following keys
      id (number): the country id
      name (string): the country name
      imagesNormal (array of strings): country images

    SIDE EFFECTS
      The function creates a new dom-element with the parent "#country_${city.countryID} > ul"
      Gives the new dom-elenment the class "selected"
      Sets the text content of the new dom-element to city.name
      Sets the dataset.id to city.id


    NO RETURN VALUE

  */

    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;

  }

  array_each(COUNTRIES, create_country);
}


// G
// ABSTRACT AND WRITE SPECIFICATION
//    As you can see, all three functions below do basically the same thing.
//    Abstract them to one function, and write the specification of that function.

function create_filter(){

   /*

    ARGUMENTS
     This function does not take any arguments 

    SIDE EFFECTS
      This function creates a new list element for each level in LEVELS,
      subject in SUBJECT and language in LANGUAGES.
      Places the list element in the correct filter ul.
      Sets the class for each list element to "selected".
      Sets the text content to the name of the level, subject or language.


    NO RETURN VALUE

  */

  let parent = "level";
  array_each(LEVELS,filter);
  parent = "subject";
  array_each(SUBJECTS, filter);
  parent = "language";
  array_each(LANGUAGES, filter);

  function filter(object){
    const dom = create_filter_element({
      parent: document.querySelector(`#${parent}_filter > ul`),
      class: "selected",
      textContent: object.name,
      
    });
    dom.dataset.id = object.id;
  }
 
}

/*function create_levels_filter () {

  function create_level (level) {
    const dom = create_filter_element({
      parent: document.querySelector("#level_filter > ul"),
      class: "selected",
      textContent: level.name,
    });
    dom.dataset.id = level.id;
  }
  array_each(LEVELS, create_level);
}

// Create Subjects Filter
function create_subjects_filter () {
  function create_subject (subject) {
    const dom = create_filter_element({
      parent: document.querySelector("#subject_filter > ul"),
      class: "selected",
      textContent: subject.name,
    });
    dom.dataset.id = subject.id;
  }
  array_each(SUBJECTS, create_subject);
}
// Create Search Field
function create_language_filter () {
  function create_element (data) {
    const dom = create_filter_element({
      parent: document.querySelector("#language_filter > ul"),
      class: "selected",
      textContent: data.name,
    });
    dom.dataset.id = data.id;
  }
  array_each(LANGUAGES, create_element);
}
*/


// G / VG (see details in specification)
// CODE according to specifications
function create_programme (programme) {
  
  /*

    ARGUMENT
      programme (object): One of the objects from PROGRAMMES

    SIDE-EFFECTS
      This function creates the HTML-element that contains all the information
      about one programme, as seen in the video / image.
      
      VG: The background image is a random image from among the images of the city
          in which the programme is (via the university)
      G:  No background image required.


      VG: The "see more" interaction must be included.
      G:  The "see more" element is not required. And that information needs not be in place.

    NO RETURN VALUE

  */  
 
  function calculate_avarage(array){
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum = sum + array[i];
      }
    return sum/array.length;
  }

  const new_element = document.createElement("div");
  const parent = document.querySelector("#programmes > ul");
  parent.appendChild(new_element);

  new_element.classList.add("programme");
  new_element.innerHTML = `
  <div>
    <h5>${programme.name}</h5>
    <p>${UNIVERSITIES[programme.universityID].name}</p>
    <p>${CITIES[UNIVERSITIES[programme.universityID].cityID].name}, ${COUNTRIES[CITIES[UNIVERSITIES[programme.universityID].cityID].countryID].name} </p>
      <div>
        <p>${LEVELS[programme.levelID-1].name}, ${SUBJECTS[programme.subjectID].name}, ${LANGUAGES[programme.languageID].name}</p>
      </div>
  </div>
    <div class="more_info">
      <div class="extra_info">
        <p>Avarage entery grade: ${Number(calculate_avarage(programme.entryGrades).toFixed(2))}</p>
        <p>Success rate: ${Number(calculate_avarage(programme.successRate).toFixed(1))}%</p>
        <p>Exchange ratio: ${programme.exchangeStudents}/${programme.localStudents}</p>
        </div>
    </div>

  <div class="bottom_programme">
    <p>${CITIES[UNIVERSITIES[programme.universityID].cityID].name}, sun-index: ${CITIES[UNIVERSITIES[programme.universityID].cityID].sun} (${percenter(CITIES[UNIVERSITIES[programme.universityID].cityID].sun, 365)})%</p> 
  </div>
  `
  let city = CITIES[UNIVERSITIES[programme.universityID].cityID];
  let number = city.imagesNormal.length - 1;
  new_element.style.backgroundImage = `url(../media/geo_images/${city.imagesNormal[get_random_number(number, 0)]})`;

  let button = new_element.querySelector(".more_info");
  button.addEventListener("click", display_more);

  function display_more(object){
    new_element.classList.toggle("show_more");
  }

}

// G
// CODE according to the specification
function update_programmes () {

  /*
      NO ARGUMENTS

      SIDE EFFECTS
        This function updates the programmes shown on the page according to
        the current filter status (which filter elements are selected / unselected).
        It uses the function read_filters to know which programmes need to be included.

        VG: The top images (header) need to be updated here

      NO RETURN VALUE

  */
  const program_box = document.querySelector("#programmes > ul"); 
  program_box.innerHTML = ``;   

  let programmes = read_filters();
  if (programmes.length !== 0){
    let text = document.querySelector("#programmes > p");
    text.innerHTML = ``;
    }else{
      let text = document.querySelector("#programmes > p");
      text.innerHTML = `Inga program upfyller nuvarande filter.`;
    }
  array_each(programmes, create_programme);

  const header = document.querySelectorAll("#top_images > div");
  array_each(header, change_image);
  function change_image(div){
    let country = COUNTRIES[get_random_number(COUNTRIES.length-1,0)];
    let image_number = country.imagesNormal.length - 1;

    div.style.backgroundImage = `url(../media/geo_images/${country.imagesNormal[get_random_number(image_number,1)]})`
  }

}


// G
// WRITE SPECIFICATION
// You must understand how this function works. There will be questions about it
// in the code review (kodredovisning)

// Optional VG: Which parts of the function's code could be abstracted?
//              Implement it
function read_filters () {
   /*

    ARGUMENT
     This function does not take any arguments

    SIDE-EFFECTS
      This function creates an array "programmes" that includes all programmes
      from PROGRAMMES which includes the selected city, level, subject and
      any possible value in the search-field.

    Return programmes

  */  
  const city_selected_dom = document.querySelectorAll("#country_filter li.selected");

  const city_id_selected = [];
  function callback_add_cityID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
  }
  array_each(city_selected_dom, callback_add_cityID);

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes (university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);



  const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
  const level_id_selected = [];
  function callback_add_levelID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level (programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);



  const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
  const language_id_selected = [];
  function callback_add_languageID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);



  function test_function_language (programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);



  const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
  const subject_id_selected = [];
  function callback_add_subjectID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);



  function test_function_subject (programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);



  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function (programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }

  return programmes;
}
