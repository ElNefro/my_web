// Initialize apps with opening animation
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".app").forEach((app) => {
        app.classList.add("opening");

        // Remove opening class after animation completes
        setTimeout(() => {
            app.classList.remove("opening");
        }, 500);
    });
});

// Add interactivity to the app windows
document.querySelectorAll(".app").forEach((app) => {
    const closeBtn = app.querySelector(".close");
    const exitBtn = app.querySelector(".exit");
    const minimizeBtn = app.querySelector(".minimize");

    // Close button functionality
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        app.classList.add("closing");

        setTimeout(() => {
            app.classList.add("minimized");
            app.classList.remove("closing");

            // Update dock indicator
            const appId = app.id;
            const boxId = appId.replace("app", "a");
            const box = document.getElementById(boxId);
            if (box) box.classList.remove("active");
        }, 400);
    });

    // Maximize/restore button functionality
    exitBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        if (app.classList.contains("maximized")) {
            // Restore window
            app.classList.remove("maximized");
            exitBtn.style.backgroundColor = "#28c840";
        } else {
            // Maximize window
            app.classList.add("maximized");
            exitBtn.style.backgroundColor = "#ffbd2e";
        }
    });

    // Minimize button functionality
    minimizeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        app.classList.add("minimized");

        // Update dock indicator
        const appId = app.id;
        const boxId = appId.replace("app", "a");
        const box = document.getElementById(boxId);
        if (box) box.classList.remove("active");
    });

    // Make window draggable
    let isDragging = false;
    let dragOffset = { x: 0, y: 0 };

    const upSec = app.querySelector(".up_sec");

    upSec.addEventListener("mousedown", (e) => {
        if (e.target === upSec || e.target.classList.contains("window-title")) {
            isDragging = true;
            dragOffset.x = e.clientX - app.offsetLeft;
            dragOffset.y = e.clientY - app.offsetTop;
            app.style.zIndex = 100;
        }
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging && !app.classList.contains("maximized")) {
            app.style.left = e.clientX - dragOffset.x + "px";
            app.style.top = e.clientY - dragOffset.y + "px";
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
});

// Add functionality to the footer buttons
document.querySelectorAll(".tooltip-info").forEach((button, index) => {
    button.addEventListener("click", () => {
        const appId = `app${index + 1}`;
        const app = document.getElementById(appId);

        if (app.classList.contains("minimized")) {
            // Open the app with animation
            app.classList.remove("minimized");
            app.classList.add("opening");

            setTimeout(() => {
                app.classList.remove("opening");
            }, 500);

            // Update dock indicator
            document.querySelectorAll(".tooltip-info").forEach((b) => b.classList.remove("active"));
            button.classList.add("active");
        } else {
            // Bring app to front
            app.style.zIndex = 100;
            document.querySelectorAll(".app").forEach((a) => {
                if (a !== app && !a.classList.contains("minimized")) {
                    a.style.zIndex = 1;
                }
            });

            // Update dock indicator
            document.querySelectorAll(".tooltip-info").forEach((b) => b.classList.remove("active"));
            button.classList.add("active");
        }
    });
});

// Add click outside to deselect apps
document.addEventListener("click", (e) => {
    if (!e.target.closest(".app") && !e.target.closest(".tooltip-info")) {
        document.querySelectorAll(".tooltip-info").forEach((b) => b.classList.remove("active"));
    }
});
