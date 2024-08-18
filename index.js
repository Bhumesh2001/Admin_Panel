const sidebar = document.getElementById("sidebar");
const sidebarBtn = document.getElementById('toggleSidebar');
document.getElementById("toggleSidebar").addEventListener("click", function () {
    sidebar.classList.toggle("show");
    sidebarBtn.classList.add('d-none');
});

document.addEventListener('click', function (event) {
    if (!sidebar.contains(event.target) && !sidebarBtn.contains(event.target)) {
        sidebar.classList.remove('show');
        setTimeout(() => {
            sidebarBtn.classList.remove('d-none');
            sidebarBtn.classList.add('d-block');
        }, 100);
    }
});

document.querySelectorAll(".nav-link").forEach(function (navLink) {
    navLink.addEventListener("click", function (event) {
        event.preventDefault();
        document.querySelectorAll("#content > div").forEach(function (page) {
            page.classList.add("d-none");
        });
        const target = event.target.getAttribute("data-target");
        document.querySelector(target).classList.remove("d-none");
    });
});

document.querySelectorAll(".sidebar-link").forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        document.querySelectorAll(".sidebar-link").forEach(function (link) {
            link.classList.remove("active");
        });
        link.classList.add("active");

        sidebar.classList.remove("show");
        sidebarBtn.classList.remove("d-none");
    });
});

document.querySelector('.sidebar-link[data-target="#dashboard"]').click();

document.getElementById('video-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const videoTitle = document.getElementById('title').value;
    const videoDescription = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const videoUrl = document.getElementById('video-url').value;
    const videoFile = document.getElementById('video').files[0];

    if (videoFile || videoUrl) {
        const formData = new FormData();
        formData.append('title', videoTitle);
        formData.append('description', videoDescription);
        formData.append('category', category);
        formData.append('thumbnail', thumbnail);
        formData.append('videoFile', videoFile);
        formData.append('videoUrl', videoUrl);
        try {
            const response = await fetch('http://localhost:3000/admin/upload-video', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            console.log('Server Response:', result);
            if (result.success) {
                document.getElementById('video-form').reset();
            } else {
                alert('Failed to upload video.');
            };
        } catch (error) {
            console.error('Error sending video to server:', error);
        };
    } else {
        alert('please upload video file');
    };
});
