// import './style.css'
//https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/arbresremarquablesparis/records?limit=20

const app = document.getElementById("app");

async function getData(){
  try{
     const response = await fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/arbresremarquablesparis/records?limit=20");
     const apiData = await response.json();
     console.log(apiData);

    for (let i = 0; i < apiData.results.length ; i++){

      const image = document.createElement("img");
      image.src = apiData.results[i].com_url_photo1;
      app.appendChild(image);

      const title = document.createElement("h2");
      title.innerHTML = apiData.results[i].arbres_libellefrancais;
      app.appendChild(title);

      const subTitle = document.createElement("h3");
      subTitle.innerHTML = apiData.results[i].com_nom_usuel;
      app.appendChild(subTitle);

      const subSubTitle = document.createElement("h4");
     subSubTitle.innerHTML = apiData.results[i].com_nom_latin;
      app.appendChild(subSubTitle);

      const text = document.createElement("p");
      text.innerHTML = apiData.results[i].com_descriptif;
      app.appendChild(text);

      //adresse : arbres_adresse


      //creer bouton
      // com_url_pdf
      // let btn = document.createElement("BUTTON");        // Créer un élément <button>
      // let t = document.createTextNode("CLICK ME");       // Créer un noeud textuel
      // btn.appendChild(t);                                // Ajouter le texte au bouton
      // document.body.appendChild(btn);                    // Ajoute la balise <button> à la balise <body>
    

    console.log();
   
    }

  } catch(error) {
         console.log("Erreur :", error);
    }
}
getData();