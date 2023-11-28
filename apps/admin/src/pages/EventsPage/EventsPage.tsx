import Table from "../../components/Table";

const headers = [
  "Id",
  "Ime",
  "Opis",
  "Tip",
  "Tema",
  "Mjesto",
  "Početak",
  "Kraj",
  "Akcije",
];

const data = [
  {
    id: 1,
    name: "Kampiranje",
    description: "Kampiranje u prirodi",
    type: "Kampiranje",
    theme: "Priroda",
    place: "Plitvice",
    start: "2021-06-01",
    end: "2021-06-10",
  },
  {
    id: 2,
    name: "Krstarenje",
    description: "Krstarenje Jadranom",
    type: "Krstarenje",
    theme: "Priroda",
    place: "Jadran",
    start: "2021-06-01",
    end: "2021-06-10",
  },
  {
    id: 3,
    name: "Izlet",
    description: "Izlet u prirodu",
    type: "Izlet",
    theme: "Priroda",
    place: "Plitvice",
    start: "2021-06-01",
    end: "2021-06-10",
  },
  {
    id: 4,
    name: "Penjanje",
    description: "Penjanje po stijenama",
    type: "Penjanje",
    theme: "Priroda",
    place: "Plitvice",
    start: "2021-06-01",
    end: "2021-06-10",
  },
];

const buttonActions = [
  {
    label: "Uredi",
    action: (row: object) => {
      console.log("Uredi", row);
    },
  },
  {
    label: "Obriši",
    action: (row: object) => {
      console.log("Obriši", row);
    },
  },
];

const EventsPage = () => {
  return <Table headers={headers} data={data} buttonActions={buttonActions} />;
};

export default EventsPage;
