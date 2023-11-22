class Personne {
    constructor(nom, lieu, argent) {
        this.nom = nom;
        this.lieu = lieu;
        this.argent = argent;
        this.main = [];
    }

    deplacer(lieu) {
        this.lieu = lieu;
        console.log(`${this.nom} est à la ${lieu.nom}`);
    }

    payer(article) {
        if (this.argent >= article.prix) {
            this.argent -= article.prix;
            console.log(`${this.nom} a payé ${article.nom}. Il lui reste ${this.argent} d'argent.`);
        } else {
            console.log(`${this.nom} n'a pas assez d'argent pour acheter ${article.nom}.`);
        }
    }

    prendre(ingredient) {
        this.main.push(Ingredients.copy(ingredient));
        console.log(`${this.nom} a pris ${ingredient.nom}.`);
    }

    couper(ingredient, outil) {
        if (outil === couteau && ingredient && ingredient.etats && ingredient.etats.includes('entier')) {
            console.log(`${this.nom} a coupé ${ingredient.nom} avec un ${outil.nom}.`);
            const ingredientCopie = Ingredients.copy(ingredient);
            ingredientCopie.etats = ['coupé'];
            this.main.push(ingredientCopie);
        } else {
            console.log(`${this.nom} ne peut pas couper l'oeuf avec un ${outil.nom}.`);
        }
    }
}

class Lieu {
    constructor(nom) {
        this.nom = nom;
        this.personnes = [];
    }
}

class Outil {
    constructor(nom) {
        this.nom = nom;
    }
}

class Ingredients {
    constructor(nom, etats, prix) {
        this.nom = nom;
        this.etats = etats;
        this.prix = prix;
    }

    static copy(ingredient) {
        return new Ingredients(ingredient.nom, [...ingredient.etats], ingredient.prix);
    }
}

class Epicerie extends Lieu {
    constructor(nom) {
        super(nom);
        this.paniers = [{ type: 'panier', contenu: [] }];
        this.ingredients = [
            new Ingredients("oignon", ["entier"], 2),
            new Ingredients("oeuf", ["entier"], 1),
            new Ingredients("fromage", ["entier"], 4)
        ];
    }
}

class Poele {
    constructor() {
        this.contenu = [];
    }

    cuire() {
        setTimeout(() => {
            if (this.contenu.length > 0) {
                this.contenu[0].etats = ['cuit'];
                console.log(`L'omelette est cuite!`);
            }
        }, 4000);
    }
}

class Bol {
    constructor() {
        this.contenu = [];
    }

    melanger(nomMelange) {
        this.contenu = [{ nom: nomMelange, etats: ['pas cuit'] }];
    }
}

// Début

const maison = new Lieu("Maison");
const epicerie = new Epicerie("Colruyt");
const couteau = new Outil("Couteau");

const oignon = new Ingredients("oignon", ["entier"], 2);
const oeuf = new Ingredients("oeuf", ["entier"], 1);
const fromage = new Ingredients("fromage", ["entier"], 4);

const poele = new Poele();
const bol = new Bol();

const personnage = new Personne("Madara", maison, 100);

personnage.deplacer(maison);
personnage.deplacer(epicerie);

epicerie.paniers.push({ type: 'panier', contenu: [] });
personnage.prendre(oignon);
personnage.prendre(oeuf);
personnage.prendre(fromage);

personnage.deplacer(maison);

for (const ingredient of personnage.main) {
    if (ingredient.etats.includes('entier')) {
        personnage.couper(ingredient, couteau);
    }
}

console.log(`${personnage.nom} a maintenant des ingrédients coupés dans sa main.`);

// personnage.deplacer(epicerie);

epicerie.paniers.push({ type: 'panier', contenu: personnage.main });
personnage.main = [];

// personnage.deplacer(maison);

personnage.couper(bol.contenu[0], couteau);
bol.melanger('omelette');
console.log(`${personnage.nom} mélange le contenu du bol pour créer une omelette.`);

console.log(`${personnage.nom} verse le contenu du bol dans la poêle.`);
poele.contenu = [...bol.contenu];
bol.contenu = [];

poele.cuire();
