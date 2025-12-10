import './style.css';

const containerCard = document.getElementById("containerCard");
const searchBox = document.getElementById("search-box");

const fieldsForSearch = ["com_nom_usuel", "com_nom_latin","arbres_libellefrancais", "com_descriptif"];
let allTrees = []; //pour stocker les arbres

async function getData(){
  try{
     const response = await fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/arbresremarquablesparis/records?limit=20");
    // const response = await fetch();
     const apiData = await response.json();
     console.log(apiData);

    allTrees = apiData.results; // Sauvegarde les données dans allTrees
    displayTrees(allTrees); // Affiche tous les arbres

   
  } catch(error) {
         containerCard.innerHTML = "<p class='error'>La forêt ne répond pas… Impossible de charger les données. Veuillez réessayer 🍃</p>";
         console.log(apiData);
    }
  }

//Pour afficher les cartes d'identité des arbres
function displayTrees(trees) { //trees est la liste d'arbres à afficher
containerCard.innerHTML = ""; // Vide le conteneur, on repart de zero
  
  if (trees.length === 0) {//si aucun arbre
    containerCard.innerHTML = "<p>Aucun arbre trouvé pour votre recherche 🌳</p>";
    return;
  }

    for (let i = 0; i < trees.length ; i++){//boucle pour creation de cartes 
      //Carte d'identité arbre
      const card = document.createElement("div");
      card.classList.add("arbre-card");

      //image
      const image = document.createElement("img");
      image.src = trees[i].com_url_photo1;
      image.alt = `Photo de ${trees[i].com_nom_usuel}  || "arbre"`;//texte alernatif pour photos
      card.appendChild(image);

      //titre (nom de l'arbre)
      const title = document.createElement("h2");
      title.innerHTML = trees[i].arbres_libellefrancais;
      card.appendChild(title);

      // sous-titre (nom usuel arbre)
      const subTitle = document.createElement("h3");
      subTitle.innerHTML = `Nom usuel : ${trees[i].com_nom_usuel}`;
      card.appendChild(subTitle);

      // sous-sous-titre (nom latin)
      const subSubTitle = document.createElement("h4");
      subSubTitle.innerHTML = `Nom latin : ${trees[i].com_nom_latin}`;
      card.appendChild(subSubTitle);

      // pdf de l'arbre 
      const lienArbre = document.createElement("h4");
      lienArbre.innerHTML = `<a href= "${trees[i].com_url_pdf}" target="_blank">Télécharger la fiche</a>`;
      card.appendChild(lienArbre);

      //description arbre : cachée au départ)
      const description = document.createElement("p");
      description.innerHTML = trees[i].com_descriptif || "Aucune description disponible";//texte alernatif pour descriptif
      description.style.display = "none";
      card.appendChild(description);
     
      //bouton Voir plus/ Voir moins
      const buttonCache = document.createElement("button");
      buttonCache.innerHTML = "Voir plus";

      buttonCache.addEventListener("click", function () { 
        if (description.style.display === "none") { //verification si description est cachée
          description.style.display = "block";// si description cachée, on l'affiche
          buttonCache.innerHTML = "Voir moins";
        } else {
          description.style.display = "none";//si description visible, on cache
          buttonCache.innerHTML = "Voir plus";
        }
      });
      card.appendChild(buttonCache);

      // On ajoute la carte au containerCard
      containerCard.appendChild(card);

    }
  }

// Barre de recherche, pour filtrer les arbres
function searchTrees(recherche) {//ce que l'on tape
  const cleanSearch = recherche.toLowerCase().trim();//nettoyage de la saisie
  
  if (cleanSearch === "") {
    displayTrees(allTrees); // Affiche tous les arbres si recherche vide
    return;
  }
  
  const filteredTrees = [];//boîte vide pour afficher les resultats
  
  for (let i = 0; i < allTrees.length; i++) {//boucle pour recherche dans tous les arbres
    let found = false;
    
    for (let j = 0; j < fieldsForSearch.length; j++) {//boucle pour les champs
      const field = fieldsForSearch[j]; //où l'on cherche (les différents champs)
      const value = allTrees[i][field]; //recupère valeur du champ
      
      if (value && typeof value === 'string') {//verification si la recherche contient du texte
        if (value.toLowerCase().includes(cleanSearch)) {
          found = true;
          break; // Sort de la boucle dès qu'on trouve une correspondance
        }
      }
    }
    
    if (found) {
      filteredTrees.push(allTrees[i]);//ajout de l'arbre dans boîte
    }
  }
  
  displayTrees(filteredTrees);//affiche les résultats
}

// Événement sur la barre de recherche
searchBox.addEventListener("input", (event) => {
  searchTrees(event.target.value);
});

// Recherche avec la touche Entrée
searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchTrees(searchBox.value);
  }
});

// Charge les données au démarrage
getData();