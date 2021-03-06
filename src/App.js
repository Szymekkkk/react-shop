import React, { ReactDOM } from "react";
import Printer from "./Product";
class App extends React.Component {
  state = {
    type: App,
    isLoading: true,
    printersall: [],
    printers: [],
    typess: [],
    producents: [],
    szukany: 0,
    error: null,
  };

  handleClick = (e) => {
    let id = e.currentTarget.id;
    let temp;
    for (let i = 0; i < this.state.printersall.length; i++) {
      if (this.state.printersall[i].ID == id) temp = this.state.printersall[i];
    }
  };

  onChange = (e) => {
    let temp = [];
    if (this.state.printers.length < 2)
      this.state.printers = this.state.printersall;

    switch (e.currentTarget.id) {
      case "Price":
        if (e.currentTarget.value === "ASC") {
          this.setState({
            printers: this.state.printers.sort(
              (a, b) => parseFloat(a.Price) - parseFloat(b.Price)
            ),
          });
        } else if (e.currentTarget.value === "DESC") {
          this.setState({
            printers: this.state.printers.sort(
              (a, b) => parseFloat(b.Price) - parseFloat(a.Price)
            ),
          });
        }
        break;
      case "Type":
        for (let i = 0; i < this.state.printers.length; i++) {
          if (this.state.printers[i].Type === e.currentTarget.value)
            temp.push(this.state.printers[i]);
        }
        this.setState({
          printers: temp,
        });

        break;
      case "Producent":
        for (let i = 0; i < this.state.printers.length; i++) {
          if (this.state.printers[i].Producent === e.currentTarget.value)
            temp.push(this.state.printers[i]);
        }
        this.setState({
          printers: temp,
        });

        break;
      default:
        break;
    }
  };

  modal = (e) => {
    if(e.currentTarget.id == "back"){
      this.setState({
        type: App,
        szukany: e.currentTarget.id
      });
    }else{
      this.setState({
        type: Printer,
        szukany: e.currentTarget.id
      });
    }

  };

  getFetchprinters() {
    this.setState(
      {
        loading: true,
      },
      () => {
        fetch("http://localhost:3001/json/")
          .then((res) => res.json())
          .then((result) =>
            this.setState({
              loading: false,
              printers: result,
              printersall: result,
            })
          )
          .catch(console.log);
        fetch("http://localhost:3001/json/types")
          .then((res) => res.json())
          .then((result) =>
            this.setState({
              loading: false,
              typess: result,
            })
          )
          .catch(console.log);
        fetch("http://localhost:3001/json/producents")
          .then((res) => res.json())
          .then((result) =>
            this.setState({
              loading: false,
              producents: result,
            })
          )
          .catch(console.log);
      }
    );
  }

  componentDidMount() {
    this.getFetchprinters();
  }

  render() {
    if (this.state.type === App) {
      const { printers, typess, producents, error } = this.state;
      return (
        <React.Fragment>
          <div>
            <link
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
              rel="stylesheet"
            />
            <h1>All Printers</h1>
            <div className="row row-cols-5">
              <div>
                <h1>Sort by:</h1>
              </div>
              <div>
                <span>Price</span>
                <select
                  onChange={this.onChange}
                  defaultValue="Select"
                  id="Price"
                  className="form-select"
                >
                  <option disabled hidden>
                    Select
                  </option>

                  <option value="ASC">ASC</option>
                  <option value="DESC">DESC</option>
                </select>
              </div>
              <div>
                <span>Producent</span>
                <select
                  onChange={this.onChange}
                  defaultValue="Select"
                  id="Producent"
                  className="form-select"
                >
                  <option disabled hidden>
                    Select
                  </option>
                  {error ? <p> {error.message} </p> : null}{" "}
                  {producents.map((typ) => {
                    const { Producent } = typ;
                    return <option key={Producent}>{Producent}</option>;
                  })}{" "}
                </select>
              </div>
              <div>
                <span>Type</span>
                <select
                  onChange={this.onChange}
                  defaultValue="Select"
                  id="Type"
                  className="form-select"
                >
                  <option disabled hidden>
                    {" "}
                    Select
                  </option>
                  {error ? <p> {error.message} </p> : null}{" "}
                  {typess.map((typ) => {
                    const { Type } = typ;
                    return <option key={Type}>{Type}</option>;
                  })}
                </select>
              </div>
            </div>
            {error ? <p> {error.message} </p> : null}{" "}
            {printers.map((printer) => {
              const { ID, Producent, Model, Type, Price, Desc, Image } =
                printer;
              return (
                <div id={ID} key={ID}>
                  <img width="100" alt={Model} src={Image} />
                  <p>Name: {Model}</p>
                  <p>Productent: {Producent}</p>
                  <p>Type: {Type}</p>
                  <p>Price: {Price}</p>
                  <button className="btn btn-outline-dark" id={ID} onClick={this.modal}>
                    Show Printer
                  </button>
                  <hr />
                </div>
              );
            })}
          </div>
        </React.Fragment>
      );
    }
    else if (this.state.type === Printer){
      const { printers, typess, producents, error } = this.state;
      return (
        <React.Fragment>
          <div>
            <link
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
              rel="stylesheet"
            />
            
            {error ? <p> {error.message} </p> : null}{" "}
            {printers.map((printer) => {
              const { ID, Producent, Model, Type, Price, Desc, Image } =
                printer;
                if(ID === this.state.szukany){
                  return (
                    <div>
                      <button className="btn btn-outline-dark" id={"back"} onClick={this.modal}>
                        Go back
                      </button>
                      <h1>{Producent} {Model}</h1>
                      <img width="500" alt={Model} src={Image} />

                      <p>Type: {Type}</p>
                      <p>Price: {Price}</p>

                      

                    </div>
                  );
                }
              
            })}
          </div>
        </React.Fragment>
      );
    }
  }
}
export default App;
