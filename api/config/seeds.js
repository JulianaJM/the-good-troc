const mongoose = require("mongoose");
const Category = require("../models/category");

const dbtitle ="the-good-troc";
mongoose.connect(
  `mongodb://localhost/${dbtitle}`,
  { useNewUrlParser: true }
);

Category.collection.drop();
const categories = [
  {
    name:"MULTIMÉDIA",
    content:["Informatique", "Consoles & Jeux vidéo", "Image & Son", "Téléphonie"]
  },
  {
    name:"LOISIRS",
    content:["DVD - Films", "CD - Musique", "Livres", "Animaux", "Vélos", "Sports & Hobbies", "Instruments de musique", "Collection", "Jeux & Jouets", "Vins & Gastronomie"]
  },
  {
    name:"EQUIPEMENT",
    content:["Matériel agricole", "Transport - Manutention", "BTP - Chantier gros-oeuvre", "Outillage - Matériaux 2nd-oeuvre", "Équipements industriels", "Fournitures de bureau", "Restauration - Hôtellerie"]
  },
  {
    name:"SERVICES",
    content:["Prestations de services", "Billetterie", "Évènements", "Cours particuliers", "Équipements industriels", "Fournitures de bureau", "Restauration - Hôtellerie"]
  },
  {
    name:"MAISON",
    content:["Ameublement", "Électroménager", "Arts de la table", "Décoration", "Linge de maison", "Bricolage", "Jardinage"]
  },
  {
    name:"MODE",
    content:["Vêtements", "Chaussures", "Accessoires & Bagagerie", "Montres & Bijoux", "Équipement bébé", "Vêtements bébé"]
  },
  {
    name:"AUTRES",
    content:["Autres"]
  }
]


Category.insertMany(categories)
  .then(categories => {
    categories.forEach(category => {
      console.log(`${category.name} added!`);
    });
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(error);
  });
