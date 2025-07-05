// script.js

document.addEventListener('DOMContentLoaded', () => {
  const modeToggle = document.getElementById('mode-toggle');
  const body = document.body;
  const funFact = document.getElementById('fun-fact');

  // Load mode from localStorage
  const currentMode = localStorage.getItem('mode') || 'light';
  body.className = `${currentMode}-mode`;
  modeToggle.textContent = currentMode === 'dark' ? '☀️' : '🌙';

  // Toggle light/dark mode
  modeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark-mode');
    body.className = isDark ? 'light-mode' : 'dark-mode';
    localStorage.setItem('mode', isDark ? 'light' : 'dark');
    modeToggle.textContent = isDark ? '🌙' : '☀️';
  });

  // Fun fact generator
  const funFacts = [
    'The first video edit was done in 1895 using scissors and tape.',
    'ATC stands for "All Things Creative" – at least in our world!',
    'Video editing software was first released in the 1980s.',
    'We drink coffee. A lot. Probably too much. ☕',
    'Every second of polished video takes about an hour to edit!'
  ];
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
  if (funFact) funFact.textContent = randomFact;
});

// Contact form submission handler
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const responseMsg = document.getElementById("response-msg");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
      };

      try {
        const res = await fetch("/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        const data = await res.json();
        if (res.ok) {
          responseMsg.style.color = "green";
          responseMsg.textContent = "✅ Message sent successfully!";
          form.reset();
        } else {
          responseMsg.style.color = "red";
          responseMsg.textContent = "❌ " + (data.message || "Something went wrong.");
        }
      } catch (err) {
        responseMsg.style.color = "red";
        responseMsg.textContent = "❌ Server error. Please try again.";
      }
    });
  }
});
