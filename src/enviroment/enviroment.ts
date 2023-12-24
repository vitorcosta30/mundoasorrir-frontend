import { Month } from "src/app/models/month.model";

export const environment = {
    production: false,
    apiURL: "http://192.168.1.101:9000/api/",
    months: [
      new Month(1,"Janeiro"),
      new Month(2,"Fevereiro"),
      new Month(3,"Março"),
      new Month(4,"Abril"),
      new Month(5,"Maio"),
      new Month(6,"Junho"),
      new Month(7,"Julho"),
      new Month(8,"Agost"),
      new Month(9,"Setembro"),
      new Month(10,"Outubro"),
      new Month(11,"Novembro"),
      new Month(12,"Dezembro")]
  };