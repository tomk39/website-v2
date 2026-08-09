document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".copy-code").forEach(button => {

    button.addEventListener("click", () => {

      // Find nearest code block
      const container =
        button.parentElement;

      const code =
        container.querySelector("code");

      if (!code) {

        console.error("No code block found");

        alert("No code block found");

        return;

      }

      const text =
        code.innerText;

      // Create temporary textarea
      const textarea =
        document.createElement("textarea");

      textarea.value = text;

      document.body.appendChild(textarea);

      textarea.select();

      try {

        document.execCommand("copy");

        button.innerText = "Copied";

        setTimeout(() => {
          button.innerText = "Copy";
        }, 2000);

      } catch (err) {

        console.error("Copy failed:", err);

      }

      document.body.removeChild(textarea);

    });

  });

});