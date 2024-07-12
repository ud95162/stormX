import {Injectable} from '@angular/core';

@Injectable()
export class ResponsiveService {

  rules =
    {
      print: 'print',
      screen: 'screen',
      phone: '(max-width: 767px)',
      tablet: '(min-width: 768px) and (max-width: 1024px)',
      desktop: '(min-width: 720px)',
      portrait: '(orientation: portrait)',
      landscape: '(orientation: landscape)',
      retina: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'
    };

  constructor() {

  }

  Check = function (mq) {
    if (!mq) {
      return;
    }

    return window.matchMedia(mq).matches;
  };

  /**********************************************
   METHODS FOR CHECKING TYPE
   **********************************************/
  isPhone = function () {
    return window.matchMedia(this.rules.phone).matches;
  };

  isTablet = function () {
    return window.matchMedia(this.rules.tablet).matches;
  };

  isDesktop = function () {
    return window.matchMedia(this.rules.desktop).matches;
  };

  IsPortrait = function () {
    return window.matchMedia(this.rules.portrait).matches;
  };

  IsLandscape = function () {
    return window.matchMedia(this.rules.landscape).matches;
  };

  IsRetina = function () {
    return window.matchMedia(this.rules.retina).matches;
  };

  /**********************************************
   EVENT LISTENERS BY TYPE
   **********************************************/
  OnPhone(callBack) {
    if (typeof callBack === 'function') {
      const mql: MediaQueryList = window.matchMedia(this.rules.phone);

      mql.addListener((ev: MediaQueryListEvent) => {
        if (ev.matches) {
          callBack(ev.media);
        }
      });

    }
  };

  OnTablet(callBack) {
    if (typeof callBack === 'function') {
      const mql: MediaQueryList = window.matchMedia(this.rules.tablet);

      mql.addListener((ev: MediaQueryListEvent) => {
        if (ev.matches) {
          callBack(ev.media);
        }
      });

    }
  };

  OnDesktop(callBack) {
    if (typeof callBack === 'function') {
      const mql: MediaQueryList = window.matchMedia(this.rules.desktop);

      mql.addListener((ev: MediaQueryListEvent) => {
        if (ev.matches) {
          callBack(ev.media);
        }
      });

    }
  };

  OnPortrait(callBack) {
    if (typeof callBack === 'function') {
      const mql: MediaQueryList = window.matchMedia(this.rules.portrait);

      mql.addListener((ev: MediaQueryListEvent) => {
        if (ev.matches) {
          callBack(ev.media);
        }
      });

    }
  };

  OnLandscape(callBack) {
    if (typeof callBack === 'function') {
      const mql: MediaQueryList = window.matchMedia(this.rules.landscape);

      mql.addListener((ev: MediaQueryListEvent) => {
        if (ev.matches) {
          callBack(ev.media);
        }
      });

    }
  };
}
