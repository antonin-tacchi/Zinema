export default function LegalNotice() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-200">
      <h1 className="text-3xl font-bold mb-8">Mentions légales</h1>

      <h2 className="text-xl font-semibold mt-6 mb-3">1. Éditeur du site</h2>
      <p className="mb-4">
        Nom du site : <strong>Zynema</strong>
        <br />
        Responsable de publication :{" "}
        <strong>Dorian ABBDESSA / Antonin TACCHI</strong>
        <br />
        Contact : <strong>Zinema@antonin-tacchi.com</strong>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">2. Hébergement</h2>
      <p className="mb-4">
        Le site est hébergé par :
        <br />
        <strong>Hostinger International Ltd.</strong>
        <br />
        61 Lordou Vironos Street
        <br />
        6023 Larnaca
        <br />
        Chypre
        <br />
        <a
          href="https://www.hostinger.com"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 underline"
        >
          https://www.hostinger.com
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        3. Propriété intellectuelle
      </h2>
      <p className="mb-4">
        L’ensemble du contenu présent sur le site Zynema (structure, design,
        code) est protégé par le droit d’auteur.
      </p>

      <p className="mb-4">
        Les affiches, images et informations relatives aux films et séries sont
        fournies par l’API <strong>TMDB</strong>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">4. Responsabilité</h2>
      <p className="mb-4">
        Zynema est une application de découverte de contenus cinématographiques.
        Aucun contenu vidéo n’est hébergé ou diffusé directement par le site.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        5. Données personnelles
      </h2>
      <p className="mb-4">
        Pour plus d’informations concernant la gestion des données personnelles,
        veuillez consulter la page
        <strong> Politique de confidentialité</strong>.
      </p>

      <p className="mt-10 text-sm text-gray-400">
        Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
      </p>
    </div>
  );
}
