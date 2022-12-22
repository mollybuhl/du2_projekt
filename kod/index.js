"use strict";



/*

  Notice the images on the page header.

  G: The images can be hard-coded in the CSS (as background-image)
  VG: Every time the user selects / unselects one or more filter elements, the app
      shows three random images from all the possible country images.

*/


// Create Filter Elements
create_filter();
//create_subjects_filter();
//create_language_filter();
create_countries_cities_filters();

// Add Interaction of search field button
document.querySelector("#search_field button").addEventListener("click", update_programmes);

// Initialise programmes list by calling relevant function
update_programmes();


// VG
// Add Interaction of filter containers (select-deselect all filters in the container)
// Example: Click anywhere on the language-filter-container and all the language filters
// (spanska, svenska, engelska, franska) will toggle.

add_group_toggling(document.querySelector("#level_filter > ul"));
add_group_toggling(document.querySelector("#subject_filter > ul"));
add_group_toggling(document.querySelector("#language_filter > ul"));


// VG
// Add Interaction of button toggle-all-cities

document.querySelector("#country_filter > button").addEventListener("click", toggle_cities);
