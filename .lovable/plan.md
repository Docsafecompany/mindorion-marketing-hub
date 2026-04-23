
1. Refaire entièrement la base actuelle pour en faire un site marketing Mindorion 100% statique, en supprimant le placeholder et en remplaçant le shell par une expérience de marque complète, bilingue FR/EN, sans auth, sans dashboard, sans logique app.

2. Mettre en place l’identité visuelle Mindorion sur tout le site :
- palette et variables CSS fournies, fond légèrement bleuté, boutons primaires arrondis
- typographie DM Sans
- composants UI cohérents avec shadcn
- animations d’entrée discrètes type fade-up sur les sections
- placeholders propres pour logo/visuels/profils manquants, faciles à remplacer plus tard

3. Construire la structure marketing globale :
- navbar sticky avec dropdowns Produits / Solutions / Ressources, lien Tarifs, CTA externes Connexion et Commencer, switch FR/EN
- menu mobile avec sheet + sous-menus en accordéon
- footer 4 colonnes avec navigation complète, liens légaux, contact, LinkedIn, rappel de langue

4. Créer toutes les pages marketing demandées avec contenu cohérent et CTA corrects :
- Home avec hero, stats, cartes produits, use cases, preuves sociales, CTA final
- Pricing avec 4 plans, toggle mensuel/annuel, tableau comparatif
- 3 pages produits : Qualion, ProspectIQ, GovernanceIQ
- page Solutions / Use Cases avec 4 sections ancrées par métier
- Blog avec 6 articles fictifs
- page article dynamique avec sommaire sticky et contenu adapté au slug
- About, Contact, Privacy, Terms, Security, 404

5. Appliquer les règles de conversion et de navigation :
- tous les CTA commerciaux vers https://app.mindorion.com/signup
- “Connexion” vers https://app.mindorion.com/auth
- aucune route applicative interne
- scroll-to-top à chaque changement de page
- navigation interne marketing propre entre pages et ancres métiers

6. Mettre en place le bilinguisme complet :
- détection automatique de la langue navigateur à la première visite
- persistance du choix en localStorage
- toggle FR/EN dans navbar et footer
- fichiers de traduction centralisés pour tout le contenu principal du site

7. Soigner le SEO page par page :
- titre et meta description uniques pour chaque route
- métadonnées adaptées aux pages marketing, blog, légal et contact
- structure favorable au partage et au référencement sans dépendance runtime

8. Ajuster les détails finaux de qualité :
- responsive mobile / tablette / desktop
- hover states, dropdown states, focus states
- formulaire de contact sans backend avec toast de succès côté client
- vérification que tous les liens externes/internes respectent la spec
- ajout d’un fichier de config d’hébergement équivalent seulement si pertinent pour ce projet, sans casser l’environnement actuel
