// Menu mobile : ouvre et ferme la navigation avec le bouton hamburger.
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("menu-principal");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const ouvert = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(ouvert));
    toggle.setAttribute("aria-label", ouvert ? "Fermer le menu" : "Ouvrir le menu");
  });
}

// Formulaire de contact : envoi sans quitter la page et message de confirmation.
const form = document.getElementById("contact-form");

if (form) {
  const statut = document.getElementById("form-status");
  const bouton = form.querySelector("button[type=submit]");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    bouton.disabled = true;
    statut.className = "form-status";
    statut.textContent = "Envoi en cours...";

    try {
      const reponse = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!reponse.ok) throw new Error("Envoi refusé");

      form.reset();
      statut.className = "form-status is-ok";
      statut.textContent = "Merci, votre message a bien été envoyé. Nous revenons vers vous rapidement.";
    } catch (erreur) {
      statut.className = "form-status is-error";
      statut.textContent = "Le message n’a pas pu être envoyé. Écrivez-nous directement par email ou sur WhatsApp.";
    } finally {
      bouton.disabled = false;
    }
  });
}
