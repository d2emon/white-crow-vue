var messages = []

module.exports = {
  load: () => { console.log('<=== MESSAGES') },
  save: () => { console.log('===> MESSAGES') },
  findend: () => (messages.length),
  process: function (pos) {
    for (let i = pos; i < this.findend; i++) {
      this.apply(this.message(i))
    }
  },
  message: function (id) {
    let offset = 0
    return messages[id - offset]
  },
  apply: msg => {
    /* Print appropriate stuff from data block */
    // if (debug_mode) context.commit('textBfr', '\n<' + msg.text + '>')
    /*
    if (msg.code >= -3) {
      context.commit('textBfr', msg.text)
      // return
    }
    */
    // let nameme = name.toLowerCase()
    /*
    let data = {
      isme: 0,
      nam1: '',
      nam2: '',
      text: ''
    }
    */
    /*
    let data = split(msg, nameme)
    let i = data.text
    if ((msg.code == -20000) && (fpbns(data.nam1) == fighting)) {
      in_fight = 0
      fighting = -1
      return
    }
    if (msg.code < -10099) {
      new1rcv(data.isme, msg.c0, data.nam1, data.nam2, msg.code, data.text)
      return
    }
    if (msg.code == -9900) {
      msg.text[0].vis = msg.text[1]
      return
    }
    if (msg.code == -666) {
      bprintf("Something Very Evil Has Just Happened...\n")
      loseme()
      crapup("Bye Bye Cruel World....")
      return
    }
    if (msg.code == -599) {
      if (isme) {
        sscanf(text, "%d.%d.%d.", &my_lev, &my_sco, &my_str)
        calibme()
      }
      return
    }
    if (msg.code == -750) {
      if (isme) {
        if (fpbns(nam2)) loseme()
        closeworld()
        printf("***HALT\n")
        exit(0)
      }
      return
    }
    if (msg.code == -400) {
      if (isme) snoopd = null
      return
    }
    if (msg.code == -401) {
      if (isme) {
        snoopd = fpbns(nam2)
      }
      return
    }
    if (msg.code == -10000) {
      if ((isme!=1)&&(blok[0]==curch)) {
        bprintf("%s",text);
      }
      return
    }
    if (msg.code == -10030) {
      wthrrcv(blok[0])
      return
    }
    if (msg.code == -10021) {
      if (curch==blok[0]) {
        if (isme==1) {
          rdes=1;
          vdes=i[0];
          bloodrcv((long *)text,isme);
        }
      }
      return
    }
    if (msg.code == -10020) {
      if (isme==1) {
        ades = blok[0]
        if (my_lev<10) {
          bprintf("You drop everything you have as you are summoned by \001p%s\001\n",nam2)
        } else {
          bprintf("\001p%s\001 tried to summon you\n",nam2)
          return
        }
        tdes=1;
      }
      return
    }
    if (msg.code == -10001) {
      if (isme==1) {
        if (my_lev>10)
          bprintf("\001p%s\001 cast a lightning bolt at you\n", nam2)
        else
        // You are in the ....
        {
          bprintf("A massive lightning bolt arcs down out of the sky to strike");
          sprintf(zb,"[ \001p%s\001 has just been zapped by \001p%s\001 and terminated ]\n", globme, nam2);
          sendsys(globme,globme,-10113,curch,zb);
          bprintf(" you between\nthe eyes\n");
          zapped=1;
          delpers(globme);
          sprintf(zb,"\001s%s\001%s has just died.\n\001",globme,globme);
          sendsys(globme,globme,-10000,curch,zb);
          loseme();
          bprintf("You have been utterly destroyed by %s\n",nam2);

          crapup("Bye Bye.... Slain By Lightning");
        }
      }
      else if (blok[0]==curch)
        bprintf("\001cA massive lightning bolt strikes \001\001D%s\001\001c\n\001", nam1);
      return
    }
    if (msg.code == -10002) {
      if(isme!=1) {
        if (blok[0]==curch||my_lev>9)
          bprintf("\001P%s\001\001d shouts '%s'\n\001", nam2, text);
        else
          bprintf("\001dA voice shouts '%s'\n\001",text);
      }
      return
    }
    if (msg.code == -10003) {
      if (isme!=1) {
        if (blok[0]==curch)
          bprintf("\001P%s\001\001d says '%s'\n\001", nam2, text);
      }
      return
    }
    if (msg.code == -10004) {
      if(isme)
        bprintf("\001P%s\001\001d tells you '%s'\n\001",nam2,text);
      return
    }
    if (msg.code == -10010) {
      if(isme==1) {
        loseme();
        crapup("You have been kicked off");
      } else
        bprintf("%s has been kicked off\n",nam1);
      return
    }
    if (msg.code == -10011) {
      if(isme==1) {
        bprintf("%s",text);
      }
      return
    }
    */
  }
}
