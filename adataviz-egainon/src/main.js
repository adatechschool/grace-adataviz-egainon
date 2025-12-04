import './style.css'

const container = document.getAnimations("container");
const containerCard = document.getElementById("containerCard");

async function getData(){
  try{
     const response = await fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/arbresremarquablesparis/records?limit=20");
     const apiData = await response.json();
     console.log(apiData);

    for (let i = 0; i < apiData.results.length ; i++){
      //Carte d'identité arbre
      const card = document.createElement("div");
      card.classList.add("arbre-card");

      //image
      const image = document.createElement("img");
      image.src = apiData.results[i].com_url_photo1;
      card.appendChild(image);

      //titre (nom de l'arbre)
      const title = document.createElement("h2");
      title.innerHTML = apiData.results[i].arbres_libellefrancais;
      card.appendChild(title);

      // sous-titre (nom usuel arbre)
      const subTitle = document.createElement("h3");
      subTitle.innerHTML = apiData.results[i].com_nom_usuel;
      card.appendChild(subTitle);

      // sous-sous-titre (nom latin)
      const subSubTitle = document.createElement("h4");
      subSubTitle.innerHTML = apiData.results[i].com_nom_latin;
      card.appendChild(subSubTitle);

      //description arbre : cachée au départ)
      const description = document.createElement("p");
      description.innerHTML = apiData.results[i].com_descriptif;
      description.style.display = "none";
      card.appendChild(description);

      // //adresse : arbres_adresse
      // const textAdresse = document.createElement("p");
      // textAdresse.innerHTML = apiData.results[i].arbres_adresse;
      // card.appendChild(textAdresse);

     
      //bouton Voir plus/ Vir moins
      const buttonCache = document.createElement("button");
      buttonCache.innerHTML = "Voir plus";

      buttonCache.addEventListener("click", function () { 
        if (description.style.display === "none") { //si clic et style none
          description.style.display = "block";
          buttonCache.innerHTML = "Voir moins";
        } else {
          description.style.display = "none";
          buttonCache.innerHTML = "Voir plus";
        }
      });

      card.appendChild(buttonCache);

      // On ajoute la carte au containerCard
      containerCard.appendChild(card);

      //barre de recherche (ne pas oublier message d'erreur)


    console.log();
   
    }

  } catch(error) {
         console.log(error);
    }
}
getData();