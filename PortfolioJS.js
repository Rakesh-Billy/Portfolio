// -----------------------------sidebar-----------------------------

document.querySelectorAll(".sidebar-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    const targetSection = document.querySelector(
      this.parentElement.getAttribute("href")
    );

    setTimeout(() => {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 200); // 200 milliseconds delay
  });
});

// Function to update the active link based on scroll position
function updateActiveLink() {
  const sections = document.querySelectorAll("section");
  const sidebarButtons = document.querySelectorAll(".sidebar-btn");

  let index = sections.length;

  while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

  sidebarButtons.forEach((button) => button.classList.remove("active"));
  sidebarButtons[index].classList.add("active");
}

// Update active link on scroll
window.addEventListener("scroll", updateActiveLink);

// Update active link on initial load
updateActiveLink();


// -----------------------------Scroll-to-Top-----------------------------

// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 650 ||
    document.documentElement.scrollTop > 650
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// -----------------------------contact-form-to-mail-----------------------------

const form = document.getElementById("myForm");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 3000);
    });
});

// -----------------------------tabs-select-----------------------------

document.getElementById("tabSelector").addEventListener("change", function () {
  // Hide all tab content
  document.querySelectorAll(".tab-pane").forEach(function (tabContent) {
    tabContent.classList.remove("show", "active");
  });

  // Show the selected tab content
  var selectedTab = this.value;
  var selectedTabContent = document.getElementById(selectedTab);
  selectedTabContent.classList.add("show", "active");
});

// -----------------------------sroll-reveal-----------------------------

window.addEventListener("scroll", reveal);
function reveal() {
  var reveals = document.querySelectorAll(".scroll_view_block");
  for (var i = 0; i < reveals.length; i++) {
    var windowheight = window.innerHeight;
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 10;
    if (revealtop < windowheight - revealpoint) {
      reveals[i].classList.add("active");
    }
    // else{
    //     reveals[i].classList.remove('active');
    // }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const revealElements = document.querySelectorAll(".reveal_home");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // Stop observing once the animation is triggered
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the element is in view
    }
  );

  revealElements.forEach((el) => {
    observer.observe(el);
  });
});

const tooltips = document.querySelectorAll('.tt')
tooltips.forEach(t =>{
    new bootstrap.Tooltip(t)
})