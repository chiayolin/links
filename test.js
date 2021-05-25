class Tty {

  constructor(id, env) {
    this.tty = document.getElementById(id);
    this.is = this.tty.getElementsByClassName('input')[0];
    this.os = this.tty.getElementsByClassName('output')[0];
    
    /* focus caret on input area */
    this.is.focus();                  // focus on load 
    this.tty.addEventListener('click', // focus on click
      (e => this.is.focus()).bind(this)
    );

    /* parse keys */
    this.is.addEventListener('keydown', this.parseKeys.bind(this));

    /* set prompt */
    this.PS1 = '> ';
    this.os.innerHTML = this.PS1;

    this.env = {};
  }

  parseKeys(e) {
    let v = ['Enter', 'Tab', 'ArrowUp', 'ArrowDown'];

    switch(v.indexOf(e.key)) {

    case 0: // Enter
      e.preventDefault();

      /* clean input and clear input buffer */
      let s = this.is.innerHTML.replace(/(<br>\s*)+$/i, '');
      this.is.innerHTML = '';

      /* special case: clear screen */
      if (s === 'clear')
        this.os.innerHTML = '';

      /* special case: empty input */
      else if (s.length === 0)
        this.os.innerHTML += '<br>';

      /* otherwise, evaluate input */
      else
        this.os.innerHTML += s + '<br>' + this.eval(s);

      /* append prompt */
      this.os.innerHTML += this.PS1;

      /* scroll into view */
      this.is.scrollIntoView();

      break;

    case 1: // Tab 
      e.preventDefault();
      console.log('NI: auto complete');

      break;

    case 2: // ArrowUp
      e.preventDefault();
      console.log('NI: history up');

      break;

    case 3: // ArrowDown
      e.preventDefault();
      console.log('NI: history down');

      break;
    }
  }

  eval(s) {
    let res = '';
    let tokens = s.split(' ');

    res = `(${tokens.join(', ')})`;

    return res + '<br>';
  }

}

(() => { let T = new Tty('T') })();

