//// Global Variables
const body = document.getElementsByTagName("body")[0];
const Header = document.createElement("header");
const Main = document.createElement("main");

///// Create Layout
function prepareLayout() {
  const title = document.createElement("h1");
  const subT = document.createElement("h2");
  const info = document.createElement("p");

  title.innerText = "S3-13 POO: Oregon Trail Pt.02";
  subT.innerText = "M2 - Jan/22 - Hugo Bler";
  info.innerText = "Tests on the console.";

  Header.append(title, subT, info);
  body.append(Header, Main);
}

//// Export
export { prepareLayout, Main };
