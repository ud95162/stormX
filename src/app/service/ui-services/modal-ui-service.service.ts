import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUiServiceService {

  static body = document.querySelector('body');
  static modals = document.querySelectorAll('.o-modal');
  static activeModal: HTMLElement;

  constructor() {
    ModalUiServiceService.init();
  }

  static init() {
    document.addEventListener('click', function (event) {
      let element = event.target as HTMLElement;

      if (element != null) {
        if (element.classList.contains('o-modal__inner-close') || element.classList.contains('o-modal__back-btn')) {

          event.preventDefault();
          try {
            let parent = ModalUiServiceService.getCloset(element, '.o-modal');
            ModalUiServiceService.closeModal(parent);
          } catch (e) {
            console.error(e);
          }

        }

      }
    });
  }

  showModal(modal) {

    try {
      ModalUiServiceService.activeModal = document.querySelector('#' + modal) as HTMLElement;
      ModalUiServiceService.activeModal.classList.add('is-active');
      ModalUiServiceService.body.style.overflowY = 'hidden';
    } catch (e) {
      console.log(e);
    }

  }

  hideModal(modal) {
    try {
      ModalUiServiceService.activeModal = document.querySelector('#' + modal) as HTMLElement;
      ModalUiServiceService.activeModal.classList.remove('is-active');
      ModalUiServiceService.body.style.overflowY = 'auto';
    } catch (e) {
      console.log(e);
    }

  }

  private static closeModal(modal) {


    let closeble = modal.dataset.closeble;
    let parentModal = modal.dataset.parent;

    if (closeble == 'false') {
      return;
    } else if (parentModal) {
      modal.classList.remove('is-active');

      try {
        let activeModal = document.querySelector('#' + parentModal);
        activeModal.classList.add('is-active');
      } catch (e) {
        console.error(e);
      }

    } else {
      modal.classList.remove('is-active');
      ModalUiServiceService.body.style.overflowY = 'auto';
    }
  }

  private static getCloset(elem, selector) {
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) return elem;
    }
    return null;
  };
}
