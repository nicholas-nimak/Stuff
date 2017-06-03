class App {

  init() {
    let lan = 'ua';
    let page = 'index';
    let changePageLinksLang = () => {
      new insertPageLink().init('#pageLinks', lan).then(links => {
        new hideLink(page, links);
        links.forEach(elem => {
          elem.addEventListener('click', function() {
            page = this.id; // for changeLang
            new changePage(lan, `/${page}`);
            new hideLink(this.id, links);
          });
        });
      });
    };
    new changePage(lan, `/${page}`);
    changePageLinksLang();
    new insertLangLink().init('#langLinks').then(links => {
      new hideLink(lan, links);
      links.forEach(elem => {
        elem.addEventListener('click', function() {
          lan = this.id; // for changePage
          new changeLang(this.id, `/${page}`);
          new hideLink(this.id, links);
          changePageLinksLang();
        });
      });
    });
  };
};

class changePage {
  constructor(lan, page) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.querySelector("main").innerHTML = this.responseText;
      }
    };
    request.open('GET', `./html/${lan}${page}.html?t=${Math.random()}`, true);
    request.send();
  };
};

class changeLang {
  constructor(lan, page) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.querySelector("main").innerHTML = this.responseText;
      }
    };
    request.open('GET', `./html/${lan}${page}.html?t=${Math.random()}`, true);
    request.send();
  };
};

class hideLink {
  constructor(id, links) {
    links.forEach((elem) => {
      if(window.getComputedStyle(elem).getPropertyValue('color') === 'rgb(200, 200, 200)') {
        elem.style.color = 'rgb(100, 100, 100)';
      }
    });
    document.querySelector(`#${id}`).style.color = 'rgb(200, 200, 200)';
  };
};

class insertLangLink {
  init(parentId) {
    return new Promise((res, rej) => {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.querySelector(parentId).innerHTML = this.responseText;
          let links = document.querySelectorAll('.langLink');
          res(links);
        }
      };
      request.open('GET', './langLinks.html', true);
      request.send();
    });
  };
};

class insertPageLink {
  init(parentId, lan) {
    return new Promise((res, rej) => {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.querySelector(parentId).innerHTML = this.responseText;
          let links = document.querySelectorAll('.pageLink');
          res(links);
        }
      };
      request.open('GET', `./html/${lan}/pageLinks.html`, true);
      request.send();
    });
  };
};

window.onload new App().init();
