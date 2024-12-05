import React from "react";
import { useTranslation } from "react-i18next";
import { IoHomeSharp } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo-makesense.png";
import HeaderCountryChoice from "../../components/user/HeaderCountryChoice";
import { useCurrentUserContext } from "../../context/UserContext";

export default function LegalNotice() {
  const { token } = useCurrentUserContext();
  const { t } = useTranslation();

  return (
    <div>
      <HeaderCountryChoice />
      <div className="flex justify-center items-center h-32 m-8">
        <img className="h-12" src={Logo} alt="logo MakeSense" />
      </div>
      <div className="flex items-center ml-6">
        {/* <img className="m-5" src={Return} alt="arrow return" /> */}

        {token ? (
          <div className="cursor-pointer">
            <NavLink
              className="flex items-center gap-3 mr-4 mb-2 border-gray-800 border p-2 border-dashed hover:bg-dark-blue hover:text-white rounded-xl"
              to="/home"
            >
              <MdOutlineManageAccounts className="min-w-5" size={20} />
              {t("Retour compte")}
            </NavLink>
          </div>
        ) : (
          <div className="cursor-pointer">
            <NavLink
              className="flex items-center gap-3 mr-4 mb-2 border-gray-800 border p-2 border-dashed hover:bg-dark-blue hover:text-white rounded-xl"
              to="/"
            >
              <IoHomeSharp className="min-w-5" size={20} />
              {t("Retour accueil")}
            </NavLink>
          </div>
        )}
      </div>
      <div className="h-auto w-screen bg-dark-blue ">
        <p className="text-flash-yellow pl-20 pt-8 pb-8 text-7xl">
          Mentions légales
        </p>
        <p className="text-white pl-20 pb-20 pr-20 w-4/5 font-thin text-3xl">
          Ici, vous aurez les informations concernant nos mentions légales, les
          principes de propriété intellectuelle et la politique de protection
          des Données personnelles de makesense !
        </p>
      </div>
      <div className="w-4/5 m-auto ">
        <h2 className="text-dark-blue font-bold text-4xl mt-10">
          1- Modifications et notifications
        </h2>
        <p className="text-xl pt-5">
          L’utilisation des Sites makesense implique l’acceptation pleine et
          entière des mentions légales et politique en matière de Données
          personnelles. Ces dernières sont susceptibles d’être modifiées ou
          complétées à tout moment, les Utilisateurs des Sites makesense sont
          donc invités à les consulter de manière régulière. Dans certains cas
          de modification de ces mentions légales et de cette politique en
          matière de Données personnelles, la nouvelle version sera portée à
          votre connaissance lors de votre connexion au Site à l’aide d’une
          bannière.{" "}
        </p>
        <h2 className="text-dark-blue font-bold text-4xl mt-10">2- Lexique</h2>
        <p className="text-xl pt-5">
          Bénévoles formés : Les “Bénévoles formés” sont les bénévoles makesense
          ayant bénéficiés d’une formation pair à pair ou en ligne à nos outils
          open source, qui leur permettent de mobiliser dans leurs villes et
          développer makesense. Données personnelles : Toute information
          concernant une personne physique identifiée ou identifiable (ex. Nom,
          prénom, n° de téléphone, photographie, date de naissance, commune de
          résidence…). Destinataires : Personne habilitée à obtenir
          communication de données personnelles enregistrées dans un fichier ou
          un traitement en raison de ses fonctions. Finalité d’un traitement :
          Objectif principal d’une application informatique de Données
          personnelles. Exemples de finalité : gestion des recrutements, enquête
          de satisfaction, envoie de newsletter, etc. Géolocalisation :
          Technologie permettant de déterminer la localisation d’un objet ou
          d’une personne avec une certaine précision. La technologie s’appuie
          généralement sur le système GPS ou sur les interfaces de communication
          d’un téléphone mobile. Responsable de traitement : Le responsable d’un
          traitement de Données à caractère personnel est, sauf désignation
          expresse par les dispositions législatives ou réglementaires relatives
          à ce traitement, la personne, l’autorité publique, le service ou
          l’organisme qui détermine ses Finalités et ses moyens. Sites makesense
          : Nous entendons par “Sites” ou “Sites makesense” le site principal
          https://www.makesense.org/ et tous les sites qui y sont reliés,
          notamment : futureofwaste.makesense.org france.makesense.org
          africa.makesense.org lebanon.makesense.org philippines.makesense.org
          peru.makesense.org combo.makesense.org lasocialcup.com Traitement de
          Données personnelles Toute opération, ou ensemble d’opérations,
          portant sur de telles Données, quel que soit le procédé utilisé
          (collecte, enregistrement, organisation, conservation, adaptation,
          modification, extraction, consultation, utilisation, communication par
          transmission diffusion ou toute autre forme de mise à disposition,
          rapprochement ou interconnexion, verrouillage, effacement ou
          destruction, …) Transfert de Données Toute communication, copie ou
          déplacement de Données personnelles ayant vocation à être traitées
          dans un pays tiers à l’Union européenne. Utilisateurs Internaute se
          connectant et naviguant sur nos Sites ou nos réseaux sociaux.{" "}
        </p>
        <h2 className="text-dark-blue font-bold text-4xl mt-10">
          3- Mentions légales
        </h2>
        <p className="text-xl pt-5">
          Les Sites ont pour objet de fournir une information concernant
          l’ensemble des activités de l’association. Les Sites makesense sont
          édités par l’association makesense, association loi 1901, dont le
          siège social est situé 36 rue Etienne Dolet 75020 Paris (France), dont
          le numéro de Siren est 797715224, représenté par Léa Zaslavsky,
          Présidente. L’éditeur peut être contacté par courrier électronique à
          l’adresse suivante : support@makesense.org. Les Sites sont tous
          hébergés par AWS.{" "}
        </p>
        <h2 className="text-dark-blue font-bold text-4xl mt-10">
          4- Propriété intellectuelle et contrefaçons
        </h2>
        <p className="text-xl pt-5">
          Site internet La structure générale des Sites ainsi que tout leur
          contenu éditorial et notamment les textes, graphiques, images, sons et
          vidéos les composant sont de la propriété exclusive de Makesense, sauf
          indication contraire. Toute représentation et/ou reproduction et/ou
          exploitation partielle ou totale des contenus (y compris graphiques,
          représentations, images, contenus audio ou vidéo) mis à disposition
          sur les Sites, par quelque procédé que ce soit (y compris le
          téléchargement, le screen scrapping), sans l’autorisation préalable et
          par écrit de Makesense est strictement interdite. A titre d’exception,
          la préparation d’une copie unique à des fins privées (donc non
          commerciale) en téléchargeant sur un ordinateur privé et personnel (à
          l’exclusion de tout enregistrement permanent ou temporaire sur cet
          ordinaire, l’usage en mode déconnecté ou la copie d’écran et
          l’impression) est autorisée, sous la stricte réserve néanmoins que
          cette activité ne modifie pas le Site internet et son contenu et que
          les références aux droits d’auteur, marques et autres droits de
          propriété intellectuelles soient intégrées ou répétées dans ces
          copies. Liens La reproduction, la copie, la duplication, le transfert
          ou la création de liens hypertextes vers, tout ou partie de
          l’information disponible sur les Sites requiert l’approbation expresse
          préalable de makesense. Makesense se réserve le droit d’exiger la
          suppression ou la désactivation de tout lien du Site internet d’un
          tiers contenant quelque information, sujet nom ou tout autre contenu
          inapproprié, grossier, diffamatoire, illégal, indécent ou toute
          information qui contrevient aux dispositions légales en vigueur, à un
          quelconque droit de propriété intellectuelle, de propriété, à la
          protection de la vie privée ou à des droits de publicité.
          Responsabilité de makesense L’information, le contenu et les données
          disponibles sur les Sites sont mises à disposition uniquement à titre
          d’information. Ils n’engagent pas la responsabilité de makesense et ne
          constituent pas un conseil ou une offre. L’Utilisateur fait donc usage
          de l’information, du contenu et des données disponibles à ses propres
          risques et est seul responsable de celui-ci. makesense met tout en
          œuvre pour assurer l’exactitude de l’information, du contenu et des
          données disponibles sur les Sites mais ne peut être tenue responsable
          d’un quelconque dommage ou d’une quelconque perte causée par
          l’incomplétude ou l’inexactitude de l’information, du contenu et des
          données disponibles sur son site internet.{" "}
        </p>
        <h2 className="text-dark-blue font-bold text-4xl mt-10">
          5- Gestion des Données personnelles
        </h2>
        <p className="text-xl pt-5">
          Quelles sont les données que nous collectons, quand, et sur quelles
          bases? En général, lorsque vous visitez le Site, nous collectons des
          informations telles que votre adresse IP et/ou des données concernant
          votre navigateur ou votre dispositif informatique (langue d’affichage
          du Site, localisation, adresse IP, données de navigation et
          comportement sur le Site), lesquelles nous permettent ensuite de vous
          fournir un accès au Site et au contenu pertinent. Il existe cependant
          des pages sur lesquelles vous pouvez fournir des Données personnelles
          supplémentaires pour vous inscrire ou nous contacter. Ces données
          personnelles incluront : Votre position si vous choisissez de nous la
          donner Le traitement de vos données personnelles que vous renseignez
          dans un formulaire est fondé sur votre consentement (ex. qui êtes
          vous, vos intérêts, adresse email, etc.). Vous pouvez retirer votre
          consentement à ce traitement à tout moment. Le traitement de vos
          données (ex. adresse IP, navigateur, localisation, etc.) est fondé sur
          nos intérêts légitimes En l’absence de traitement de vos données
          personnelles, nous ne serions pas en mesure de poursuivre les
          finalités décrites ci-dessous. Transfert de données entre les Sites
          makesense et avec les tiers Les données collectées sur un Site sont
          synchronisées entre les différents Sites makesense. En revanche
          certaines questions posées peuvent changer entre les différents Sites
          makesense en fonction du sujet du Site (si vous allez sur le Site du
          Festival makesense, des questions concernant vos volontés d’engagement
          sur le festival vous seront posées, alors que sur le Site
          FutureOfWaste de makesense, des questions vous seront posées
          concernant vos appétences et vos pratiques sur le sujet des déchets).
          Le questionnaire en ligne n’est en aucun cas rempli automatiquement,
          il est rempli par l’Utilisateur lui même. Si l’Utilisateur a déjà
          donné son email, le questionnaire est pré-rempli avec les informations
          déjà renseignées sur les différents Sites makesense. Vos données
          personnelles sont susceptibles d’être transférées pour les finalités
          décrites ci-dessous à des coresponsables de traitement ou à des
          sous-traitant établis dans des pays non membres de l’Union Européenne
          ou de l’Espace Economique Européen où les lois relatives à la
          protection des données personnelles sont susceptibles d’être
          différentes de celles appliquées au sein de votre pays. Tout transfert
          de ce type sera effectué conformément aux lois applicables (et sera
          notamment couvert par un accord relatif au transfert des données
          mentionnant les clauses types établies par la Commission Européenne,
          ou par un autre mécanisme de garantie conforme au droit applicable).
          Si vous souhaitez de plus amples informations sur les garanties en
          place ou une copie de ces dernières, vous pouvez nous contacter à
          l’adresse email suivante : support@makesense.org Nous sommes
          susceptibles d’agréger les données que vous nous fournissez à travers
          le Site internet avec les données que vous pouvez nous fournir en
          parallèle du Site internet (formulaire d’inscription à un programme
          makesense, évènement makesense auquel vous vous êtes inscrit,
          formulaire d’appel à projets, participation à un concours makesense…).
          Pourquoi makesense collecte mes Données personnelles ? makesense
          utilise vos Données personnelles pour les Finalités suivantes : La
          personnalisation des Sites internet Nous pouvons utiliser vos Données
          personnelles et les cookies pour adapter notre Site à votre profil.
          Vos données peuvent être croisées avec des données de navigation. Par
          exemple : nous pouvons adapter la langue du Site internet et afficher
          certains évènements en fonction de votre localisation ou afficher
          certaines bannières sur le Site internet en fonction de vos intérêts.
          Pour plus d’information et gérer vos cookies, rendez-vous à la section
          « Cookies ». La personnalisation de nos services et les messages que
          nous vous adressons Avec votre consentement lorsque vous remplissez le
          questionnaire, nous utilisons vos Données personnelles pour vous
          envoyer des informations que nous pensons être pertinentes pour vous
          par mails ou par notifications sur le Site. Par exemple : nous pouvons
          vous adresser des emails personnalisés ou vous recommander des
          programmes makesense, des appels à projets, des évènements similaires
          à ceux que vous avez déjà suivis ou consultés et qui correspondent à
          vos centres d’intérêts et toutes possibilités d’engagement offertes
          par makesense qui pourraient vous intéresser. Vous pouvez changer à
          tout moment vos préférences de communication sur le questionnaire lui
          même. Vous pouvez également révoquer ce consentement à tout moment en
          cliquant sur l’un des différents liens de “désabonnement” ou en nous
          contactant à support@makesense.org. La connaissance Utilisateur et les
          statistiques et performances de notre Site Nous pouvons utiliser des
          données pour mieux comprendre nos Utilisateurs ou à des fins de
          statistiques pour analyser l’activité de notre Site et améliorer les
          services que nous proposons. Nous effectuons des mesures d’audience :
          nous mesurons par exemple le nombre de pages vues, le nombre de
          visites du Site, ainsi que l’activité des visiteurs sur le Site et
          leur fréquence de retour. Merci de noter qu’en fonction de vos
          paramètres, nous sommes également susceptibles de vous envoyer des
          notifications concernant le fonctionnement de nos services, comme la
          révision des termes de cette politique de protection des Données
          personnelles par exemple ou d’autres modifications concernant les
          services que vous utilisez. Pendant combien de temps vos données
          sont-elles stockées ? Nous conservons vos Données personnelles comme
          suit : -les données techniques (adresse IP, information sur
          l’appareil) recueillies accessoirement lorsque vous visitez le Site
          seront conservées pendant une durée de 30 jours maximum ; -si vous
          vous inscrivez pour recevoir nos messages, nous conserverons vos
          informations jusqu’à ce que vous vous désinscriviez, après quoi nous
          ne conserverons que les informations qui nous permettront de respecter
          votre préférence de désabonnement ; Vos Données personnelles seront
          conservées plus longtemps ou moins longtemps si la loi ou une
          ordonnance du tribunal le requiert, et/ou si cela s’avère utile pour
          défendre ou poursuivre des revendications légales. Qui sont les
          Destinataires de vos Données personnelles? Vos données sont partagées
          au sein de l’association makesense et au sein des coresponsables de
          traitement sus décrits. Seuls les employés et certains Bénévoles
          formés de makesense et des coresponsables de traitement y ont accès
          dans le strict cadre des Finalités ci-dessus. Nous entendons par
          “Bénévoles formés” des bénévoles qui ont suivi une formation au sein
          de makesense pour développer la communauté makesense dans leur ville.
          En aucun cas, les données recueillies sur le Site makesense.org et les
          Sites associés ne seront cédées ou vendues à des tiers à des fins de
          marketing en dehors de l’association makesense. Les données
          transférées à des tiers ne le sont que dans le cadre de prestations de
          service et sont soumis à des contrats contenant des clauses conformes
          à la législation en vigueur : agence de création et d’envoie de
          newsletter comme mailchimp, etc. Voir la rubrique “prestataires
          utilisés” pour plus d’information. Nous nous réservons le droit de
          divulguer vos données personnelles (i) si la loi, les règlements ou
          les décisions judiciaires le requièrent (ii) aux autorités de police
          ou autres représentants du gouvernement, sous réserve de la loi
          applicable (iii) lorsque nous estimons que la divulgation est
          nécessaire ou opportune pour prévenir tout préjudice physique ou toute
          perte financière ou est nécessaire au déroulement d’une enquête
          diligentée contre une activité illégale ou suspectée l’être, sous
          réserve de la loi applicable.
        </p>
        <h2 className="text-dark-blue font-bold text-4xl mt-10">
          6- Politique de cookies
        </h2>
        <p className="text-xl pt-5">
          Soucieux de vous apporter plus de services et de contenus
          personnalisés pour mieux vous satisfaire, les Sites makesense
          utilisent des cookies. Vous êtes prêts à apprendre ce que sont les
          cookies et comment on les utilise? Mais qu’est-ce qu’un cookie ? Lors
          de la consultation des Sites makesense, nous pouvons être amenés à
          utiliser la fonctionnalité des “cookies” proposée par votre navigateur
          internet. Ok mais qu’est-ce qu’un cookie? Des cookies sont des
          informations relatives à la navigation de votre terminal (ordinateur,
          tablette, smartphone, etc.) enregistrées dans des fichiers textes. Ces
          cookies sont stockés et utilisés pour enregistrer des données non
          personnelles et d’autres personnelles concernant votre utilisation du
          Site. Les cookies peuvent être soit permanent (et rester après que
          vous vous soyez déconnectés pour être utilisés lors de vos prochaines
          visites sur nos Sites) ou temporaires (et disparaître après votre
          déconnexion de nos Sites internet). Les cookies sont installés sur
          votre terminal, sous réserve de vos choix concernant les cookies, que
          vous pouvez modifier à tout moment. Seul l’émetteur d’un cookie est
          susceptible de lire ou de modifier des informations qui y sont
          contenues. Nous utilisons les cookies pour… Améliorer votre expérience
          sur les Sites makesense, à travers par exemple : L’utilisation d’un
          service pour reconnaître votre appareil et vous permettre de naviguer
          à travers les différents Sites de la “galaxy makesense” sans avoir à
          vous reconnecter et donner les mêmes informations à chaque fois.
          Reconnaître que vous vous êtes déjà connectés sur nos Sites,
          sauvegarder vos informations et vous permettre de les changer au fur
          et à mesure Adapter la présentation de nos Sites aux préférences
          d’affichage de votre terminal (langue utilisée, affichage d’événements
          en fonction de votre localisation…) Analyser le trafic et les données
          sur les Sites makesense pour : Mesurer combien de personnes utilisent
          nos services, améliorer les services prioritaires et nous assurer
          qu’il y a assez de capacité pour qu’ils soient rapides. Comprendre
          comment les utilisateurs interagissent avec nos services, pour les
          transformer et les rendre plus ergonomiques et faciles d’utilisation.
          Les différents cookies utilisés : Nous utilisons des cookies
          spécifiques pour vous proposer une expérience personnalisée :
          mkssubs_data: dans l’éventualité où vous nous avez communiqué votre
          adresse email, nous la conservons en cookie. (Durée 30 jours)
          mkssubs_hide: permet de conserver le réglage de fermeture du popin
          vous demandant vos intérêts. (Durée 2 jours) bigthing_hide: Permet de
          se souvenir que vous avez choisi de cacher le popin d’alerte en bas à
          gauche du Site visionné (Durée 2 jours) mksgeoloc_latlng: conserver la
          longitude et la latitude de l’adresse que vous avez indiquée. (Durée
          30 jours) mksgeoloc_address_rendered: conserver l’adresse que vous
          avez indiquée. (Durée 30 jours) mksgeoloc_address_json: conserver
          l’adresse que vous avez indiquée sous format JSON. (Durée 30 jours)
          mksgeoloc_address: conserver l’adresse que vous avez indiquée sous
          format compressé. (Durée 30 jours) Cookies associés à WordPress :
          redux_XXX : Plugin WordPress lié à la personnalisation graphique du
          thème WordPress. wordfence_XXX ou wf_XXX : Plugin WordPress lié à la
          sécurité.
        </p>
        <h2 className="text-dark-blue font-bold text-4xl mt-10">
          7- Quels sont vos droits?
        </h2>
        <p className="text-xl pt-5">
          Il est important que les données personnelles vous concernant et que
          nous détenons soient à jour. A ce titre, nous vous prions de nous
          faire part de tout changement relatif à vos données personnelles. Vous
          pouvez également exercer les droits suivants : Droit d’accès Vous avez
          le droit de demander des informations quant aux traitements de vos
          Données personnelles effectués par makesense. Vos informations sont
          disponibles à tout moment sur la page “Construisez votre expérience”
          et seront directement modifiés sur les services tiers que nous
          utilisons pour gérer ces données (Segment, Big Query, Autopilot,
          Mailchimp, Slack, Facebook Audience, Zapier et Integromat). Droit de
          rectification Si vos Données personnelles sont altérées ou inexactes,
          vous êtes en droit de nous demander de les rectifier. Si nous les
          avons transmises à un tiers, nous lui ferons part de leur
          rectification. Droit de s’opposer au traitement Vous pouvez vous
          opposer à l’utilisation de vos Données personnelles pour ses propres
          intérêts légitimes. Nous prendrons en compte votre opposition et
          déterminerons si le traitement de vos données vous porte injustement
          atteinte d’une façon qui nous force à y mettre fin. Vous pouvez
          également vous opposer à l’envoi de messages commerciaux personnalisés
          en cliquant sur « se désinscrire » en bas de l’email concerné.Vous ne
          pouvez pas vous opposer au traitement de vos Données personnelles
          lorsque la loi nous oblige à l’effectuer. Droit de limiter le
          traitement Vous avez le droit de nous demander de limiter notre
          utilisation de vos Données personnelles dans le cadre défini par la
          législation. Droit à la portabilité des données Vous avez le droit de
          nous demander le transfert direct de vos Données personnelles, soit
          directement auprès de vous, soit auprès d’une autre entreprise, dans
          le cadre défini par la législation. Lorsque cela est techniquement
          possible, nous assurerons le transfert de vos Données personnelles.
          Droit à l’oubli Vous avez le droit de nous demander d’effacer vos
          Données personnelles si : -nous n’en avons plus besoin à leurs fins
          originales conformément à la Finalité originale de collecte ; -vous
          retirez votre consentement à ce que nous les traitions ; -vous vous
          opposez à ce que nous traitions vos données pour nos propres intérêts
          légitimes ou pour vous envoyer des messages commerciaux personnalisés
          ; -ou dans d’autres conditions définies par la législation. Comment
          exercer vos droits ? Pour exercer vos droits, ne plus recevoir nos
          informations, actualiser ou supprimer vos Données personnelles,
          veuillez nous contacter sur support@makesense.org. Vous avez également
          le droit d’introduire une réclamation auprès de la CNIL ou toute autre
          autorité de contrôle compétente.
        </p>
        <h2 className="text-dark-blue font-bold text-4xl mt-10">
          8- Nous contacter :
        </h2>
        <p className="text-xl pt-5">
          Si vous avez des questions, des préoccupations ou des plaintes
          concernant cette politique de protection des Données personnelles chez
          makesense, pour ne plus recevoir nos informations ou si vous souhaitez
          demander l’accès, la rectification ou la suppression de vos Données
          personnelles, veuillez nous contacter sur support@makesense.org.
        </p>
        <h2 className="text-dark-blue font-bold text-4xl mt-10">
          9- Loi applicable et validité :
        </h2>
        <p className="text-xl pt-5">
          L’usage des Sites ainsi que ses Conditions d’Utilisation sont soumises
          au droit français. La nullité de l’une ou l’autre des mentions
          ci-dessus n’altère en rien la validité des autres dispositions de
          celles-ci.
        </p>
      </div>
    </div>
  );
}
