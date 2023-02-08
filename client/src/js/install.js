import { header } from './header';
import { openDB } from "idb";

const btnInstall = document.getElementById("buttonInstall");
const btnClear = document.getElementById("buttonClear");

window.addEventListener("beforeinstallprompt", (event) => {
  // Store the triggered events
  window.deferredPrompt = event;

  // Remove the hidden class from the button.
  btnInstall.style.visibility = "visible";

  btnInstall.addEventListener("click", async () => {
    const promptEvent = window.deferredPrompt;
  
    if (!promptEvent) {
      return;
    }
  
    // Show prompt
    promptEvent.prompt();
  
    // Reset the deferred prompt variable, it can only be used once.
    window.deferredPrompt = null;
  
    btnInstall.classList.toggle("hidden", true);
  });
  
});

btnClear.addEventListener("click", async () => {
  const todosDb = await openDB("jate", 1);
  const tx = todosDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.delete(1);
  const result = await request;
  console.log("🚀 - data deleted from the database", result);

  // Clear localStorage
  localStorage.clear();
  // Load header to editor
  localStorage.setItem('content', header);
  // Reload the page
  location.reload();
});


window.addEventListener("appinstalled", (event) => {
  // Clear prompt
  window.deferredPrompt = null;
});
