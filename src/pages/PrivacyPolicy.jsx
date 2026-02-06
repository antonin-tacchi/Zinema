export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-200">
      <h1 className="text-3xl font-bold mb-8">Politique de confidentialité</h1>

      <p className="mb-6">
        La présente politique de confidentialité décrit la manière dont le site
        <strong> Zynema</strong> collecte, utilise et protège les informations des utilisateurs.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. Données personnelles</h2>
      <p className="mb-4">
        Zynema ne collecte aucune donnée personnelle permettant d’identifier directement un utilisateur
        (nom, prénom, adresse email, etc.).
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">2. Stockage local</h2>
      <p className="mb-4">
        L’application utilise le <strong>LocalStorage</strong> du navigateur afin de sauvegarder :
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>les films et séries ajoutés aux favoris</li>
        <li>les commentaires ajoutés par l’utilisateur</li>
      </ul>
      <p className="mb-4">
        Ces données restent exclusivement sur l’appareil de l’utilisateur et ne sont jamais transmises
        à un serveur.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. Publicité</h2>
      <p className="mb-4">
        Zynema utilise des services publicitaires tiers, notamment <strong>Google AdSense</strong>.
        Ces services peuvent utiliser des cookies ou des technologies similaires afin de proposer
        des annonces adaptées aux centres d’intérêt des utilisateurs.
      </p>

      <p className="mb-4">
        Google peut utiliser le cookie <strong>DoubleClick</strong> pour diffuser des annonces.
        Les utilisateurs peuvent désactiver la publicité personnalisée en consultant :
        <br />
        <a
          href="https://adssettings.google.com"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 underline"
        >
          https://adssettings.google.com
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. Cookies</h2>
      <p className="mb-4">
        Zynema n’utilise pas de cookies propriétaires. Des cookies tiers peuvent toutefois être déposés
        par les services de publicité ou par des plateformes externes.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. API tierce</h2>
      <p className="mb-4">
        Les informations sur les films et séries sont fournies par l’API publique
        <strong> The Movie Database (TMDB)</strong>.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">6. Modification de la politique</h2>
      <p className="mb-4">
        Cette politique de confidentialité peut être modifiée à tout moment afin de rester conforme
        aux évolutions légales ou techniques.
      </p>

      <p className="mt-10 text-sm text-gray-400">
        Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
      </p>
    </div>
  );
}
