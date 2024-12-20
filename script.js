const content = document.getElementById("content");

const pages = {
    1: "home",
    2: "about",
    3: "projects",
    4: "skills",
    5: "contact"
};

// Function to load the HTML file content
const loadPage = (page, sidebarOrNavbar) => {
    fetch(`pages/${page}.html`)
    .then(response => {
        if (!response.ok)
            throw new Error("Page not found");
        return response.text();
    })
    .then(html => {
        content.innerHTML = html;
        if (sidebarOrNavbar) {
            const selectedButton = document.querySelector(`#${page}`);
            removeSelectionFromAll();
            if (selectedButton) selectedButton.classList.add("selected");
        }
        if (page === "projects") {
            const projectCards = document.querySelectorAll(".project-card");
            projectCards.forEach((button) => {
                button.addEventListener("click", () => {
                    const project = button.id;
                    loadPage(project, false);
                });
            });
        }
    })
    .catch(() => {
        content.innerHTML = "<h1>Error: Page not found</h1>";
    });
};

// Attach event listeners to the sidebar buttons
document.querySelectorAll(".page-button").forEach(button => {
    button.addEventListener("click", () => {
        const page = button.id;
        loadPage(page, true);
    });
});

// Attach event listeners to the bottom navbar buttons
document.querySelectorAll("#bottom-navbar .nav-item").forEach((navItem, index) => {
    navItem.addEventListener("click", () => {
        const page = pages[index + 1]; // Map nav-item index to page IDs
        loadPage(page, true);
    });
});

content.addEventListener("click", (event) => {
    if (event.target.id === "skills-card-button") {
        loadPage("skills", true);
    } else if (event.target.id === "projects-card-button") {
        loadPage("projects", true);
    }
});

document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (pages[key]) {
        loadPage(pages[key], true);
    }
});

function removeSelectionFromAll() {
    const pageButtons = document.querySelectorAll(".page-button");
    const navItems = document.querySelectorAll("#bottom-navbar .nav-item");
    pageButtons.forEach((button) => button.classList.remove("selected"));
    navItems.forEach((navItem) => navItem.classList.remove("selected"));
}

// Load home on initial load
loadPage("home", true);
