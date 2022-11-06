//On vient mettre au bon format les dates pour que l'affichage soit bont
export const dateParser = (num) => {
    let options = {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
    };

    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

    return date.toString();
};

//On vient mettre au bon format les dates pour que l'affichage soit bont
export const timestampParser = (num) => {
    let options = {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
    };

    let date = new Date(num).toLocaleDateString("fr-FR", options);

    return date.toString();
};

//ON créer isEmpty pour voir si une variable a été initilisé, si oui renovie une valeur booléenne
export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
};
