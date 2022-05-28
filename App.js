import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Item from './components/Item'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      tekst: "",
      wynik: ""
    }
    this.wypisz = this.wypisz.bind(this);
    this.oblicz = this.oblicz
  }

  wypisz(aa) {
    console.log(aa)

    //------- Kliknieto C
    if (aa == "C") {
      //Jest wyświetlony wynik
      if (this.state.wynik.length != "") {
        this.setState({
          tekst: "",
          wynik: "",
        });
      }
      // Trwa wpisywanie działania
      else {
        let ln = this.state.tekst.length;
        var txt = this.state.tekst;
        txt = txt.substr(0, (ln - 1));
        this.setState({
          tekst: txt,
          wynik: "",
        });
      }
    }

    // ---------- Kliknieto =
    else if (aa == "=") {
      var ln = this.state.tekst.length;
      var ost = this.state.tekst.charAt(ln - 1)
      // Ostatni znak nie jest specjalny
      if (ost != "-" && ost != "+" && ost != "*" && ost != "/" && ost != "=") {
        this.oblicz();
      }
    }
    //-----Nie ma wyniku poprzedniego
    else if (this.state.wynik == "") {
      // Tekst jest pusty
      if (this.state.tekst.length == 0) {
        // Klikniety znak nie jest specjalny
        if (aa != "-" && aa != "+" && aa != "*" && aa != "/" && aa != "=") {
          var txt = this.state.tekst + aa;
          this.setState({
            tekst: txt,
          });
        }
      }
      // Tekst juz ma zawartość
      else {
        var txt = this.state.tekst + aa;
        this.setState({
          tekst: txt,
        });
      }
    }

    // ------ Jest wynik i kontynuuje liczenie
    else {
      var b = this.state.wynik + aa;
      this.setState({
        tekst: b,
        wynik: ""
      });
    }
  }

  oblicz() {
    var ww = eval(this.state.tekst)
    // console.log(ww)
    this.setState({
      wynik: ww,
    });
  }

  render() {
    var klawisze = [
      ["1", "4", "7", "0"],
      ["2", "5", "8", "."],
      ["3", "6", "9", "="],
      ["C", "/", "*", "-", "+"],

    ];
    var content = [];
    for (var i = 0; i < klawisze.length - 1; i++) {
      var kolumna = [];
      for (var j = 0; j < klawisze[i].length; j++) {
        kolumna.push(<Item tekst={klawisze[i][j]} key={i + "_" + j} buttony={styles.buttony} tlo={styles.ciemne} wypisz={this.wypisz} />)
      }

      content.push(<View key={i} style={styles.kolumny}>{kolumna}</View>)
    }
    var kolumna = [];
    for (var k = 0; k < klawisze[3].length; k++) {
      kolumna.push(<Item tekst={klawisze[3][k]} key={3 + "_" + k} buttony={styles.buttony} tlo={[styles.jasne, { color: "red" }]} wypisz={this.wypisz} />)
    }
    content.push(<View key={3} style={styles.kolumny}>{kolumna}</View>)

    return (

      <View style={styles.container}>

        <View style={styles.okno}>
          <View style={styles.pasek}>
            <Text style={styles.tekst}>{this.state.tekst}</Text>
          </View>
          <View style={styles.pasek}>
            <Text style={styles.tekst}>{this.state.wynik}</Text>
          </View>
        </View>

        <View style={styles.klawiatura}>
          {content}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  okno: {
    flex: 1,
    justifyContent: 'center',   //w pionie
    flexDirection: 'column',
    backgroundColor: "#69e0f0",
    paddingRight: 20,
    paddingTop: 30,

  },
  klawiatura: {
    flex: 2,
    justifyContent: 'center',   //w pionie
    flexDirection: 'row',
  },
  tekst: {
    color: "#000",
    fontSize: 48,
    textAlign: "right",
  },
  pasek: {
    flex: 1
  },
  buttony: {
    flex: 1,
    color: "#fff",
    alignItems: 'center',   //w poziomie
    justifyContent: 'center',   //w pionie
    margin: 0

  },
  kolumny: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',   //w pionie
    flexDirection: 'column',
    margin: 0
  },
  ciemne: {
    backgroundColor: "#474747",
  },
  jasne: {
    backgroundColor: "#8c8c8c",
  },

});