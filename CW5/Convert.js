class Convert {
    constructor(cm=0) {
      this.cm = cm
    }
    get inch() {
      return (this.cm / 2.54).toFixed(1)
    }
    set inch(value) {
      this.cm = (value * 2.54).toFixed(1)
    }
    toString() {
      return this.cm + " cm"
    }
    static fromInch(value) {
      let t = new Convert()
      t.Inch = value
      return t
    }
  }